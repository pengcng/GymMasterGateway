import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ICatalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';

type EntityResponseType = HttpResponse<ICatalogue>;
type EntityArrayResponseType = HttpResponse<ICatalogue[]>;

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  public resourceUrl = SERVER_API_URL + 'services/gymmastercatalogue/api/catalogues';
  public resourceSearchUrl = SERVER_API_URL + 'services/gymmastercatalogue/api/_search/catalogues';

  constructor(protected http: HttpClient) {}

  create(catalogue: ICatalogue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(catalogue);
    return this.http
      .post<ICatalogue>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(catalogue: ICatalogue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(catalogue);
    return this.http
      .put<ICatalogue>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICatalogue>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICatalogue[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICatalogue[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(catalogue: ICatalogue): ICatalogue {
    const copy: ICatalogue = Object.assign({}, catalogue, {
      sessionDt: catalogue.sessionDt && catalogue.sessionDt.isValid() ? catalogue.sessionDt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sessionDt = res.body.sessionDt ? moment(res.body.sessionDt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((catalogue: ICatalogue) => {
        catalogue.sessionDt = catalogue.sessionDt ? moment(catalogue.sessionDt) : undefined;
      });
    }
    return res;
  }
}
