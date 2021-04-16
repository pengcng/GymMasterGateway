import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICatalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';
import { CatalogueService } from './catalogue.service';

@Component({
  templateUrl: './catalogue-delete-dialog.component.html',
})
export class CatalogueDeleteDialogComponent {
  catalogue?: ICatalogue;

  constructor(protected catalogueService: CatalogueService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.catalogueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('catalogueListModification');
      this.activeModal.close();
    });
  }
}
