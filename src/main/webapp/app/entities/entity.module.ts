import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'partners',
        loadChildren: () => import('./gymmasterapppartners/partners/partners.module').then(m => m.GymmasterapppartnersPartnersModule),
      },
      {
        path: 'partnersloc',
        loadChildren: () =>
          import('./gymmasterapppartners/partnersloc/partnersloc.module').then(m => m.GymmasterapppartnersPartnerslocModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GymmastergatewayEntityModule {}
