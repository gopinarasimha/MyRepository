import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DealPageService} from '../deal-page.service';

interface NameCaptureType {
    label: string;
    value: string;
}

@Component({
    selector: 'app-name-capture-item',
    templateUrl: './name-capture-item.component.html',
    styleUrls: ['./name-capture-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NameCaptureItemComponent implements OnInit {

    @Input() item;
    @Input() isCopy: Boolean = false;

    @Output() updateElems: EventEmitter<any> = new EventEmitter();

    public nameCaptureTypes: NameCaptureType[] = [
        {label: 'Importer', value: 'Importer'},
        {label: 'Exporter', value: 'Exporter'},
        {label: 'Ship To', value: 'Ship To'},
        {label: 'COO', value: 'COO'}
    ];

    // ngModel for role card
    public role: any;
    public address1: any;
    public address2: any;
    public address3: any;
    public name: any;
    public country: any;
    public partyId: any;
    public extensionId: any;

    // required fields
    public nameRequired: Boolean = false;
    public partyIdRequired: Boolean = false;
    public extensionIdRequired: Boolean = false;
    public countryRequired: Boolean = false;
    public addressRequired: Boolean = false;

    // fieldsValidation
    public nameMaxLength = 20;
    public address1MaxLength = 20;
    public address2MaxLength = 20;
    public address3MaxLength = 20;

    // error
    public errorTitle;
    public errorMessage;
    public display: Boolean = false;

    constructor(private dealPageSrv: DealPageService) {
    }

    ngOnInit() {
        this.role = this.item.role;
        this.address1 = this.item.address1 || this.item.highlightsList &&
            this.item.highlightsList.filter(item => item.type === 'Address1')[0].value;
        this.address2 = this.item.address2 || this.item.highlightsList &&
            this.item.highlightsList.filter(item => item.type === 'Address2')[0].value;
        this.address3 = this.item.address3 || this.item.highlightsList &&
            this.item.highlightsList.filter(item => item.type === 'Address3')[0].value;
        this.name = this.item.name || this.item.highlightsList &&
            this.item.highlightsList.filter(item => item.type === 'Name')[0].value;
        this.country = this.item.country;
        this.partyId = this.item.partyId;
        this.extensionId = this.item.extensionId;
        this.dealPageSrv.nameCaptureStructure.filter(item => item['key'] === this.role).forEach(item => {
            const elem =  item['value'];
            switch (elem['key']) {
                case 'Party_Id':
                    this.partyIdRequired = elem['value'] === 'Y';
                    break;
                case 'Extn_Id':
                    this.extensionIdRequired = elem['value'] === 'Y';
                    break;
                case 'Name':
                    this.nameRequired = elem['value'] === 'Y';
                    break;
                case 'Country':
                    this.countryRequired = elem['value'] === 'Y';
                    break;
                case 'Address_Line_1':
                    this.addressRequired = this.addressRequired || elem['value'] === 'Y';
                    break;
                case 'Address_Line_2':
                    this.addressRequired = this.addressRequired || elem['value'] === 'Y';
                    break;
                case 'Address_Line_3':
                    this.addressRequired = this.addressRequired || elem['value'] === 'Y';
                    break;
            }
        });

        this.dealPageSrv.nameCaptureValidation.forEach(elem => {
            switch (elem['key']) {
                case 'Name':
                    this.nameMaxLength = elem['Value'];
                    break;
                case 'Address_Line_1':
                    this.address1MaxLength = elem['Value'];
                    break;
                case 'Address_Line_2':
                    this.address2MaxLength = elem['Value'];
                    break;
                case 'Address_Line_3':
                    this.address3MaxLength = elem['Value'];
                    break;
            }
        });

        this.dealPageSrv.updateNameCaptureEvent.subscribe(() => {
            this.updateData();
        });
    }

    itemTypeChanged($event) {
        const item = Object.assign({}, this.item, {
            role: $event
        });
        this.updateData();
        this.dealPageSrv.updateNameCaptureBlock({ item: this.item, type: 'update', newItemData: item });
    }

    updateData() {
        const item = Object.assign({}, this.item, {
            role: this.role,
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            name: this.name,
            country: this.country,
            partyId: this.partyId,
            extensionId: this.extensionId,
        });

        this.dealPageSrv.updateNameCaptureBlock({ item: this.item, type: 'update', newItemData: item });

        return;
    }

    roleIsValid(): Boolean {
        const {
            partyId,
            extensionId,
            name,
            country,
            address1,
            address2,
            address3,
            nameMaxLength,
            address1MaxLength,
            address2MaxLength,
            address3MaxLength
        } = this;
        let partyIdIsValid = true;
        let extensionIdIsValid = true;
        let nameIsValid = true;
        let countryIsValid = true;
        let addressIsValid = true;

        if (this.partyIdRequired) {
            if (typeof partyId === 'undefined' || !partyId.length) {
                partyIdIsValid = false;
            }
        }

        if (this.extensionIdRequired) {
            if (typeof extensionId === 'undefined' || !extensionId.length) {
                extensionIdIsValid = false;
            }
        }

        if (this.nameRequired) {
            if (typeof name === 'undefined' || !name.length) {
                nameIsValid = false;
            }
        }

        if (this.countryRequired) {
            if (typeof country === 'undefined' || !country.length) {
                countryIsValid = false;
            }
        }

        if (this.addressRequired) {
            if (typeof address1 === 'undefined' || !address1.length ||
                typeof address2 === 'undefined' || !address2.length ||
                typeof address3 === 'undefined' || !address3.length
            ) {
                addressIsValid = false;
            }
        } else {
            addressIsValid = true;
        }

        if (!partyIdIsValid || !extensionIdIsValid || !nameIsValid || !countryIsValid || !addressIsValid) {
            this.errorTitle = 'Missing information';
            this.errorMessage = 'Please fill in all required fields for this role';
            this.display = true;
            return false;
        }

        if (typeof name !== 'undefined' && name.length > nameMaxLength) {
            this.errorTitle = 'Validation failed';
            this.errorMessage = `Please use a maximum of ${nameMaxLength} characters for this product - 
                the name field currently has ${name.length} characters`;
            this.display = true;
            return false;
        }

        if (typeof address1 !== 'undefined' && address1.length > address1MaxLength) {
            this.errorTitle = 'Validation failed';
            this.errorMessage = `Please use a maximum of ${address1MaxLength} characters for this product - 
                the address 1 field currently has ${address1.length} characters`;
            this.display = true;
            return false;
        }

        if (typeof address2 !== 'undefined' && address2.length > address2MaxLength) {
            this.errorTitle = 'Validation failed';
            this.errorMessage = `Please use a maximum of ${address2MaxLength} characters for this product - 
                the address 2 field currently has ${address2.length} characters`;
            this.display = true;
            return false;
        }

        if (typeof address3 !== 'undefined' && address3.length > address3MaxLength) {
            this.errorTitle = 'Validation failed';
            this.errorMessage = `Please use a maximum of ${address3MaxLength} characters for this product - 
                the address 3 field currently has ${address3.length} characters`;
            this.display = true;
            return false;
        }

        this.errorTitle = '';
        this.errorMessage = '';
        this.display = false;
        return true;
    }

    handleCheckedChanged() {
        if (!this.roleIsValid()) {
            return false;
        }
        this.updateElems.emit(null);

        const item = Object.assign({}, this.item, {
            role: this.role,
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            name: this.name,
            country: this.country,
            partyId: this.partyId,
            extensionId: this.extensionId,
        });

        this.dealPageSrv.updateNameCaptureBlock({ item: item, type: 'updateCheck' });
    }

    removeItem() {
        this.dealPageSrv.updateNameCaptureBlock({ item: this.item, type: 'remove' });
    }

}
