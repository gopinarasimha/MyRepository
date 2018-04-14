import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

const mockSelectItems = [
    {
        id: '0',
        type: 'header',
    },
    {
        id: '1',
        countryCode: 'US',
        dealId: 'TF957B8581',
        productCode: '01',
        stepCode: 'AMD',
        systemCode: 'DTP',
        clientId: 'ZPSVZQ7PI6',
        registrationTimeStamp: 'Apr 7, 2017 10:28 AM'
    },
    {
        id: '2',
        countryCode: 'AU',
        dealId: 'TF5408ZH52',
        productCode: '15',
        stepCode: 'AMD',
        systemCode: 'OTP',
        clientId: 'T4QUS2309K',
        registrationTimeStamp: 'Dec 9, 2016 2:43 PM'
    },
    {
        id: '3',
        countryCode: 'US',
        dealId: 'TF9678S80',
        productCode: 'FNB',
        stepCode: 'NEW',
        systemCode: 'DTP',
        clientId: 'RXQSQJ9P4C',
        registrationTimeStamp: 'Jun 23, 2017 4:13 AM'
    }
];

@Component({
    selector: 'app-deal-select',
    templateUrl: './deal-select.component.html',
    styleUrls: ['./deal-select.component.scss']
})
export class DealSelectComponent implements OnInit {

    public userActive: Boolean = false;
    public planeActive: Boolean = false;
    public activeDealId;

    public items = mockSelectItems;

    private lastClicked;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.activeDealId = parseInt(this.route.snapshot.queryParams['selectedDeal'], 10);
        });
    }

    toggleDealFilter(type) {
        switch (type) {
            case 'user':
                this.userActive = !this.userActive;
                break;
            case 'plane':
                this.planeActive = !this.planeActive;
                break;
            case 'next':
                break;
            case 'prev':
                break;
            default:
                alert('Type must be defined!')
                break;
        }
    }

    doubleClick(value) {
        if (!this.lastClicked) {
            this.lastClicked = {
                id: parseInt(value, 10),
                time: +new Date()
            };

            return false;
        }

        if (this.lastClicked.id === parseInt(value, 10)
            && +new Date() - this.lastClicked.time < 300) {
            this.goToDeal(value);
        } else {
            this.lastClicked = null;
        }
    }

    goToDeal(id) {
        const dealId = id || this.route.snapshot.queryParams['selectedDeal'];
        this.router.navigate(['/deal', dealId]);
    }

    changeList() {
        alert('need server side!');
    }
}
