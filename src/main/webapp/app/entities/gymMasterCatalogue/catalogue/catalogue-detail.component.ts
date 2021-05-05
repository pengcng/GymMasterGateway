import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICatalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';

@Component({
  selector: 'jhi-catalogue-detail',
  templateUrl: './catalogue-detail.component.html',
})
export class CatalogueDetailComponent implements OnInit {
  catalogue: ICatalogue | null = null;
  url: any;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ catalogue }) => (this.catalogue = catalogue));
  }

  previousState(): void {
    window.history.back();
  }

  toBookingUrl(): void {
    this.url = 'http://' + window.location.hostname + ':5000/booking/new#' + this.catalogue!.id + '#' + this.catalogue!.price;
    console.warn('url= ' + this.url);
    window.open(this.url);
  }
}
