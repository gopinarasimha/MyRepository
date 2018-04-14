import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-deal-select-filter-search',
    templateUrl: './deal-select-filter-search.component.html',
    styleUrls: ['./deal-select-filter-search.component.scss']
})
export class DealSelectFilterSearchComponent implements OnInit {
    @Output() onChange: EventEmitter<any> = new EventEmitter()
    @Input() filterName;
    @Input() filterLabel = '';

    public searchTypes = [
        { label: 'Start with', value: 'start' },
        { label: 'End with', value: 'end' },
        { label: 'Includes', value: 'includes' }
    ];
    public searchType = 'start';
    public searchText = '';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        const queryParams = this.route.snapshot.queryParams;

        if (queryParams[this.filterName]) {
            this.searchType = queryParams[this.filterName].split(';')[0];
            this.searchText = queryParams[this.filterName].split(';')[1];
        }
    }

    filterChanged() {
        console.log({ filter: this.filterName, value: `${this.searchType};${this.searchText}` });
        this.onChange.emit({ filter: this.filterName, value: `${this.searchType};${this.searchText}` });
    }

    clearItem() {
        this.searchText = '';
        this.searchType = null;
        this.onChange.emit({ filter: this.filterName, value: null });
    }

}
