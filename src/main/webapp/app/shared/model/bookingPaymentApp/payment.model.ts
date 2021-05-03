import { Moment } from 'moment';
import { PaymentMode } from 'app/shared/model/enumerations/payment-mode.model';
import { TranStatus } from 'app/shared/model/enumerations/tran-status.model';

export interface IPayment {
  id?: number;
  paymentMode?: PaymentMode;
  tranDt?: Moment;
  tranStatus?: TranStatus;
  receiptNo?: string;
  point?: number;
  bookingId?: number;
  catPrice?: string;
}

export class Payment implements IPayment {
  constructor(
    public id?: number,
    public paymentMode?: PaymentMode,
    public tranDt?: Moment,
    public tranStatus?: TranStatus,
    public receiptNo?: string,
    public point?: number,
    public bookingId?: number,
    public catPrice?: string
  ) {}
}
