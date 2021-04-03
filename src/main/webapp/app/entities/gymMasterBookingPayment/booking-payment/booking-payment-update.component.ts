import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBookingPayment, BookingPayment } from 'app/shared/model/gymMasterBookingPayment/booking-payment.model';
import { BookingPaymentService } from './booking-payment.service';

@Component({
  selector: 'jhi-booking-payment-update',
  templateUrl: './booking-payment-update.component.html',
})
export class BookingPaymentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    catalogueId: [null, [Validators.maxLength(30)]],
    partnerId: [null, [Validators.maxLength(30)]],
    cancelInd: [],
    bookingDt: [],
  });

  constructor(protected bookingPaymentService: BookingPaymentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bookingPayment }) => {
      if (!bookingPayment.id) {
        const today = moment().startOf('day');
        bookingPayment.bookingDt = today;
      }

      this.updateForm(bookingPayment);
    });
  }

  updateForm(bookingPayment: IBookingPayment): void {
    this.editForm.patchValue({
      id: bookingPayment.id,
      catalogueId: bookingPayment.catalogueId,
      partnerId: bookingPayment.partnerId,
      cancelInd: bookingPayment.cancelInd,
      bookingDt: bookingPayment.bookingDt ? bookingPayment.bookingDt.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bookingPayment = this.createFromForm();
    if (bookingPayment.id !== undefined) {
      this.subscribeToSaveResponse(this.bookingPaymentService.update(bookingPayment));
    } else {
      this.subscribeToSaveResponse(this.bookingPaymentService.create(bookingPayment));
    }
  }

  private createFromForm(): IBookingPayment {
    return {
      ...new BookingPayment(),
      id: this.editForm.get(['id'])!.value,
      catalogueId: this.editForm.get(['catalogueId'])!.value,
      partnerId: this.editForm.get(['partnerId'])!.value,
      cancelInd: this.editForm.get(['cancelInd'])!.value,
      bookingDt: this.editForm.get(['bookingDt'])!.value ? moment(this.editForm.get(['bookingDt'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBookingPayment>>): void {
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
