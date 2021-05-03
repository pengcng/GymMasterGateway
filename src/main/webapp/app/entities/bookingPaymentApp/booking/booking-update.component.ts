import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBooking, Booking } from 'app/shared/model/bookingPaymentApp/booking.model';
import { BookingService } from './booking.service';
import { ICatalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-booking-update',
  templateUrl: './booking-update.component.html',
})
export class BookingUpdateComponent implements OnInit {
  isSaving = false;
  href: any = '';
  splitted: any[] = [];
  catId: any = '';
  catPrice: any = '';
  catIdInput: any = '';
  booking: IBooking | null = null;
  catalogue: ICatalogue | null = null;
  url: any;
  createdBookingId?: number;
  account: Account | null = null;
  authSubscription?: Subscription;

  editForm = this.fb.group({
    id: [],
    catalogueId: [null, [Validators.maxLength(30)]],
    customerId: [null, [Validators.maxLength(30)]],
    cancelInd: [],
    bookingDt: [],
    userName: [],
  });

  constructor(
    protected bookingService: BookingService,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ booking }) => {
      if (!booking.id) {
        const today = moment().startOf('day');
        booking.bookingDt = today;

        this.href = this.router.url;
        console.warn(this.router.url);
        this.splitted = this.href.split('#');
        console.warn(this.splitted);
        this.catId = this.splitted[1];
        console.warn('catId = ' + this.catId);
        this.catPrice = this.splitted[2];
        console.warn('catPrice = ' + this.catPrice);
        this.catIdInput = this.catId;
      }

      this.updateForm(booking);
    });

    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  updateForm(booking: IBooking): void {
    this.editForm.patchValue({
      id: booking.id,
      catalogueId: booking.catalogueId,
      customerId: booking.customerId,
      cancelInd: booking.cancelInd,
      bookingDt: booking.bookingDt ? booking.bookingDt.format(DATE_TIME_FORMAT) : null,
      userName: booking.userName,
    });
  }

  previousState(): void {
    window.close();
  }

  save(): void {
    this.isSaving = true;
    const booking = this.createFromForm();
    if (booking.id !== undefined) {
      this.subscribeToSaveResponse(this.bookingService.update(booking));
    } else {
      this.subscribeToSaveResponse(this.bookingService.create(booking));
    }
  }

  private createFromForm(): IBooking {
    return {
      ...new Booking(),
      id: this.editForm.get(['id'])!.value,
      catalogueId: this.editForm.get(['catalogueId'])!.value,
      customerId: this.editForm.get(['customerId'])!.value,
      cancelInd: this.editForm.get(['cancelInd'])!.value,
      bookingDt: this.editForm.get(['bookingDt'])!.value ? moment(this.editForm.get(['bookingDt'])!.value, DATE_TIME_FORMAT) : undefined,
      userName: this.editForm.get(['userName'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  //  this is to get the booking id out first
  protected onSaveSuccess(): void {
    this.bookingService.findLatestId().subscribe(
      res => {
        this.createdBookingId = res.body?.id;
        console.warn('createdBookingId: ' + this.createdBookingId);
      },
      () => {}
    );

    this.isSaving = false;
    this.createdBookingId = 111;

    this.url = 'http://' + window.location.hostname + ':5000/payment/new/' + this.createdBookingId + '/' + this.catPrice;
    console.warn('to payment page now:url= ' + this.url);
    window.open(this.url, '_self');
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  toPaymentUrl(): void {
    this.save();
  }

  protected wait(ms: number): void {
    const start = new Date().getTime();
    let end = new Date().getTime();
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
}
