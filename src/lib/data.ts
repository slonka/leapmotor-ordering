import type { ModelOption, ColorOption, AccessoryOption } from './types';

export const MODELS: ModelOption[] = [
  {
    id: 't03',
    nameKey: 'T03',
    available: true,
    basePrice: 84900,
    salePrice: 73900,
    image: '/images/t03.png',
    specs: { power: '95 KM', range: '265 km', battery: '37,3 kWh' },
  },
  {
    id: 'b10',
    nameKey: 'B10',
    available: false,
    basePrice: 0,
    image: '/images/b10.png',
    specs: { power: '-', range: '-', battery: '-' },
  },
  {
    id: 'c10',
    nameKey: 'C10',
    available: false,
    basePrice: 0,
    image: '/images/c10.png',
    specs: { power: '-', range: '-', battery: '-' },
  },
];

export const COLORS: ColorOption[] = [
  { id: 'light-white', nameKey: 'color.light-white', hex: '#f5f5f5', surcharge: 1700, image: 'https://lpwebsite-prod-s3cdn.leapmotor-international.com/public/en-cms/176648113445818C1.png' },
  { id: 'caribbean-blue', nameKey: 'color.caribbean-blue', hex: '#6bb8d4', surcharge: 0, image: 'https://lpwebsite-prod-s3cdn.leapmotor-international.com/public/en-cms/176648114827718C2.png' },
  { id: 'canopy-grey', nameKey: 'color.canopy-grey', hex: '#5a5a5a', surcharge: 1700, image: 'https://lpwebsite-prod-s3cdn.leapmotor-international.com/public/en-cms/176648117196319C1.png' },
  { id: 'mint-green', nameKey: 'color.mint-green', hex: '#98d4a8', surcharge: 0, image: 'https://lpwebsite-prod-s3cdn.leapmotor-international.com/public/en-cms/176648118705219C2.png' },
];

export const ACCESSORIES: AccessoryOption[] = [
  {
    id: 'rubber-mats',
    nameKey: 'accessories.rubber-mats',
    descriptionKey: 'accessories.rubber-mats.desc',
    price: 199,
    excludes: ['velour-mats'],
  },
  {
    id: 'velour-mats',
    nameKey: 'accessories.velour-mats',
    descriptionKey: 'accessories.velour-mats.desc',
    price: 249,
    excludes: ['rubber-mats'],
  },
  {
    id: 'winter-tyres',
    nameKey: 'accessories.winter-tyres',
    descriptionKey: 'accessories.winter-tyres.desc',
    price: 1600,
  },
];

export function formatPrice(price: number): string {
  return price.toLocaleString('pl-PL');
}
