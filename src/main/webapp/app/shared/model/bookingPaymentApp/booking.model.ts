import { Moment } from 'moment';
import { CancelInd } from 'app/shared/model/enumerations/cancel-ind.model';

export interface IBooking {
  id?: number;
  catalogueId?: string;
  customerId?: string;
  cancelInd?: CancelInd;
  bookingDt?: Moment;
  userName?: string;
  paymentId?: number;
}

export class Booking implements IBooking {
  constructor(
    public id?: number,
    public catalogueId?: string,
    public customerId?: string,
    public cancelInd?: CancelInd,
    public bookingDt?: Moment,
    public userName?: string,
    public paymentId?: number
  ) {}
}
