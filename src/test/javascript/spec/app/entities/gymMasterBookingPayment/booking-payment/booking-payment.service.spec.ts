import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BookingPaymentService } from 'app/entities/gymMasterBookingPayment/booking-payment/booking-payment.service';
import { IBookingPayment, BookingPayment } from 'app/shared/model/gymMasterBookingPayment/booking-payment.model';
import { CancelInd } from 'app/shared/model/enumerations/cancel-ind.model';

describe('Service Tests', () => {
  describe('BookingPayment Service', () => {
    let injector: TestBed;
    let service: BookingPaymentService;
    let httpMock: HttpTestingController;
    let elemDefault: IBookingPayment;
    let expectedResult: IBookingPayment | IBookingPayment[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BookingPaymentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new BookingPayment(0, 'AAAAAAA', 'AAAAAAA', CancelInd.A, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            bookingDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a BookingPayment', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            bookingDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bookingDt: currentDate,
          },
          returnedFromService
        );

        service.create(new BookingPayment()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a BookingPayment', () => {
        const returnedFromService = Object.assign(
          {
            catalogueId: 'BBBBBB',
            partnerId: 'BBBBBB',
            cancelInd: 'BBBBBB',
            bookingDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bookingDt: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of BookingPayment', () => {
        const returnedFromService = Object.assign(
          {
            catalogueId: 'BBBBBB',
            partnerId: 'BBBBBB',
            cancelInd: 'BBBBBB',
            bookingDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bookingDt: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a BookingPayment', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
