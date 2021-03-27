import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { PartnerslocUpdateComponent } from 'app/entities/gymmasterapppartners/partnersloc/partnersloc-update.component';
import { PartnerslocService } from 'app/entities/gymmasterapppartners/partnersloc/partnersloc.service';
import { Partnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';

describe('Component Tests', () => {
  describe('Partnersloc Management Update Component', () => {
    let comp: PartnerslocUpdateComponent;
    let fixture: ComponentFixture<PartnerslocUpdateComponent>;
    let service: PartnerslocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [PartnerslocUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PartnerslocUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartnerslocUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnerslocService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Partnersloc(123);
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
        const entity = new Partnersloc();
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
