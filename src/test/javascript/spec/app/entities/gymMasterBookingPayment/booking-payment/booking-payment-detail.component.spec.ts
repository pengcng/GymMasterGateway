import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { BookingPaymentDetailComponent } from 'app/entities/gymMasterBookingPayment/booking-payment/booking-payment-detail.component';
import { BookingPayment } from 'app/shared/model/gymMasterBookingPayment/booking-payment.model';

describe('Component Tests', () => {
  describe('BookingPayment Management Detail Component', () => {
    let comp: BookingPaymentDetailComponent;
    let fixture: ComponentFixture<BookingPaymentDetailComponent>;
    const route = ({ data: of({ bookingPayment: new BookingPayment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [BookingPaymentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BookingPaymentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BookingPaymentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bookingPayment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bookingPayment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
