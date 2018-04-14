import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {DealPageModule} from './deal-page/deal-page.module';

import {AppComponent} from './app.component';
import {DealPageComponent} from './deal-page/deal-page/deal-page.component';
import {DealSelectComponent} from './deal-page/deal-select/deal-select.component';

const appRoutes: Routes = [
    {
        path: 'deal/select',
        component: DealSelectComponent
    },
    {
        path: 'deal/:id',
        component: DealPageComponent
    }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DealPageModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
