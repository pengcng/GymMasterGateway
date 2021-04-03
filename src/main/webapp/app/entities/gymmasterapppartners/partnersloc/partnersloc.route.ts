import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPartnersloc, Partnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';
import { PartnerslocService } from './partnersloc.service';
import { PartnerslocComponent } from './partnersloc.component';
import { PartnerslocDetailComponent } from './partnersloc-detail.component';
import { PartnerslocUpdateComponent } from './partnersloc-update.component';

@Injectable({ providedIn: 'root' })
export class PartnerslocResolve implements Resolve<IPartnersloc> {
  constructor(private service: PartnerslocService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPartnersloc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((partnersloc: HttpResponse<Partnersloc>) => {
          if (partnersloc.body) {
            return of(partnersloc.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Partnersloc());
  }
}

export const partnerslocRoute: Routes = [
  {
    path: '',
    component: PartnerslocComponent,
    data: {
      authorities: [Authority.USER, Authority.PARTNER],
      defaultSort: 'id,asc',
      pageTitle: 'Partnerslocs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PartnerslocDetailComponent,
    resolve: {
      partnersloc: PartnerslocResolve,
    },
    data: {
      authorities: [Authority.USER, Authority.PARTNER],
      pageTitle: 'Partnerslocs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PartnerslocUpdateComponent,
    resolve: {
      partnersloc: PartnerslocResolve,
    },
    data: {
      authorities: [Authority.USER, Authority.PARTNER],
      pageTitle: 'Partnerslocs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PartnerslocUpdateComponent,
    resolve: {
      partnersloc: PartnerslocResolve,
    },
    data: {
      authorities: [Authority.USER, Authority.PARTNER],
      pageTitle: 'Partnerslocs',
    },
    canActivate: [UserRouteAccessService],
  },
];
