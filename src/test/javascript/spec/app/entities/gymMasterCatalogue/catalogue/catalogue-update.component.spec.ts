import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { CatalogueUpdateComponent } from 'app/entities/gymMasterCatalogue/catalogue/catalogue-update.component';
import { CatalogueService } from 'app/entities/gymMasterCatalogue/catalogue/catalogue.service';
import { Catalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';

describe('Component Tests', () => {
  describe('Catalogue Management Update Component', () => {
    let comp: CatalogueUpdateComponent;
    let fixture: ComponentFixture<CatalogueUpdateComponent>;
    let service: CatalogueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [CatalogueUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CatalogueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CatalogueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CatalogueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Catalogue(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Catalogue();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
