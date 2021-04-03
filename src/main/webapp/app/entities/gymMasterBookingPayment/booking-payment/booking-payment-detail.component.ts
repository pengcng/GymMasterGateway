import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBookingPayment } from 'app/shared/model/gymMasterBookingPayment/booking-payment.model';

@Component({
  selector: 'jhi-booking-payment-detail',
  templateUrl: './booking-payment-detail.component.html',
})
export class BookingPaymentDetailComponent implements OnInit {
  bookingPayment: IBookingPayment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bookingPayment }) => (this.bookingPayment = bookingPayment));
  }

  previousState(): void {
    window.history.back();
  }
}
