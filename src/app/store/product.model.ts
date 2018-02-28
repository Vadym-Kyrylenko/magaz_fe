import { IPrice } from '../interfaces/all.interfaces';

export class Product {
  public name: string;
  public price: IPrice;
  public description: string;
  public article: string;
  public category: string;
  public imgSrc: string;


  constructor(name: string,
              price: IPrice,
              description: string,
              article: string,
              category: string,
              imgSrc: string) {

    this.name = name;
    this.price = {
      priceUah : price.priceUah,
      priceUsd : price.priceUsd
    };
    this.description = description;
    this.article = article;
    this.category = category;
    this.imgSrc = imgSrc;
  }
}
