export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

export function detectCardBrand(cardNumber: string): CardBrand {
  const digits = cardNumber.replace(/\s/g, '');

  if (/^4/.test(digits)) return 'visa';

  if (/^5[1-5]/.test(digits) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/.test(digits))
    return 'mastercard';

  if (/^3[47]/.test(digits)) return 'amex';

  return 'unknown';
}

export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(digits) || digits.length < 13) return false;

  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}

export function validateExpiry(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiryDate = new Date(year, month);
  return expiryDate > now;
}

export function validateCVV(cvv: string, brand: CardBrand): boolean {
  if (brand === 'amex') return /^\d{4}$/.test(cvv);
  return /^\d{3}$/.test(cvv);
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const brand = detectCardBrand(digits);
  const maxLength = brand === 'amex' ? 15 : 16;
  const trimmed = digits.slice(0, maxLength);

  if (brand === 'amex') {
    return trimmed.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(' ')
    );
  }

  return trimmed.replace(/(\d{4})/g, '$1 ').trim();
}

export const DEMO_CARD = {
  cardNumber: '4111 1111 1111 1111',
  cardholderName: 'Jan Kowalski',
  expiryDate: '12/28',
  cvv: '123',
};
