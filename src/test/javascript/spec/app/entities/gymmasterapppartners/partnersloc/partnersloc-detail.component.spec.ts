import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { PartnerslocDetailComponent } from 'app/entities/gymmasterapppartners/partnersloc/partnersloc-detail.component';
import { Partnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';

describe('Component Tests', () => {
  describe('Partnersloc Management Detail Component', () => {
    let comp: PartnerslocDetailComponent;
    let fixture: ComponentFixture<PartnerslocDetailComponent>;
    const route = ({ data: of({ partnersloc: new Partnersloc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [PartnerslocDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PartnerslocDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartnerslocDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load partnersloc on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partnersloc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
