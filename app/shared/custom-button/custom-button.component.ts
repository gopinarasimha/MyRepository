import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-custom-button',
    templateUrl: './custom-button.component.html',
    styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {

    @Input() icon = '';
    @Input() text = '';
    @Input() empty: Boolean = false;
    @Input() theme = 'default';
    @Input() disabled = false;
    @Output() onClick: EventEmitter<any> = new EventEmitter();

    public active: Boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    toggleActive() {
        this.active = !this.active;
    }

    onClickEvent() {
        this.toggleActive();
        this.onClick.emit();
    }

}
