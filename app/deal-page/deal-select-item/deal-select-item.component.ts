import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {QueryParamsService} from "../../shared/query-params.service";

@Component({
    selector: 'app-deal-select-item',
    templateUrl: './deal-select-item.component.html',
    styleUrls: ['./deal-select-item.component.scss']
})
export class DealSelectItemComponent implements OnInit {
    @Input() item;
    @Input() isOdd;
    @Input() isActive = false;
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    public type;

    @HostListener('click')
    onClick() {
        this.isActive = true;
        const newQueryParams = {
            selectedDeal: this.item.id
        };
        this.queryParamsSrv.setQueryParams(newQueryParams);
        this.onChange.emit(this.item.id);
    }

    constructor(private queryParamsSrv: QueryParamsService) {
    }

    ngOnInit() {
        this.type = this.item.type;
    }

    onKeyClicked($event) {
        $event.stopPropagation();
        alert('Key was clicked!');
    }
}
