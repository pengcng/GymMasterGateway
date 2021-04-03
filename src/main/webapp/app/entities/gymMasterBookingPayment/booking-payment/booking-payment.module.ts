import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymmastergatewaySharedModule } from 'app/shared/shared.module';
import { BookingPaymentComponent } from './booking-payment.component';
import { BookingPaymentDetailComponent } from './booking-payment-detail.component';
import { BookingPaymentUpdateComponent } from './booking-payment-update.component';
import { BookingPaymentDeleteDialogComponent } from './booking-payment-delete-dialog.component';
import { bookingPaymentRoute } from './booking-payment.route';

@NgModule({
  imports: [GymmastergatewaySharedModule, RouterModule.forChild(bookingPaymentRoute)],
  declarations: [
    BookingPaymentComponent,
    BookingPaymentDetailComponent,
    BookingPaymentUpdateComponent,
    BookingPaymentDeleteDialogComponent,
  ],
  entryComponents: [BookingPaymentDeleteDialogComponent],
})
export class GymMasterBookingPaymentBookingPaymentModule {}
