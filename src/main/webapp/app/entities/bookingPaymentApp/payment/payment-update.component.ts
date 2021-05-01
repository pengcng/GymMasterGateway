import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPayment, Payment } from 'app/shared/model/bookingPaymentApp/payment.model';
import { PaymentService } from './payment.service';
import { IBooking } from 'app/shared/model/bookingPaymentApp/booking.model';
import { BookingService } from 'app/entities/bookingPaymentApp/booking/booking.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-payment-update',
  templateUrl: './payment-update.component.html',
})
export class PaymentUpdateComponent implements OnInit {
  isSaving = false;
  bookings: IBooking[] = [];
  account: Account | null = null;
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;

  editForm = this.fb.group({
    id: [],
    paymentMode: [],
    tranDt: [],
    tranStatus: [],
    receiptNo: [],
    point: [],
    bookingId: [],
  });

  messageid: any = '';
  messageTitle: any = '';
  messageDesc: any = '';
  messageDesc1: any = '';
  messageDesc2: any = '';
  messageDesc4: any = '';

  constructor(
    private accountService: AccountService,
    protected paymentService: PaymentService,
    protected bookingService: BookingService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //    this.activatedRoute.params.subscribe((params: Params) => {
    //      this.messageid = params['catalogueId'];
    //      this.messageTitle = params['customerId'];
    //      this.messageDesc = params['customerId'];
    //      this.messageDesc1 = params['bookingDt'];
    //      this.messageDesc2 = params['userName'];
    //      this.messageDesc4 = params['price'];
    //   });
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));

    this.activatedRoute.data.subscribe(({ payment }) => {
      if (!payment.id) {
        const today = moment().startOf('day');
        payment.tranDt = today;
      }

      this.updateForm(payment);

      this.bookingService
        .query({ filter: 'payment-is-null' })
        .pipe(
          map((res: HttpResponse<IBooking[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBooking[]) => {
          if (!payment.bookingId) {
            this.bookings = resBody;
          } else {
            this.bookingService
              .find(payment.bookingId)
              .pipe(
                map((subRes: HttpResponse<IBooking>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBooking[]) => (this.bookings = concatRes));
          }
        });
    });
  }

  updateForm(payment: IPayment): void {
    this.editForm.patchValue({
      id: payment.id,
      paymentMode: payment.paymentMode,
      tranDt: payment.tranDt ? payment.tranDt.format(DATE_TIME_FORMAT) : null,
      tranStatus: payment.tranStatus,
      receiptNo: payment.receiptNo,
      point: payment.point,
      bookingId: payment.bookingId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const payment = this.createFromForm();
    if (payment.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentService.update(payment));
    } else {
      this.subscribeToSaveResponse(this.paymentService.create(payment));
    }
  }

  private createFromForm(): IPayment {
    return {
      ...new Payment(),
      id: this.editForm.get(['id'])!.value,
      paymentMode: this.editForm.get(['paymentMode'])!.value,
      tranDt: this.editForm.get(['tranDt'])!.value ? moment(this.editForm.get(['tranDt'])!.value, DATE_TIME_FORMAT) : undefined,
      tranStatus: this.editForm.get(['tranStatus'])!.value,
      receiptNo: this.editForm.get(['receiptNo'])!.value,
      point: this.editForm.get(['point'])!.value,
      bookingId: this.editForm.get(['bookingId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPayment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBooking): any {
    return item.id;
  }
}
