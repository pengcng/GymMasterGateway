import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PartnerslocService } from 'app/entities/gymmasterapppartners/partnersloc/partnersloc.service';
import { IPartnersloc, Partnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';
import { regionEnum } from 'app/shared/model/enumerations/region-enum.model';

describe('Service Tests', () => {
  describe('Partnersloc Service', () => {
    let injector: TestBed;
    let service: PartnerslocService;
    let httpMock: HttpTestingController;
    let elemDefault: IPartnersloc;
    let expectedResult: IPartnersloc | IPartnersloc[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PartnerslocService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Partnersloc(0, regionEnum.C, 'AAAAAAA', 0, currentDate, currentDate, 'AAAAAAA', 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            openTime: currentDate.format(DATE_TIME_FORMAT),
            closeTime: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Partnersloc', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            openTime: currentDate.format(DATE_TIME_FORMAT),
            closeTime: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            openTime: currentDate,
            closeTime: currentDate,
          },
          returnedFromService
        );

        service.create(new Partnersloc()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Partnersloc', () => {
        const returnedFromService = Object.assign(
          {
            region: 'BBBBBB',
            address: 'BBBBBB',
            postalCode: 1,
            openTime: currentDate.format(DATE_TIME_FORMAT),
            closeTime: currentDate.format(DATE_TIME_FORMAT),
            pocName: 'BBBBBB',
            pocNo: 1,
            pocEmail: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            openTime: currentDate,
            closeTime: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Partnersloc', () => {
        const returnedFromService = Object.assign(
          {
            region: 'BBBBBB',
            address: 'BBBBBB',
            postalCode: 1,
            openTime: currentDate.format(DATE_TIME_FORMAT),
            closeTime: currentDate.format(DATE_TIME_FORMAT),
            pocName: 'BBBBBB',
            pocNo: 1,
            pocEmail: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            openTime: currentDate,
            closeTime: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Partnersloc', () => {
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
