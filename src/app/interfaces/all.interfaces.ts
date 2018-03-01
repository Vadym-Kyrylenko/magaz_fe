export interface IPrice {
  priceUah: number;
  priceUsd: number;
}


export interface IOrderContacts {
  nameCustomer: string;
  email?: string;
  phone?: string;
  textOrder?: string;
}

// export interface IOrder {
//   contacts: IOrderContacts,
//   product: this.choosenProduct
// }
