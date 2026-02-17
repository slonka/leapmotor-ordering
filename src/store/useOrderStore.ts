import { create } from 'zustand';
import type {
  OrderState,
  CarModel,
  CarColor,
  AccessoryId,
  BuyerType,
  PersonalInfo,
  CompanyInfo,
  FinancingDetails,
  PaymentMethod,
  CardPayment,
  WizardStep,
} from '@/lib/types';

const WIZARD_STEPS: WizardStep[] = [
  'model',
  'color',
  'accessories',
  'buyer-type',
  'details',
  'financing',
  'payment',
  'summary',
];

interface OrderStore extends OrderState {
  currentStep: number;
  highestStepReached: number;
  language: 'pl' | 'en';
  setLanguage: (lang: 'pl' | 'en') => void;
  setModel: (model: CarModel) => void;
  setColor: (color: CarColor) => void;
  toggleAccessory: (id: AccessoryId) => void;
  setBuyerType: (type: BuyerType) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setCompanyInfo: (info: Partial<CompanyInfo>) => void;
  setFinancing: (details: FinancingDetails) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCardPayment: (payment: Partial<CardPayment>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  getCurrentStepId: () => WizardStep;
  reset: () => void;
}

const initialPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  pesel: '',
  street: '',
  city: '',
  postalCode: '',
  phone: '',
  email: '',
  coOwners: [],
};

const initialCompanyInfo: CompanyInfo = {
  representativeFirstName: '',
  representativeLastName: '',
  nip: '',
  companyName: '',
  street: '',
  city: '',
  postalCode: '',
  phone: '',
  email: '',
};

const initialCardPayment: CardPayment = {
  cardNumber: '',
  cardholderName: '',
  expiryDate: '',
  cvv: '',
};

const initialState: OrderState = {
  model: null,
  color: null,
  accessories: [],
  buyerType: null,
  personalInfo: initialPersonalInfo,
  companyInfo: initialCompanyInfo,
  financing: null,
  paymentMethod: null,
  cardPayment: initialCardPayment,
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  ...initialState,
  currentStep: 0,
  highestStepReached: 0,
  language: 'pl',

  setLanguage: (lang) => set({ language: lang }),

  setModel: (model) => set({ model }),

  setColor: (color) => set({ color }),

  toggleAccessory: (id) =>
    set((state) => {
      const matIds: AccessoryId[] = ['rubber-mats', 'velour-mats'];
      const isMat = matIds.includes(id);

      if (state.accessories.includes(id)) {
        return { accessories: state.accessories.filter((a) => a !== id) };
      }

      let newAccessories = [...state.accessories];
      if (isMat) {
        newAccessories = newAccessories.filter((a) => !matIds.includes(a));
      }
      newAccessories.push(id);
      return { accessories: newAccessories };
    }),

  setBuyerType: (buyerType) => set({ buyerType }),

  setPersonalInfo: (info) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...info },
    })),

  setCompanyInfo: (info) =>
    set((state) => ({
      companyInfo: { ...state.companyInfo, ...info },
    })),

  setFinancing: (financing) => set({ financing }),

  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

  setCardPayment: (payment) =>
    set((state) => ({
      cardPayment: { ...state.cardPayment, ...payment },
    })),

  nextStep: () =>
    set((state) => {
      const next = Math.min(state.currentStep + 1, WIZARD_STEPS.length - 1);
      return {
        currentStep: next,
        highestStepReached: Math.max(state.highestStepReached, next),
      };
    }),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  goToStep: (step) =>
    set({ currentStep: Math.max(0, Math.min(step, WIZARD_STEPS.length - 1)) }),

  getCurrentStepId: () => WIZARD_STEPS[get().currentStep],

  reset: () => set({ ...initialState, currentStep: 0, highestStepReached: 0 }),
}));

export { WIZARD_STEPS };
