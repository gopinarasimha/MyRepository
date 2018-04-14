import {
    Component, ElementRef, HostBinding, Input, OnChanges, OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-deal-info',
    templateUrl: './deal-info.component.html',
    styleUrls: ['./deal-info.component.scss'],
})
export class DealInfoComponent implements OnChanges {
    @HostBinding('class.deal-info') true;
    @Input() activePage = {};
    @ViewChild('tabView') tabView: ElementRef;

    constructor(private router: Router) {
    }

    ngOnChanges() {
        console.log(this.activePage);
    }

    tabViewChange(event) {
        if (this.tabView['el'].nativeElement.querySelector('.analytics-link') === event.originalEvent.currentTarget) {
            this.router.navigate(['analytics']);
        }
    }

}
