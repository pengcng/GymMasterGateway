import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBooking, Booking } from 'app/shared/model/bookingPaymentApp/booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'jhi-booking-update',
  templateUrl: './booking-update.component.html',
})
export class BookingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    catalogueId: [null, [Validators.maxLength(30)]],
    customerId: [null, [Validators.maxLength(30)]],
    cancelInd: [],
    bookingDt: [],
    userName: [],
  });

  constructor(protected bookingService: BookingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ booking }) => {
      if (!booking.id) {
        const today = moment().startOf('day');
        booking.bookingDt = today;
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
      userName: booking.userName,
    });
  }

  previousState(): void {
    window.history.back();
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

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
