import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DealPageService} from '../deal-page.service';

@Component({
    selector: 'app-name-capture-add',
    templateUrl: './name-capture-add.component.html',
    styleUrls: ['./name-capture-add.component.scss']
})
export class NameCaptureAddComponent implements OnInit {
    @Output() updateElems: EventEmitter<any> = new EventEmitter();

    constructor(private dealPageSrv: DealPageService) {
    }

    ngOnInit() {
    }

    addNameCapture() {
        this.dealPageSrv.updateNameCaptureBlock({ item: {
            _id: `_${  Math.random().toString(36).substr(3, 10)}`,
            approved: false,
            role: 'Importer',
            name: '',
            address1: '',
            address2: '',
            address3: '',
            country: '',
            partyId: '',
            extensionId: '',
        }, type: 'add' });
        this.updateElems.emit(null);
    }
}
