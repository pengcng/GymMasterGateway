import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';

@Component({
  selector: 'jhi-partnersloc-detail',
  templateUrl: './partnersloc-detail.component.html',
})
export class PartnerslocDetailComponent implements OnInit {
  partnersloc: IPartnersloc | null = null;
  name = 'Angular 5';
  lat: any;
  lng: any;

  constructor(protected activatedRoute: ActivatedRoute) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partnersloc }) => (this.partnersloc = partnersloc));
  }

  previousState(): void {
    window.history.back();
  }
}
