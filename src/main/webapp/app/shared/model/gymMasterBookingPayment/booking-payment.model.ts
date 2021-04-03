import { Moment } from 'moment';
import { ILogin } from 'app/shared/model/login.model';
import { CancelInd } from 'app/shared/model/enumerations/cancel-ind.model';

export interface IBookingPayment {
  id?: number;
  catalogueId?: string;
  partnerId?: string;
  cancelInd?: CancelInd;
  bookingDt?: Moment;
  partnerlogins?: ILogin[];
}

export class BookingPayment implements IBookingPayment {
  constructor(
    public id?: number,
    public catalogueId?: string,
    public partnerId?: string,
    public cancelInd?: CancelInd,
    public bookingDt?: Moment,
    public partnerlogins?: ILogin[]
  ) {}
}
