import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBookingPayment, BookingPayment } from 'app/shared/model/gymMasterBookingPayment/booking-payment.model';
import { BookingPaymentService } from './booking-payment.service';
import { BookingPaymentComponent } from './booking-payment.component';
import { BookingPaymentDetailComponent } from './booking-payment-detail.component';
import { BookingPaymentUpdateComponent } from './booking-payment-update.component';

@Injectable({ providedIn: 'root' })
export class BookingPaymentResolve implements Resolve<IBookingPayment> {
  constructor(private service: BookingPaymentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBookingPayment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bookingPayment: HttpResponse<BookingPayment>) => {
          if (bookingPayment.body) {
            return of(bookingPayment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BookingPayment());
  }
}

export const bookingPaymentRoute: Routes = [
  {
    path: '',
    component: BookingPaymentComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'BookingPayments',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BookingPaymentDetailComponent,
    resolve: {
      bookingPayment: BookingPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BookingPayments',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BookingPaymentUpdateComponent,
    resolve: {
      bookingPayment: BookingPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BookingPayments',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BookingPaymentUpdateComponent,
    resolve: {
      bookingPayment: BookingPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BookingPayments',
    },
    canActivate: [UserRouteAccessService],
  },
];
