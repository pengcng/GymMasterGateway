export interface ICustomer {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
  age?: number;
  contactNo?: number;
  email?: string;
}

export class Customer implements ICustomer {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public username?: string,
    public gender?: string,
    public age?: number,
    public contactNo?: number,
    public email?: string
  ) {}
}
