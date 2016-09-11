export default class BeerStyle {
  constructor(name, IBU, SRM, ABV, beerOrganolepticDescription) {
    console.log('Constructing BeerStyle instance...');
    this.name = name;
    this.beerOrganolepticDescription = beerOrganolepticDescription;

  }

  get() {
    return this;
  }

};
