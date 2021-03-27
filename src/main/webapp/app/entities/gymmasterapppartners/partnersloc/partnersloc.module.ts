import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymmastergatewaySharedModule } from 'app/shared/shared.module';
import { PartnerslocComponent } from './partnersloc.component';
import { PartnerslocDetailComponent } from './partnersloc-detail.component';
import { PartnerslocUpdateComponent } from './partnersloc-update.component';
import { PartnerslocDeleteDialogComponent } from './partnersloc-delete-dialog.component';
import { partnerslocRoute } from './partnersloc.route';

@NgModule({
  imports: [GymmastergatewaySharedModule, RouterModule.forChild(partnerslocRoute)],
  declarations: [PartnerslocComponent, PartnerslocDetailComponent, PartnerslocUpdateComponent, PartnerslocDeleteDialogComponent],
  entryComponents: [PartnerslocDeleteDialogComponent],
})
export class GymmasterapppartnersPartnerslocModule {}
