import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartners } from 'app/shared/model/gymmasterapppartners/partners.model';

@Component({
  selector: 'jhi-partners-detail',
  templateUrl: './partners-detail.component.html',
})
export class PartnersDetailComponent implements OnInit {
  partners: IPartners | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partners }) => (this.partners = partners));
  }

  previousState(): void {
    window.history.back();
  }
}
