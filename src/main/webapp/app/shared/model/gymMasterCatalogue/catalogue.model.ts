import { Moment } from 'moment';

export interface ICatalogue {
  id?: number;
  description?: string;
  partnerId?: number;
  price?: number;
  duration?: number;
  sessionDt?: Moment;
  category?: string;
}

export class Catalogue implements ICatalogue {
  constructor(
    public id?: number,
    public description?: string,
    public partnerId?: number,
    public price?: number,
    public duration?: number,
    public sessionDt?: Moment,
    public category?: string
  ) {}
}
