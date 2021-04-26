import { Moment } from 'moment';
import { categoryEnum } from 'app/shared/model/enumerations/category-enum.model';

export interface ICatalogue {
  id?: number;
  description?: string;
  price?: number;
  duration?: number;
  sessionDt?: Moment;
  category?: categoryEnum;
  username?: string;
  partnerId?: number;
}

export class Catalogue implements ICatalogue {
  constructor(
    public id?: number,
    public description?: string,
    public price?: number,
    public duration?: number,
    public sessionDt?: Moment,
    public category?: categoryEnum,
    public username?: string,
    public partnerId?: number
  ) {}
}
