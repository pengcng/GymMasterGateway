import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { PartnersDetailComponent } from 'app/entities/gymmasterapppartners/partners/partners-detail.component';
import { Partners } from 'app/shared/model/gymmasterapppartners/partners.model';

describe('Component Tests', () => {
  describe('Partners Management Detail Component', () => {
    let comp: PartnersDetailComponent;
    let fixture: ComponentFixture<PartnersDetailComponent>;
    const route = ({ data: of({ partners: new Partners(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [PartnersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PartnersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartnersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load partners on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partners).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
