import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DealPageService} from '../deal-page.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-deal-page',
    templateUrl: './deal-page.component.html',
    styleUrls: ['./deal-page.component.scss']
})
export class DealPageComponent implements OnInit {
    public dealObject: Object = {};
    public activePage: Object = {};
    public activePageNumber: Number;
    public showApprovePageBtn = false;

    @ViewChild('docList') docList: ElementRef;

    constructor(
        private dealPageSrv: DealPageService,
        private route: ActivatedRoute,
        private location: Location
    ) {
    }

    ngOnInit() {
        const dealId = this.route.snapshot.params['id'];
        this.dealPageSrv.activePageNumberUpdate.subscribe(item => {
            debugger;
            this.activePage = item.activePage;
            this.activePageNumber = item.activePageNumber;
            this.toggleApprovePageButton(item.activePage['nameCaptureList']);
        });
        this.dealPageSrv.getDealObject(dealId).subscribe(dealObject => {
            this.dealObject = dealObject;
            this.dealPageSrv.updateDealPage(dealObject.documentsList[0]);
        });
        this.dealPageSrv.nameCaptureUpdate.subscribe(items => {
            this.toggleApprovePageButton(items);
            this.resetApprovePage(items);
        });
    }

    toggleApprovePageButton(items = []) {
        const unApproved = items.some(item => !item.approved);

        if (unApproved) {
            this.showApprovePageBtn = false;
        } else {
            if (!this.activePage['approved']) {
                this.showApprovePageBtn = true;
            } else {
                this.showApprovePageBtn = false;
            }
        }
    }

    resetApprovePage(items) {
        const unApproved = items.some(item => !item.approved);

        if (this.activePage['approved'] && unApproved) {
            this.activePage['approved'] = false;
        }
    }

    previousPage() {
        this.location.back();
    }

    goToNextPage() {
        const pages = this.docList['filteredPages'];
        let indexActivePage = null;
        pages.forEach((page, index) => {
            if (page['_id'] === this.activePage['_id']) {
                indexActivePage = index;
            }
        });
        let index = indexActivePage;
        while (++index !== indexActivePage) {
            if (index > pages.length - 1) {
                index = 0;
            }
            if (!pages[index].approved || index === indexActivePage) {
                break;
            }
        }

        this.dealPageSrv.updatePageNumber(pages[index].pageNumber);
    }

    approvePage() {
        this.activePage['approved'] = true;
        this.showApprovePageBtn = false;
        this.goToNextPage();
    }
}
