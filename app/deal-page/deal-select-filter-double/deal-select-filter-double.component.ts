import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-deal-select-filter-double',
  templateUrl: './deal-select-filter-double.component.html',
  styleUrls: ['./deal-select-filter-double.component.scss']
})
export class DealSelectFilterDoubleComponent implements OnInit {
    @Output() onChange: EventEmitter<any> = new EventEmitter()
    @Input() filterName;
    @Input() filterLabel = '';

    public searchTypes = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
    ];

    public searchKeys = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
    ];

    public searchType = '1';
    public searchKey = '1';
    public searchText = '';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        const queryParams = this.route.snapshot.queryParams;

        if (queryParams[this.filterName]) {
            this.searchType = queryParams[this.filterName].split(';')[0];
            this.searchKey = queryParams[this.filterName].split(';')[1];
            this.searchText = queryParams[this.filterName].split(';')[2];
        }
    }

    filterChanged() {
        this.onChange.emit({ filter: this.filterName, value: `${this.searchType};${this.searchKey};${this.searchText}` });
    }

    clearItem() {
        this.searchText = '';
        this.searchType = null;
        this.searchKey = null;
        this.onChange.emit({ filter: this.filterName, value: null });
    }

}
