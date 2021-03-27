import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { PartnersUpdateComponent } from 'app/entities/gymmasterapppartners/partners/partners-update.component';
import { PartnersService } from 'app/entities/gymmasterapppartners/partners/partners.service';
import { Partners } from 'app/shared/model/gymmasterapppartners/partners.model';

describe('Component Tests', () => {
  describe('Partners Management Update Component', () => {
    let comp: PartnersUpdateComponent;
    let fixture: ComponentFixture<PartnersUpdateComponent>;
    let service: PartnersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [PartnersUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PartnersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartnersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Partners(123);
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
        const entity = new Partners();
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
