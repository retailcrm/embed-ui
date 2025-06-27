export type Dimensions = {
  L: number | null;
  W: number | null;
  H: number | null;
}

export type Money = {
  amount: number;
  currency: string;
}

export type WeightUnit = 'grams' | 'kilograms' | 'tons'
export type Weight = {
  value: number;
  unit: WeightUnit;
}