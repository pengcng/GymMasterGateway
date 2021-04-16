import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GymmastergatewayTestModule } from '../../../../test.module';
import { CatalogueDetailComponent } from 'app/entities/gymMasterCatalogue/catalogue/catalogue-detail.component';
import { Catalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';

describe('Component Tests', () => {
  describe('Catalogue Management Detail Component', () => {
    let comp: CatalogueDetailComponent;
    let fixture: ComponentFixture<CatalogueDetailComponent>;
    const route = ({ data: of({ catalogue: new Catalogue(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GymmastergatewayTestModule],
        declarations: [CatalogueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CatalogueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CatalogueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load catalogue on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.catalogue).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
