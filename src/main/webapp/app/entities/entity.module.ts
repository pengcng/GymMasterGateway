import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'partners',
        loadChildren: () => import('./gymmasterapppartners/partners/partners.module').then(m => m.GymmasterapppartnersPartnersModule),
      },
      {
        path: 'partnersloc',
        loadChildren: () =>
          import('./gymmasterapppartners/partnersloc/partnersloc.module').then(m => m.GymmasterapppartnersPartnerslocModule),
      },
      {
        path: 'booking',
        loadChildren: () => import('./bookingPaymentApp/booking/booking.module').then(m => m.BookingPaymentAppBookingModule),
      },
      {
        path: 'payment',
        loadChildren: () => import('./bookingPaymentApp/payment/payment.module').then(m => m.BookingPaymentAppPaymentModule),
      },
      {
        path: 'catalogue',
        loadChildren: () => import('./gymMasterCatalogue/catalogue/catalogue.module').then(m => m.GymMasterCatalogueCatalogueModule),
      },
      {
        path: 'customer',
        loadChildren: () => import('./gymmastercustomer/customer/customer.module').then(m => m.GymmastercustomerCustomerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GymmastergatewayEntityModule {}
