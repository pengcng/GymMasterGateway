import { Moment } from 'moment';
import { regionEnum } from 'app/shared/model/enumerations/region-enum.model';

export interface IPartnersloc {
  id?: number;
  region?: regionEnum;
  address?: string;
  postalCode?: number;
  openTime?: Moment;
  closeTime?: Moment;
  pocName?: string;
  pocNo?: number;
  pocEmail?: string;
  partnersCompanyName?: string;
  partnersId?: number;
}

export class Partnersloc implements IPartnersloc {
  constructor(
    public id?: number,
    public region?: regionEnum,
    public address?: string,
    public postalCode?: number,
    public openTime?: Moment,
    public closeTime?: Moment,
    public pocName?: string,
    public pocNo?: number,
    public pocEmail?: string,
    public partnersCompanyName?: string,
    public partnersId?: number
  ) {}
}
