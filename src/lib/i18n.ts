const translations = {
  pl: {
    // Header
    'header.title': 'Leapmotor',
    'header.subtitle': 'Golemo Kraków',
    'header.configure': 'Konfigurator',

    // Navigation
    'nav.back': 'Wstecz',
    'nav.next': 'Dalej',
    'nav.finish': 'Zakończ',

    // Steps
    'step.model': 'Model',
    'step.color': 'Kolor',
    'step.accessories': 'Akcesoria',
    'step.buyer-type': 'Kupujący',
    'step.details': 'Dane',
    'step.financing': 'Finansowanie',
    'step.review': 'Przegląd',
    'step.payment': 'Płatność',
    'step.summary': 'Podsumowanie',

    // Step 1: Model
    'model.title': 'Wybierz model',
    'model.from': 'od',
    'model.comingSoon': 'Wkrótce',
    'model.specs.power': 'Moc',
    'model.specs.range': 'Zasięg',
    'model.specs.battery': 'Bateria',

    // Step 2: Color
    'color.title': 'Wybierz kolor',
    'color.mint-green': 'Mint Green',
    'color.caribbean-blue': 'Caribbean Blue',
    'color.light-white': 'Light White',
    'color.canopy-grey': 'Canopy Grey',
    'color.included': 'W cenie',
    'color.surcharge': '+{price} zł',

    // Step 3: Accessories
    'accessories.title': 'Wybierz akcesoria',
    'accessories.optional': 'Opcjonalne',
    'accessories.rubber-mats': 'Dywaniki gumowe',
    'accessories.rubber-mats.desc': 'Komplet dywaników gumowych dopasowanych do T03',
    'accessories.velour-mats': 'Dywaniki welurowe',
    'accessories.velour-mats.desc': 'Komplet dywaników welurowych premium',
    'accessories.winter-tyres': 'Opony zimowe',
    'accessories.winter-tyres.desc': 'Komplet opon zimowych 165/65 R15',

    // Step 4: Buyer Type
    'buyer.title': 'Typ kupującego',
    'buyer.individual': 'Osoba prywatna',
    'buyer.individual.desc': 'Zakup jako osoba fizyczna',
    'buyer.company': 'Firma',
    'buyer.company.desc': 'Zakup na firmę (NIP)',

    // Step 5a: Personal Info
    'personal.title': 'Dane osobowe',
    'personal.firstName': 'Imię',
    'personal.lastName': 'Nazwisko',
    'personal.pesel': 'PESEL',
    'personal.street': 'Ulica i numer',
    'personal.city': 'Miasto',
    'personal.postalCode': 'Kod pocztowy',
    'personal.phone': 'Telefon',
    'personal.email': 'E-mail',
    'personal.addCoOwner': '+ Dodaj współwłaściciela',
    'personal.removeCoOwner': 'Usuń',
    'personal.coOwner': 'Współwłaściciel',
    'personal.pesel.invalid': 'Nieprawidłowy numer PESEL',
    'personal.email.invalid': 'Nieprawidłowy adres e-mail',
    'personal.required': 'Pole wymagane',

    // Step 5b: Company Info
    'company.title': 'Dane firmy',
    'company.representative': 'Dane reprezentanta',
    'company.firstName': 'Imię reprezentanta',
    'company.lastName': 'Nazwisko reprezentanta',
    'company.nip': 'NIP',
    'company.nip.invalid': 'Nieprawidłowy numer NIP',
    'company.nip.lookup': 'Szukam...',
    'company.nip.found': 'Dane pobrane automatycznie',
    'company.nip.notFound': 'Nie znaleziono firmy',
    'company.companyName': 'Nazwa firmy',
    'company.street': 'Ulica i numer',
    'company.city': 'Miasto',
    'company.postalCode': 'Kod pocztowy',
    'company.phone': 'Telefon',
    'company.email': 'E-mail',

    // Step 6: Financing
    'financing.title': 'Opcje finansowania',
    'financing.cash': 'Gotówka',
    'financing.cash.desc': 'Zapłać pełną kwotę bez finansowania',
    'financing.insurance': 'Pakiet ubezpieczeniowy za 1% wartości samochodu',
    'financing.insurance.title': 'Ubezpieczenie',
    'financing.insurance.dealer': 'Pakiet ubezpieczeniowy 1%',
    'financing.insurance.dealer.desc': 'Ubezpieczenie za 1% wartości samochodu w pakiecie z dealerem',
    'financing.insurance.own': 'Ubezpieczę się sam',
    'financing.insurance.own.desc': 'Samodzielne zawarcie polisy ubezpieczeniowej',
    'financing.stellantis': 'Stellantis Financial Services',
    'financing.loan-50-50': 'Pożyczka 50/50',
    'financing.loan-50-50.desc': '50% wpłaty, 50% po 12 miesiącach, 0% odsetek, 0% prowizji',
    'financing.loan-0-percent': 'Pożyczka 0%',
    'financing.loan-0-percent.desc': '60% wpłaty własnej, 24 lub 36 równych rat, 0% odsetek',
    'financing.loan-3x33': 'Pożyczka 3×33%',
    'financing.loan-3x33.desc': '33% wpłaty, dwie roczne raty po 33%, 0% odsetek',
    'financing.leasing-classic': 'Leasing klasyczny od 101%',
    'financing.leasing-classic.desc': 'Od 1,23 zł do 45% wpłaty własnej, 24-60 miesięcy',
    'financing.months': 'miesięcy',
    'financing.downPayment': 'Wpłata własna',
    'financing.monthlyPayment': 'Rata miesięczna',
    'financing.selectMonths': 'Wybierz okres',

    // Step 7: Review
    'review.title': 'Sprawdź zamówienie',

    // Step 8: Payment
    'payment.title': 'Płatność',
    'payment.requestContact': 'Poproś o kontakt',
    'payment.requestContact.desc': 'Dealer skontaktuje się z Tobą, aby omówić szczegóły zamówienia',
    'payment.placeOrder': 'Złóż zamówienie',
    'payment.placeOrder.desc': 'Zapłać kartą i złóż zamówienie online',
    'payment.cardNumber': 'Numer karty',
    'payment.cardholderName': 'Imię i nazwisko na karcie',
    'payment.expiryDate': 'Data ważności (MM/RR)',
    'payment.cvv': 'CVV',
    'payment.exampleCard': 'Przykładowe dane karty',
    'payment.card.invalid': 'Nieprawidłowy numer karty',
    'payment.expiry.invalid': 'Nieprawidłowa data ważności',
    'payment.cvv.invalid': 'Nieprawidłowy CVV',
    'payment.submit': 'Zapłać',

    // Step 8: Summary
    'summary.title': 'Podsumowanie zamówienia',
    'summary.model': 'Model',
    'summary.color': 'Kolor',
    'summary.accessories': 'Akcesoria',
    'summary.none': 'Brak',
    'summary.buyerType': 'Typ kupującego',
    'summary.buyerInfo': 'Dane kupującego',
    'summary.financing': 'Finansowanie',
    'summary.payment': 'Płatność',
    'summary.total': 'Łącznie',
    'summary.basePrice': 'Cena bazowa',
    'summary.colorSurcharge': 'Dopłata za kolor',
    'summary.success': 'Zamówienie złożone!',
    'summary.successMessage': 'Dziękujemy za złożenie zamówienia. Skontaktujemy się z Tobą wkrótce.',
    'summary.contactSuccess': 'Prośba o kontakt wysłana!',
    'summary.contactSuccessMessage': 'Nasz dealer skontaktuje się z Tobą w ciągu 24 godzin.',
    'summary.newOrder': 'Nowe zamówienie',
    'summary.salePrice': 'Cena promocyjna',
    'summary.standardPrice': 'Cena standardowa',

    // Price Summary
    'price.total': 'Łącznie',
    'price.base': 'Cena bazowa',
    'price.sale': 'Promocja',
    'price.standard': 'Standard',
    'price.currency': 'zł',
  },
  en: {
    // Header
    'header.title': 'Leapmotor',
    'header.subtitle': 'Golemo Kraków',
    'header.configure': 'Configurator',

    // Navigation
    'nav.back': 'Back',
    'nav.next': 'Next',
    'nav.finish': 'Finish',

    // Steps
    'step.model': 'Model',
    'step.color': 'Color',
    'step.accessories': 'Accessories',
    'step.buyer-type': 'Buyer',
    'step.details': 'Details',
    'step.financing': 'Financing',
    'step.review': 'Review',
    'step.payment': 'Payment',
    'step.summary': 'Summary',

    // Step 1: Model
    'model.title': 'Choose your model',
    'model.from': 'from',
    'model.comingSoon': 'Coming Soon',
    'model.specs.power': 'Power',
    'model.specs.range': 'Range',
    'model.specs.battery': 'Battery',

    // Step 2: Color
    'color.title': 'Choose your color',
    'color.mint-green': 'Mint Green',
    'color.caribbean-blue': 'Caribbean Blue',
    'color.light-white': 'Light White',
    'color.canopy-grey': 'Canopy Grey',
    'color.included': 'Included',
    'color.surcharge': '+{price} PLN',

    // Step 3: Accessories
    'accessories.title': 'Choose accessories',
    'accessories.optional': 'Optional',
    'accessories.rubber-mats': 'Rubber car mats',
    'accessories.rubber-mats.desc': 'Complete set of rubber mats fitted for T03',
    'accessories.velour-mats': 'Velour car mats',
    'accessories.velour-mats.desc': 'Premium velour mats complete set',
    'accessories.winter-tyres': 'Winter tyres',
    'accessories.winter-tyres.desc': 'Complete set of winter tyres 165/65 R15',

    // Step 4: Buyer Type
    'buyer.title': 'Buyer type',
    'buyer.individual': 'Individual',
    'buyer.individual.desc': 'Purchase as a private person',
    'buyer.company': 'Company',
    'buyer.company.desc': 'Business purchase (VAT ID)',

    // Step 5a: Personal Info
    'personal.title': 'Personal information',
    'personal.firstName': 'First name',
    'personal.lastName': 'Last name',
    'personal.pesel': 'PESEL',
    'personal.street': 'Street and number',
    'personal.city': 'City',
    'personal.postalCode': 'Postal code',
    'personal.phone': 'Phone',
    'personal.email': 'E-mail',
    'personal.addCoOwner': '+ Add co-owner',
    'personal.removeCoOwner': 'Remove',
    'personal.coOwner': 'Co-owner',
    'personal.pesel.invalid': 'Invalid PESEL number',
    'personal.email.invalid': 'Invalid e-mail address',
    'personal.required': 'Required field',

    // Step 5b: Company Info
    'company.title': 'Company information',
    'company.representative': 'Representative details',
    'company.firstName': 'Representative first name',
    'company.lastName': 'Representative last name',
    'company.nip': 'NIP (Tax ID)',
    'company.nip.invalid': 'Invalid NIP number',
    'company.nip.lookup': 'Looking up...',
    'company.nip.found': 'Data loaded automatically',
    'company.nip.notFound': 'Company not found',
    'company.companyName': 'Company name',
    'company.street': 'Street and number',
    'company.city': 'City',
    'company.postalCode': 'Postal code',
    'company.phone': 'Phone',
    'company.email': 'E-mail',

    // Step 6: Financing
    'financing.title': 'Financing options',
    'financing.cash': 'Cash',
    'financing.cash.desc': 'Pay the full amount upfront, no financing',
    'financing.insurance': 'Insurance package for 1% of car value',
    'financing.insurance.title': 'Insurance',
    'financing.insurance.dealer': '1% insurance package',
    'financing.insurance.dealer.desc': 'Insurance for 1% of car value bundled with the dealer',
    'financing.insurance.own': "I'll insure myself",
    'financing.insurance.own.desc': 'Arrange your own insurance policy independently',
    'financing.stellantis': 'Stellantis Financial Services',
    'financing.loan-50-50': 'Loan 50/50',
    'financing.loan-50-50.desc': '50% down, 50% after 12 months, 0% interest, 0% prep fee',
    'financing.loan-0-percent': 'Loan 0%',
    'financing.loan-0-percent.desc': '60% down payment, 24 or 36 equal installments, 0% interest',
    'financing.loan-3x33': 'Loan 3×33%',
    'financing.loan-3x33.desc': '33% down, two annual installments of 33%, 0% interest',
    'financing.leasing-classic': 'Classic Leasing from 101%',
    'financing.leasing-classic.desc': 'From 1.23 PLN to 45% down payment, 24-60 months',
    'financing.months': 'months',
    'financing.downPayment': 'Down payment',
    'financing.monthlyPayment': 'Monthly payment',
    'financing.selectMonths': 'Select period',

    // Step 7: Review
    'review.title': 'Review your order',

    // Step 8: Payment
    'payment.title': 'Payment',
    'payment.requestContact': 'Request contact',
    'payment.requestContact.desc': 'A dealer will contact you to discuss order details',
    'payment.placeOrder': 'Place order',
    'payment.placeOrder.desc': 'Pay by card and place your order online',
    'payment.cardNumber': 'Card number',
    'payment.cardholderName': 'Cardholder name',
    'payment.expiryDate': 'Expiry date (MM/YY)',
    'payment.cvv': 'CVV',
    'payment.exampleCard': 'Example card info',
    'payment.card.invalid': 'Invalid card number',
    'payment.expiry.invalid': 'Invalid expiry date',
    'payment.cvv.invalid': 'Invalid CVV',
    'payment.submit': 'Pay',

    // Step 8: Summary
    'summary.title': 'Order summary',
    'summary.model': 'Model',
    'summary.color': 'Color',
    'summary.accessories': 'Accessories',
    'summary.none': 'None',
    'summary.buyerType': 'Buyer type',
    'summary.buyerInfo': 'Buyer information',
    'summary.financing': 'Financing',
    'summary.payment': 'Payment',
    'summary.total': 'Total',
    'summary.basePrice': 'Base price',
    'summary.colorSurcharge': 'Color surcharge',
    'summary.success': 'Order placed!',
    'summary.successMessage': 'Thank you for your order. We will contact you shortly.',
    'summary.contactSuccess': 'Contact request sent!',
    'summary.contactSuccessMessage': 'Our dealer will contact you within 24 hours.',
    'summary.newOrder': 'New order',
    'summary.salePrice': 'Sale price',
    'summary.standardPrice': 'Standard price',

    // Price Summary
    'price.total': 'Total',
    'price.base': 'Base price',
    'price.sale': 'Sale',
    'price.standard': 'Standard',
    'price.currency': 'PLN',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['pl'];
export type Language = 'pl' | 'en';

export function t(key: TranslationKey, lang: Language, params?: Record<string, string | number>): string {
  let value: string = translations[lang][key] || translations['pl'][key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      value = value.replace(`{${k}}`, String(v));
    });
  }
  return value;
}

export function useTranslation(lang: Language) {
  return {
    t: (key: TranslationKey, params?: Record<string, string | number>) => t(key, lang, params),
    lang,
  };
}
