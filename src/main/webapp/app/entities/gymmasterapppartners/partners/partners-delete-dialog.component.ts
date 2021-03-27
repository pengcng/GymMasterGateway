import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartners } from 'app/shared/model/gymmasterapppartners/partners.model';
import { PartnersService } from './partners.service';

@Component({
  templateUrl: './partners-delete-dialog.component.html',
})
export class PartnersDeleteDialogComponent {
  partners?: IPartners;

  constructor(protected partnersService: PartnersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.partnersService.delete(id).subscribe(() => {
      this.eventManager.broadcast('partnersListModification');
      this.activeModal.close();
    });
  }
}
