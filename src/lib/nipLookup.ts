interface NipLookupResult {
  companyName: string;
  street: string;
  city: string;
  postalCode: string;
}

export function validateNip(nip: string): boolean {
  const digits = nip.replace(/[-\s]/g, '');
  if (!/^\d{10}$/.test(digits)) return false;

  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i], 10) * weights[i];
  }
  return sum % 11 === parseInt(digits[9], 10);
}

export async function lookupNip(nip: string): Promise<NipLookupResult | null> {
  const cleanNip = nip.replace(/[-\s]/g, '');
  if (!validateNip(cleanNip)) return null;

  const today = new Date().toISOString().split('T')[0];

  try {
    const response = await fetch(
      `https://wl-api.mf.gov.pl/api/search/nip/${cleanNip}?date=${today}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    const subject = data?.result?.subject;
    if (!subject) return null;

    const workingAddress = subject.workingAddress || '';
    const residenceAddress = subject.residenceAddress || '';
    const address = workingAddress || residenceAddress;

    let street = '';
    let city = '';
    let postalCode = '';

    if (address) {
      const postalMatch = address.match(/(\d{2}-\d{3})/);
      if (postalMatch) {
        postalCode = postalMatch[1];
      }

      const parts = address.split(',').map((p: string) => p.trim());
      if (parts.length >= 2) {
        street = parts[0];
        const cityPart = parts[parts.length - 1];
        city = cityPart.replace(/\d{2}-\d{3}\s*/, '').trim();
      }
    }

    return {
      companyName: subject.name || '',
      street,
      city,
      postalCode,
    };
  } catch {
    return null;
  }
}

export function validatePesel(pesel: string): boolean {
  if (!/^\d{11}$/.test(pesel)) return false;

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(pesel[i], 10) * weights[i];
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(pesel[10], 10);
}
