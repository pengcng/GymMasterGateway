import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICatalogue, Catalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';
import { CatalogueService } from './catalogue.service';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueDetailComponent } from './catalogue-detail.component';
import { CatalogueUpdateComponent } from './catalogue-update.component';

@Injectable({ providedIn: 'root' })
export class CatalogueResolve implements Resolve<ICatalogue> {
  constructor(private service: CatalogueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICatalogue> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((catalogue: HttpResponse<Catalogue>) => {
          if (catalogue.body) {
            return of(catalogue.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Catalogue());
  }
}

export const catalogueRoute: Routes = [
  {
    path: '',
    component: CatalogueComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Catalogues',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CatalogueDetailComponent,
    resolve: {
      catalogue: CatalogueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Catalogues',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CatalogueUpdateComponent,
    resolve: {
      catalogue: CatalogueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Catalogues',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CatalogueUpdateComponent,
    resolve: {
      catalogue: CatalogueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Catalogues',
    },
    canActivate: [UserRouteAccessService],
  },
];
