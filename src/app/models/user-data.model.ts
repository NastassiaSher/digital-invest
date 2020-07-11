export class UserData{
  name: string;
  investments: Map<string, number>;

  constructor(name, investments) {
    this.name = name;
    this.investments = investments;
  }
}
