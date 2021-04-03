import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPartners, Partners } from 'app/shared/model/gymmasterapppartners/partners.model';
import { PartnersService } from './partners.service';
import { PartnersComponent } from './partners.component';
import { PartnersDetailComponent } from './partners-detail.component';
import { PartnersUpdateComponent } from './partners-update.component';

@Injectable({ providedIn: 'root' })
export class PartnersResolve implements Resolve<IPartners> {
  constructor(private service: PartnersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPartners> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((partners: HttpResponse<Partners>) => {
          if (partners.body) {
            return of(partners.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Partners());
  }
}

export const partnersRoute: Routes = [
  {
    path: '',
    component: PartnersComponent,
    data: {
      authorities: [Authority.USER, Authority.PARTNER],
      defaultSort: 'id,asc',
      pageTitle: 'Partners',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PartnersDetailComponent,
    resolve: {
      partners: PartnersResolve,
    },
    data: {
      authorities: [Authority.USER, Authority.PARTNER],
      pageTitle: 'Partners',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PartnersUpdateComponent,
    resolve: {
      partners: PartnersResolve,
    },
    data: {
      authorities: [Authority.USER, Authority.PARTNER],
      pageTitle: 'Partners',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PartnersUpdateComponent,
    resolve: {
      partners: PartnersResolve,
    },
    data: {
      authorities: [Authority.USER, Authority.PARTNER],
      pageTitle: 'Partners',
    },
    canActivate: [UserRouteAccessService],
  },
];
