import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, ResponseContentType} from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class DealPageService {
    dealObject = null;
    activePage = null;
    activePageNumber = 1;

    pagesImages: Object = {};
    documentFilters = {
        screenable: true,
        nonscreenable: false,
        duplicates: false,
        sort: 'asc'
    };

    nameCaptureStructure: Array<Object> = [];
    nameCaptureValidation: Array<Object> = [];

    dealPageUpdate: Observable<any>;
    dealPageObserver: any;
    dealObjectUpdate: Observable<any>;
    dealObjectObserver: any;
    nameCaptureUpdate: Observable<any>;
    nameCaptureObserver: any;
    activePageNumberUpdate: Observable<any>;
    activePageNumberObserver: any;
    documentFiltersUpdate: Observable<any>;
    documentFiltersObserver: any;

    // need to update all the captures
    updateNameCaptureEvent: Observable<any>;
    updateNameCaptureEventObserver: any;

    constructor(private http: Http) {
        this.dealObjectUpdate = (new Observable(observer => this.dealObjectObserver = observer)).share();
        this.dealPageUpdate = (new Observable(observer => this.dealPageObserver = observer)).share();
        this.nameCaptureUpdate = (new Observable(observer => this.nameCaptureObserver = observer)).share();
        this.activePageNumberUpdate = (new Observable(observer => this.activePageNumberObserver = observer)).share();
        this.updateNameCaptureEvent = (new Observable(observer => this.updateNameCaptureEventObserver = observer)).share();
        this.documentFiltersUpdate = (new Observable(observer => this.documentFiltersObserver = observer)).share();
    }

    getDealObject(id) {
        return this.http.get('/assets/deal-object.json') // ipanfilov: add url to get deal object data
            .map(response => {
                const answer = response.json();
                this.nameCaptureStructure = answer.mandatory;
                this.nameCaptureValidation  = answer.fieldSize;
                this.dealObject = answer;
                return answer;
            });
    }

    updateDealPage(value: Object) {
        this.updatePageNumber(value['pageNumber']);
        if (value['nameCaptureList'] && value['nameCaptureList'].length) {
            value['nameCaptureList'].forEach(elem => {
                this.updateNameCaptureBlock({ item: elem, type: 'add' });
            });
        }
        if (this.dealPageObserver) {
            this.dealPageObserver.next(value);
        }
    }

    updatePageNumber(id) {
        if (!this.dealObject) {
            return;
        }

        this.activePageNumber = id;
        const document = this.dealObject.documentsList;
        this.activePage = document.filter(elem => elem.pageNumber === this.activePageNumber)[0];
        let nameCapture = this.activePage.nameCaptureList;

        if (!nameCapture) {
            this.activePage.nameCaptureList = [];
            nameCapture = this.activePage.nameCaptureList;
        }

        if (this.activePageNumberObserver) {
            this.activePageNumberObserver.next({ activePageNumber: this.activePageNumber, activePage: this.activePage });
        }
    }

    handleUpdateNameCaptureItemsEvent() {
        if (this.updateNameCaptureEventObserver) {
            this.updateNameCaptureEventObserver.next();
        }
    }

    getDocFile(url) {
        if (this.pagesImages[url]) {
            return Observable.of(this.pagesImages[url]).map(o => o);
        }

        return this.http.get(url, {
            responseType: ResponseContentType.ArrayBuffer,
        }).map(res => {

            this.pagesImages[url] = res['_body'];

            return res['_body'];
        });
    }

    updateDocumentFilters(filters) {
        Object.assign(this.documentFilters, filters);
        if (this.documentFiltersObserver) {
            this.documentFiltersObserver.next(this.documentFilters);
        }
    }

    updateNameCaptureBlock({ item, type = '', newItemData = {} }) {
        if (!this.dealObject) {
            return;
        }

        const document = this.dealObject.documentsList;
        const activePage = document.filter(elem => elem.pageNumber === this.activePageNumber)[0];
        let nameCapture = activePage.nameCaptureList;

        switch (type) {
            case 'add':
                if (!nameCapture) {
                    activePage.nameCaptureList = [];
                    nameCapture = activePage.nameCaptureList;
                }
                const itemIndex = nameCapture.findIndex(elem => {
                    return item._id === elem['_id'];
                });
                if (itemIndex === -1) {
                    nameCapture.push(item);
                }
                if (this.nameCaptureObserver) {
                    this.nameCaptureObserver.next(nameCapture);
                }
                break;

            case 'remove':
                nameCapture.splice(nameCapture.findIndex(elem => item._id === elem['_id']), 1);
                if (this.nameCaptureObserver) {
                    this.nameCaptureObserver.next(nameCapture);
                }
                break;

            case 'update':
                const elemIndex = nameCapture.findIndex(elem => item._id === elem['_id']);
                nameCapture[elemIndex] = newItemData;

                if (this.nameCaptureObserver) {
                    this.nameCaptureObserver.next(nameCapture);
                }
                break;

            case 'updateCheck':
                if (!item['approved']) {
                    const items = nameCapture.map(elem => {
                        const arrItem: any = elem;
                        if (arrItem.role === item['role']
                            && arrItem.address1 === item['address1']
                            && arrItem.address2 === item['address2']
                            && arrItem.address3 === item['address3']
                            && arrItem.name === item['name']
                            && arrItem.country === item['country']
                            && arrItem.partyId === item['partyId']
                            && arrItem.extensionId === item['extensionId']
                            || arrItem._id === item['_id']
                        ) {
                            arrItem.approved = !item['approved'];
                            if (arrItem._id === item['_id']) {
                                arrItem.main = true;
                            }
                        }
                        return arrItem;
                    });
                    nameCapture = items;
                } else {
                    const items = nameCapture.map(elem => {
                        const arrItem: any = elem;
                        if (arrItem.role === item['role']
                            && arrItem.address1 === item['address1']
                            && arrItem.address2 === item['address2']
                            && arrItem.address3 === item['address3']
                            && arrItem.name === item['name']
                            && arrItem.country === item['country']
                            && arrItem.partyId === item['partyId']
                            && arrItem.extensionId === item['extensionId']
                        ) {
                            arrItem.approved = !item['approved'];
                            arrItem.main = false;
                        }
                        return arrItem;
                    });
                    nameCapture = items;
                }
                if (this.nameCaptureObserver) {
                    this.nameCaptureObserver.next(nameCapture);
                }
                break;

            default:
                console.log('type is required');
        }
    }
}
