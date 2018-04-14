import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-deal-select-filter-select',
  templateUrl: './deal-select-filter-select.component.html',
  styleUrls: ['./deal-select-filter-select.component.scss']
})
export class DealSelectFilterSelectComponent implements OnInit {
    @Output() onChange: EventEmitter<any> = new EventEmitter()
    @Input() filterName;
    @Input() filterLabel = '';
    @Input() searchTypes = [
        { label: 'Digitizer', value: 'digitizer' },
        { label: 'Maker', value: 'maker' },
        { label: 'Checker', value: 'checker' },
        { label: 'Approved', value: 'approved' }
    ];
    public searchType = this.searchTypes[0].value;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        const queryParams = this.route.snapshot.queryParams;

        if (queryParams[this.filterName]) {
            this.searchType = queryParams[this.filterName];
        }
    }

    filterChanged() {
        this.onChange.emit({ filter: this.filterName, value: this.searchType });
    }

    clearItem() {
        this.searchType = null;
        this.onChange.emit({ filter: this.filterName, value: null });
    }

}
