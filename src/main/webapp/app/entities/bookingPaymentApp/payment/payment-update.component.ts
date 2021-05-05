import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
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
  href: any = '';
  splitted: any[] = [];
  bookingId: any = '';
  catPrice: any = '';
  catPriceInput: any = '';
  bookings: IBooking[] = [];
  account: Account | null = null;
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  username: any = '';
  totalPoints: any;
  priceToPay: any;

  editForm = this.fb.group({
    id: [],
    paymentMode: [],
    tranDt: [],
    tranStatus: [],
    receiptNo: [],
    point: [],
    bookingId: [],
    priceToPay: [],
    catPrice: [],
    price: [],
  });

  constructor(
    private accountService: AccountService,
    protected paymentService: PaymentService,
    protected bookingService: BookingService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.catPrice = params['catPrice'];
      console.warn('catPrice = ' + this.catPrice);
      this.catPriceInput = this.catPrice;
      this.bookingId = params['bookingId'];
      console.warn('bookingId = ' + this.bookingId);
    });

    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    console.warn('account = ' + this.account?.login);
    if (this.account?.login) {
      this.username = 'bbb';
    }

    //get total number of points from db
    this.paymentService.findPoints(this.username).subscribe(
      res => {
        this.totalPoints = res.body;
        console.warn('findPoints: ' + this.totalPoints);
        console.warn('findPoints1: ' + res.headers);
      },
      () => {}
    );

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
      price: payment.price,
      point: payment.point,
      bookingId: payment.bookingId,
      catPrice: payment.catPrice,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const payment = this.createFromForm();
    console.warn('payment.price: ' + payment.price);
    console.warn('payment.point: ' + payment.point);
    console.warn('payment.catPrice: ' + payment.catPrice);
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
      price: this.editForm.get(['price'])!.value,
      point: this.editForm.get(['point'])!.value,
      bookingId: this.editForm.get(['bookingId'])!.value,
      catPrice: this.editForm.get(['priceToPay'])!.value,
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
    this.router.navigate(['/payment']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBooking): any {
    return item.id;
  }

  redeem(catPrice: number, totalPoints: number): void {
    this.priceToPay = catPrice - totalPoints;
    console.warn('PriceToPay' + this.priceToPay);
  }
}
