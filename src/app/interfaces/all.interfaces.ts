export interface IPrice {
  priceUah: number;
  priceUsd: number;
  rateUsd: number;
}

export interface IOrderContacts {
  nameCustomer: string;
  email?: string;
  phone?: string;
  textOrder?: string;
}
