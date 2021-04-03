import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { BookingPaymentUpdateComponent } from 'app/entities/gymMasterBookingPayment/booking-payment/booking-payment-update.component';
import { BookingPaymentService } from 'app/entities/gymMasterBookingPayment/booking-payment/booking-payment.service';
import { BookingPayment } from 'app/shared/model/gymMasterBookingPayment/booking-payment.model';

describe('Component Tests', () => {
  describe('BookingPayment Management Update Component', () => {
    let comp: BookingPaymentUpdateComponent;
    let fixture: ComponentFixture<BookingPaymentUpdateComponent>;
    let service: BookingPaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [BookingPaymentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BookingPaymentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BookingPaymentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BookingPaymentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BookingPayment(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new BookingPayment();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
