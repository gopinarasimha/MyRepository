import {
    Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, ViewChildren
} from '@angular/core';
import {DealPageService} from '../deal-page.service';
import {NameCaptureItemComponent} from '../name-capture-item/name-capture-item.component';

@Component({
    selector: 'app-name-capture-block',
    templateUrl: './name-capture-block.component.html',
    styleUrls: ['./name-capture-block.component.scss']
})
export class NameCaptureBlockComponent implements OnInit {
    @Input() activePageNumber = 1;
    @ViewChildren(NameCaptureItemComponent) nameCaptureItems: QueryList<NameCaptureItemComponent>;
    public items: Array<Object> = [];
    public itemsCopies: Array<Object> = [];

    constructor(private dealPageSrv: DealPageService) {
    }

    ngOnInit() {
        this.setRoleCards(this.dealPageSrv.activePage);
        this.dealPageSrv.activePageNumberUpdate.subscribe(data => {
            this.activePageNumber = data.activePageNumber;
            this.setRoleCards(data.activePage);
        });
    }

    setRoleCards(activePage) {
        if (!activePage) {
            return;
        }

        this.items = activePage.nameCaptureList && activePage.nameCaptureList.filter(item => !item['approved'] || item['main']) || [];
        this.itemsCopies = activePage.nameCaptureList && activePage.nameCaptureList.filter(item => item['approved'] && !item['main']) || [];

        this.dealPageSrv.nameCaptureUpdate.subscribe(items => {
            this.items = items.filter(item => !item.approved || item.main);
            this.itemsCopies = items.filter(item => item.approved && !item.main);
        });
    }

    updateElems() {
        this.nameCaptureItems.forEach(item => item.updateData());
    }

}
