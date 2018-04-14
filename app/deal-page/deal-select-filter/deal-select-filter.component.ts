import {
    AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList,
    ViewChildren
} from '@angular/core';
import {QueryParamsService} from '../../shared/query-params.service';
import {FilterItemDirective} from "../filter-item.directive";
import {DealSelectFilterSearchComponent} from "../deal-select-filter-search/deal-select-filter-search.component";

@Component({
    selector: 'app-deal-select-filter',
    templateUrl: './deal-select-filter.component.html',
    styleUrls: ['./deal-select-filter.component.scss']
})
export class DealSelectFilterComponent implements OnInit, AfterViewInit {
    @Input() data;
    @Output() ApplyFilters: EventEmitter<any> = new EventEmitter();
    @ViewChildren('appFilterItem') filterItems: QueryList<any>;

    public dealIds;

    constructor(private queryParamsSrv: QueryParamsService) {
    }

    ngOnInit() {
        this.dealIds = this.data.filter(item => !item.type).map(item => ({ label: item.dealId, value: item.dealId }))
    }

    ngAfterViewInit() {
        // console.log(this.filterItems);
    }

    filterChanged(value) {
        const newQueryParams = {};
        newQueryParams[value.filter] = value.value;
        this.queryParamsSrv.setQueryParams(newQueryParams);
    }

    clearFilters() {
        this.filterItems.map(filter => filter.clearItem());
    }

    applyFilters() {
        this.ApplyFilters.emit();
    }

}
