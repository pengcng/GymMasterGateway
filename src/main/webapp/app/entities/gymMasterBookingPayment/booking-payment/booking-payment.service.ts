import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IBookingPayment } from 'app/shared/model/gymMasterBookingPayment/booking-payment.model';

type EntityResponseType = HttpResponse<IBookingPayment>;
type EntityArrayResponseType = HttpResponse<IBookingPayment[]>;

@Injectable({ providedIn: 'root' })
export class BookingPaymentService {
  public resourceUrl = SERVER_API_URL + 'services/gymmasterbookingpayment/api/booking-payments';
  public resourceSearchUrl = SERVER_API_URL + 'services/gymmasterbookingpayment/api/_search/booking-payments';

  constructor(protected http: HttpClient) {}

  create(bookingPayment: IBookingPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bookingPayment);
    return this.http
      .post<IBookingPayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bookingPayment: IBookingPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bookingPayment);
    return this.http
      .put<IBookingPayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBookingPayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBookingPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBookingPayment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(bookingPayment: IBookingPayment): IBookingPayment {
    const copy: IBookingPayment = Object.assign({}, bookingPayment, {
      bookingDt: bookingPayment.bookingDt && bookingPayment.bookingDt.isValid() ? bookingPayment.bookingDt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.bookingDt = res.body.bookingDt ? moment(res.body.bookingDt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((bookingPayment: IBookingPayment) => {
        bookingPayment.bookingDt = bookingPayment.bookingDt ? moment(bookingPayment.bookingDt) : undefined;
      });
    }
    return res;
  }
}
