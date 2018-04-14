import {Component, OnInit, HostListener, ElementRef, ViewEncapsulation, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QueryParamsService} from '../../shared/query-params.service';
import {CustomButtonComponent} from "../../shared/custom-button/custom-button.component";
import {DealPageService} from "../deal-page.service";

@Component({
    selector: 'app-docs-menu',
    templateUrl: './docs-menu.component.html',
    styleUrls: ['./docs-menu.component.scss']
})
export class DocsMenuComponent implements OnInit {
    public showMenu: Boolean = false;
    public filter: any;
    public screenable: any;
    public nonscreenable: any;
    public duplicates: any;
    public sort: any;

    @ViewChild(CustomButtonComponent) docsBtn: CustomButtonComponent;

    @HostListener('document:click', ['$event'])
    clickOut(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.showMenu = false;
            this.docsBtn.active = false;
        }
    }

    constructor(
        private eRef: ElementRef,
        private dealPageSrv: DealPageService
    ) {
    }

    ngOnInit() {
        const filters = this.dealPageSrv.documentFilters;
        this.screenable = filters.screenable;
        this.nonscreenable = filters.nonscreenable;
        this.duplicates = filters.duplicates;
        this.sort = filters.sort;

        this.dealPageSrv.documentFiltersUpdate.subscribe(newFilters => {
            Object.assign(this, newFilters);
        });
    }

    toggleShowMenu() {
        this.showMenu = !this.showMenu;
    }

    changeFilter() {
        const {
            screenable,
            nonscreenable,
            duplicates,
            sort
        } = this;
        this.dealPageSrv.updateDocumentFilters({
            screenable,
            nonscreenable,
            duplicates,
            sort
        });
    }

}
