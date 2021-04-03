import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBookingPayment } from 'app/shared/model/gymMasterBookingPayment/booking-payment.model';
import { BookingPaymentService } from './booking-payment.service';

@Component({
  templateUrl: './booking-payment-delete-dialog.component.html',
})
export class BookingPaymentDeleteDialogComponent {
  bookingPayment?: IBookingPayment;

  constructor(
    protected bookingPaymentService: BookingPaymentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bookingPaymentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bookingPaymentListModification');
      this.activeModal.close();
    });
  }
}
