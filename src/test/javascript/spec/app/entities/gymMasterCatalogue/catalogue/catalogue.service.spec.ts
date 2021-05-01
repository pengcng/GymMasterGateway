import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CatalogueService } from 'app/entities/gymMasterCatalogue/catalogue/catalogue.service';
import { ICatalogue, Catalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';
import { categoryEnum } from 'app/shared/model/enumerations/category-enum.model';

describe('Service Tests', () => {
  describe('Catalogue Service', () => {
    let injector: TestBed;
    let service: CatalogueService;
    let httpMock: HttpTestingController;
    let elemDefault: ICatalogue;
    let expectedResult: ICatalogue | ICatalogue[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CatalogueService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Catalogue(0, 'AAAAAAA', 0, 0, currentDate, categoryEnum.HIIT, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            sessionDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Catalogue', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            sessionDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sessionDt: currentDate,
          },
          returnedFromService
        );

        service.create(new Catalogue()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Catalogue', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            price: 1,
            duration: 1,
            sessionDt: currentDate.format(DATE_TIME_FORMAT),
            category: 'BBBBBB',
            username: 'BBBBBB',
            partnerId: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sessionDt: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Catalogue', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            price: 1,
            duration: 1,
            sessionDt: currentDate.format(DATE_TIME_FORMAT),
            category: 'BBBBBB',
            username: 'BBBBBB',
            partnerId: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sessionDt: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Catalogue', () => {
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
