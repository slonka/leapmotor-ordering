export type CarModel = 't03' | 'b10' | 'c10';

export type CarColor = 'mint-green' | 'caribbean-blue' | 'light-white' | 'canopy-grey';

export type AccessoryId = 'rubber-mats' | 'velour-mats' | 'winter-tyres';

export type BuyerType = 'individual' | 'company';

export type FinancingOption =
  | 'cash'
  | 'loan-50-50'
  | 'loan-0-percent'
  | 'loan-3x33'
  | 'leasing-classic';

export type InsuranceChoice = 'dealer-1-percent' | 'own';

export type PaymentMethod = 'request-contact' | 'card-payment';

export interface CoOwner {
  firstName: string;
  lastName: string;
  pesel: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  pesel: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  coOwners: CoOwner[];
}

export interface CompanyInfo {
  representativeFirstName: string;
  representativeLastName: string;
  nip: string;
  companyName: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

export interface FinancingDetails {
  option: FinancingOption;
  months?: number;
  insurance?: InsuranceChoice;
}

export interface CardPayment {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface OrderState {
  model: CarModel | null;
  color: CarColor | null;
  accessories: AccessoryId[];
  buyerType: BuyerType | null;
  personalInfo: PersonalInfo;
  companyInfo: CompanyInfo;
  financing: FinancingDetails | null;
  paymentMethod: PaymentMethod | null;
  cardPayment: CardPayment;
}

export interface ColorOption {
  id: CarColor;
  nameKey: string;
  hex: string;
  surcharge: number;
  image: string;
}

export interface AccessoryOption {
  id: AccessoryId;
  nameKey: string;
  descriptionKey: string;
  price: number;
  excludes?: AccessoryId[];
}

export interface ModelOption {
  id: CarModel;
  nameKey: string;
  available: boolean;
  basePrice: number;
  salePrice?: number;
  image: string;
  specs: { power: string; range: string; battery: string };
}

export type WizardStep =
  | 'model'
  | 'color'
  | 'accessories'
  | 'buyer-type'
  | 'details'
  | 'financing'
  | 'payment'
  | 'summary';
