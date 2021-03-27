import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymmastergatewaySharedModule } from 'app/shared/shared.module';
import { PartnersComponent } from './partners.component';
import { PartnersDetailComponent } from './partners-detail.component';
import { PartnersUpdateComponent } from './partners-update.component';
import { PartnersDeleteDialogComponent } from './partners-delete-dialog.component';
import { partnersRoute } from './partners.route';

@NgModule({
  imports: [GymmastergatewaySharedModule, RouterModule.forChild(partnersRoute)],
  declarations: [PartnersComponent, PartnersDetailComponent, PartnersUpdateComponent, PartnersDeleteDialogComponent],
  entryComponents: [PartnersDeleteDialogComponent],
})
export class GymmasterapppartnersPartnersModule {}
