import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class QueryParamsService {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    public setQueryParams(params) {
        const newParams = Object.assign({}, params);

        this.router.navigate([], {
            queryParams: newParams
        });
    }

}
