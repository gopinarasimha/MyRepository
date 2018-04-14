import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {DealPageService} from "../deal-page.service";

@Component({
    selector: 'app-docs-list',
    templateUrl: './docs-list.component.html',
    styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnChanges {
    @Input() pages: Array<any> = [];
    @Input() activePage: Number = 0;

    public showFilteringDocs = false;
    public filteredPages = [];

    constructor(private dealPageSrv: DealPageService) {
    }

    ngOnChanges() {
        const {
            screenable,
            nonscreenable,
            duplicates,
            sort
        } = this.dealPageSrv.documentFilters;
        this.showFilteringDocs = screenable && nonscreenable && duplicates;
        this.filterDocs();

        this.dealPageSrv.documentFiltersUpdate.subscribe(filters => {
            this.showFilteringDocs = filters.screenable && filters.nonscreenable && filters.duplicates;
            this.filterDocs();
        });
    }

    setActivePage(pageNumber: Number, type: String) {
        let itemIndex;

        this.filteredPages.forEach((item, i) => {
            if (item['pageNumber'] === pageNumber) {
                itemIndex = i;
            }
        });
        switch (type) {
            case 'prev':
                if (itemIndex === 0) {
                    itemIndex = this.filteredPages.length - 1;
                } else {
                    itemIndex = itemIndex - 1;
                }
                break;
            case 'next':
                if (itemIndex === this.filteredPages.length - 1) {
                    itemIndex = 0;
                } else {
                    itemIndex = itemIndex + 1;
                }
                break;
            default:
                console.log('type must be defined');
        }

        this.dealPageSrv.updateDealPage(this.filteredPages[itemIndex]);
    }

    filterDocs() {
        const pages = [];
        const {
            screenable,
            nonscreenable,
            duplicates,
            sort
        } = this.dealPageSrv.documentFilters;

        if (this.showFilteringDocs) {
            this.filteredPages = this.pages;
        } else {
            this.filteredPages = this.pages && this.pages.filter(item => item.screenable === 'Y' && item.duplicate === 'N') || [];
        }
        const screenableArr = this.pages && this.pages.filter(page => page.screenable === 'Y' && page.duplicate !== 'Y') || [];
        const screenableDuplicatesArr = this.pages && this.pages.filter(page => page.screenable === 'Y' && page.duplicate === 'Y') || [];
        const nonscreenableArr = this.pages && this.pages.filter(page => page.screenable !== 'Y' && page.duplicate !== 'Y') || [];
        const nonscreenableDuplicatesArr = this.pages && this.pages.filter(page => page.screenable !== 'Y' && page.duplicate === 'Y') || [];
        if (screenable) {
            pages.push(...screenableArr);
            if (duplicates) {
                pages.push(...screenableDuplicatesArr);
            }
        }

        if (nonscreenable) {
            pages.push(...nonscreenableArr);
            if (duplicates) {
                pages.push(...nonscreenableDuplicatesArr);
            }
        }

        if (duplicates && !screenable && !nonscreenable) {
            pages.push(...screenableDuplicatesArr, ...nonscreenableDuplicatesArr);
        }

        if (sort) {
            pages.sort((a, b) => {
                let direct = 1;
                if (sort === 'desc') {
                    direct = -1;
                }
                if (a.dealClsTp > b.dealClsTp) {
                    return direct;
                } else {
                    return -direct;
                }
            });
        }

        /*if (pages.length) {
            debugger;
            this.dealPageSrv.updatePageNumber(pages[0].pageNumber);
        }*/

        this.filteredPages = pages;
    }

    filterDocsFlag() {
        if (this.showFilteringDocs) {
            this.dealPageSrv.updateDocumentFilters({
                screenable: true,
                nonscreenable: false,
                duplicates: false
            });
        } else {
            this.dealPageSrv.updateDocumentFilters({
                screenable: true,
                nonscreenable: true,
                duplicates: true
            });
        }
    }
}
