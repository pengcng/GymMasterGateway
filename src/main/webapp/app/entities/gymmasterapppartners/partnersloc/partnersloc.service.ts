import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IPartnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';

type EntityResponseType = HttpResponse<IPartnersloc>;
type EntityArrayResponseType = HttpResponse<IPartnersloc[]>;

@Injectable({ providedIn: 'root' })
export class PartnerslocService {
  public resourceUrl = SERVER_API_URL + 'services/gymmasterapppartners/api/partnerslocs';
  public resourceSearchUrl = SERVER_API_URL + 'services/gymmasterapppartners/api/_search/partnerslocs';

  constructor(protected http: HttpClient) {}

  create(partnersloc: IPartnersloc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partnersloc);
    return this.http
      .post<IPartnersloc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(partnersloc: IPartnersloc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partnersloc);
    return this.http
      .put<IPartnersloc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPartnersloc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPartnersloc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPartnersloc[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(partnersloc: IPartnersloc): IPartnersloc {
    const copy: IPartnersloc = Object.assign({}, partnersloc, {
      openTime: partnersloc.openTime && partnersloc.openTime.isValid() ? partnersloc.openTime.toJSON() : undefined,
      closeTime: partnersloc.closeTime && partnersloc.closeTime.isValid() ? partnersloc.closeTime.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.openTime = res.body.openTime ? moment(res.body.openTime) : undefined;
      res.body.closeTime = res.body.closeTime ? moment(res.body.closeTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((partnersloc: IPartnersloc) => {
        partnersloc.openTime = partnersloc.openTime ? moment(partnersloc.openTime) : undefined;
        partnersloc.closeTime = partnersloc.closeTime ? moment(partnersloc.closeTime) : undefined;
      });
    }
    return res;
  }
}
