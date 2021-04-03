import { Moment } from 'moment';
import { PaymentMode } from 'app/shared/model/enumerations/payment-mode.model';
import { TranStatus } from 'app/shared/model/enumerations/tran-status.model';

export interface IPayment {
  id?: number;
  paymentMode?: PaymentMode;
  tranDt?: Moment;
  tranStatus?: TranStatus;
  receiptNo?: string;
  bookingId?: number;
}

export class Payment implements IPayment {
  constructor(
    public id?: number,
    public paymentMode?: PaymentMode,
    public tranDt?: Moment,
    public tranStatus?: TranStatus,
    public receiptNo?: string,
    public bookingId?: number
  ) {}
}
