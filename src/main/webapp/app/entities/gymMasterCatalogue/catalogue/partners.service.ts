import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IPartners } from 'app/shared/model/gymmasterapppartners/partners.model';

type EntityResponseType = HttpResponse<IPartners>;
type EntityArrayResponseType = HttpResponse<IPartners[]>;

@Injectable({ providedIn: 'root' })
export class PartnersService {
  public resourceUrl = SERVER_API_URL + 'services/gymmasterapppartners/api/partners';
  public resourceSearchUrl = SERVER_API_URL + 'services/gymmasterapppartners/api/_search/partners';

  constructor(protected http: HttpClient) {}

  create(partners: IPartners): Observable<EntityResponseType> {
    return this.http.post<IPartners>(this.resourceUrl, partners, { observe: 'response' });
  }

  update(partners: IPartners): Observable<EntityResponseType> {
    return this.http.put<IPartners>(this.resourceUrl, partners, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPartners>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartners[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartners[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
