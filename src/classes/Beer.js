import BeerStyle from './BeerStyle'
export default class Beer extends BeerStyle {
  constructor(name, IBU, SRM, ABV, beerOrganolepticDescription, stock, breweryName, beerID) {
    console.log('Constructing Beer instance...');
    super(name, beerOrganolepticDescription);
    this.beerID = beerID;
    this.tapID = beerID;
    this.stock = stock;
    this.IBU = IBU;
    this.SRM = SRM;
    this.ABV = ABV;
    this.breweryName = breweryName;
    this.beerFantasyName = beerID;
  }

  get() {
    return this;
  }

};
