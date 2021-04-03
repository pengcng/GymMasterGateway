import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBooking, Booking } from 'app/shared/model/bookingPaymentApp/booking.model';
import { BookingService } from './booking.service';
import { BookingComponent } from './booking.component';
import { BookingDetailComponent } from './booking-detail.component';
import { BookingUpdateComponent } from './booking-update.component';

@Injectable({ providedIn: 'root' })
export class BookingResolve implements Resolve<IBooking> {
  constructor(private service: BookingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBooking> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((booking: HttpResponse<Booking>) => {
          if (booking.body) {
            return of(booking.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Booking());
  }
}

export const bookingRoute: Routes = [
  {
    path: '',
    component: BookingComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Bookings',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BookingDetailComponent,
    resolve: {
      booking: BookingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bookings',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BookingUpdateComponent,
    resolve: {
      booking: BookingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bookings',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BookingUpdateComponent,
    resolve: {
      booking: BookingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bookings',
    },
    canActivate: [UserRouteAccessService],
  },
];
