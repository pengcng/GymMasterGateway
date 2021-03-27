import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';
import { PartnerslocService } from './partnersloc.service';

@Component({
  templateUrl: './partnersloc-delete-dialog.component.html',
})
export class PartnerslocDeleteDialogComponent {
  partnersloc?: IPartnersloc;

  constructor(
    protected partnerslocService: PartnerslocService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.partnerslocService.delete(id).subscribe(() => {
      this.eventManager.broadcast('partnerslocListModification');
      this.activeModal.close();
    });
  }
}
