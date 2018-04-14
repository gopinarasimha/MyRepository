import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DocsListComponent} from './docs-list/docs-list.component';
import {DocsMenuComponent} from './docs-menu/docs-menu.component';

import {MultiSelectModule, TabMenuModule, TabViewModule, DropdownModule, DialogModule} from 'primeng/primeng';

import {DealInfoComponent} from './deal-info/deal-info.component';
import {DealPageComponent} from './deal-page/deal-page.component';
import {NameCaptureBlockComponent} from './name-capture-block/name-capture-block.component';
import {NameCaptureItemComponent} from './name-capture-item/name-capture-item.component';
import {NameCaptureAddComponent} from './name-capture-add/name-capture-add.component';
import {DealPageService} from './deal-page.service';
import {DealSelectComponent} from './deal-select/deal-select.component';
import {DealSelectItemComponent} from './deal-select-item/deal-select-item.component';
import {DealSelectFilterComponent} from './deal-select-filter/deal-select-filter.component';
import {DealSelectFilterSearchComponent} from './deal-select-filter-search/deal-select-filter-search.component';
import {SharedModule} from '../shared/shared.module';
import {DealSelectFilterDoubleComponent} from './deal-select-filter-double/deal-select-filter-double.component';
import {DealSelectFilterSelectComponent} from './deal-select-filter-select/deal-select-filter-select.component';
import { FilterItemDirective } from './filter-item.directive';
import { DocsViewerComponent } from './docs-viewer/docs-viewer.component';
import {HttpModule} from '@angular/http';
import { DocsListThumbnailComponent } from './docs-list-thumbnail/docs-list-thumbnail.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MultiSelectModule,
        TabMenuModule,
        TabViewModule,
        DropdownModule,
        DialogModule,
        SharedModule
    ],
    declarations: [
        DocsListComponent,
        DocsMenuComponent,
        DealInfoComponent,
        DealPageComponent,
        NameCaptureBlockComponent,
        NameCaptureItemComponent,
        NameCaptureAddComponent,
        DealSelectComponent,
        DealSelectItemComponent,
        DealSelectFilterComponent,
        DealSelectFilterSearchComponent,
        DealSelectFilterDoubleComponent,
        DealSelectFilterSelectComponent,
        FilterItemDirective,
        DocsViewerComponent,
        DocsListThumbnailComponent
    ],
    exports: [DealPageComponent, DealSelectComponent],
    providers: [DealPageService],
})
export class DealPageModule {
}
