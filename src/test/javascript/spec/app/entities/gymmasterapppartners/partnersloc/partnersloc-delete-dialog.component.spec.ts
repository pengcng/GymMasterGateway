import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { PartnerslocDeleteDialogComponent } from 'app/entities/gymmasterapppartners/partnersloc/partnersloc-delete-dialog.component';
import { PartnerslocService } from 'app/entities/gymmasterapppartners/partnersloc/partnersloc.service';

describe('Component Tests', () => {
  describe('Partnersloc Management Delete Component', () => {
    let comp: PartnerslocDeleteDialogComponent;
    let fixture: ComponentFixture<PartnerslocDeleteDialogComponent>;
    let service: PartnerslocService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [PartnerslocDeleteDialogComponent],
      })
        .overrideTemplate(PartnerslocDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartnerslocDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnerslocService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
