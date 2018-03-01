import {IPrice} from '../interfaces/all.interfaces';

export class Order {
  public nameCustomer: string;
  public email: string;
  public phone: string;
  public textOrder: string;

  public name: string;
  public price: IPrice;
  public description: string;
  public article: string;
  public category: string;


  constructor(nameCustomer: string,
              email: string,
              phone: string,
              textOrder: string,

              name: string,
              price: IPrice,
              description: string,
              article: string,
              category: string) {

    this.nameCustomer = nameCustomer;
    this.email = email;
    this.phone = phone;
    this.textOrder = textOrder;

    this.name = name;
    this.price = {
      priceUah : price.priceUah,
      priceUsd : price.priceUsd
    };
    this.description = description;
    this.article = article;
    this.category = category;
  }
}
