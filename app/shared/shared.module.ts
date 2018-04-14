import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueryParamsService} from './query-params.service';
import { CustomButtonComponent } from './custom-button/custom-button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        QueryParamsService
    ],
    declarations: [
        CustomButtonComponent
    ],
    exports: [
        CustomButtonComponent
    ]
})
export class SharedModule {
}
