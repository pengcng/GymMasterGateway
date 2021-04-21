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

@Component({
  selector: 'jhi-booking-update',
  templateUrl: './booking-update.component.html',
  template: 'The href is: {{href}}',
})
export class BookingUpdateComponent implements OnInit {
  isSaving = false;
  href: any = '';
  splitted: any[] = [];
  catId: any = '';
  catIdInput: any = '';

  editForm = this.fb.group({
    id: [],
    catalogueId: [null, [Validators.maxLength(30)]],
    customerId: [null, [Validators.maxLength(30)]],
    cancelInd: [],
    bookingDt: [],
  });

  constructor(
    protected bookingService: BookingService,
    protected activatedRoute: ActivatedRoute,
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
        this.catIdInput = this.catId;
      }

      this.updateForm(booking);
    });
  }

  updateForm(booking: IBooking): void {
    this.editForm.patchValue({
      id: booking.id,
      catalogueId: booking.catalogueId,
      customerId: booking.customerId,
      cancelInd: booking.cancelInd,
      bookingDt: booking.bookingDt ? booking.bookingDt.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    if (this.catId !== null) {
      window.close();
    } else window.history.back();
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
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>): void {
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
}
