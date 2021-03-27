import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GymmastergatewaySharedModule } from 'app/shared/shared.module';
import { GymmastergatewayCoreModule } from 'app/core/core.module';
import { GymmastergatewayAppRoutingModule } from './app-routing.module';
import { GymmastergatewayHomeModule } from './home/home.module';
import { GymmastergatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    GymmastergatewaySharedModule,
    GymmastergatewayCoreModule,
    GymmastergatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GymmastergatewayEntityModule,
    GymmastergatewayAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class GymmastergatewayAppModule {}
