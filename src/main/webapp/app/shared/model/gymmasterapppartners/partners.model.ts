import { IPartnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';

export interface IPartners {
  id?: number;
  companyName?: string;
  userName?: string;
  type?: string;
  activeInd?: boolean;
  partnerslocs?: IPartnersloc[];
}

export class Partners implements IPartners {
  constructor(
    public id?: number,
    public companyName?: string,
    public userName?: string,
    public type?: string,
    public activeInd?: boolean,
    public partnerslocs?: IPartnersloc[]
  ) {
    this.activeInd = this.activeInd || false;
  }
}
