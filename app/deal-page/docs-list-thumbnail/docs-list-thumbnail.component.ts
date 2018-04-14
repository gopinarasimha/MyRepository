import {Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {DealPageService} from '../deal-page.service';

//const Tiff = require('tiff.js');
import * as Tiff from 'tiff.js';

@Component({
    selector: 'app-docs-list-thumbnail',
    templateUrl: './docs-list-thumbnail.component.html',
    styleUrls: ['./docs-list-thumbnail.component.scss']
})
export class DocsListThumbnailComponent implements OnInit {
    @ViewChild('el') canvas: ElementRef;
    @Input() item: Object = {};
    @Input() isActive: Boolean = false;

    constructor(private dealPageSrv: DealPageService) {
        Tiff.initialize({TOTAL_MEMORY: 16777216 * 10});
    }

    @HostListener('click') onClick() {
        this.dealPageSrv.handleUpdateNameCaptureItemsEvent();
        this.dealPageSrv.updatePageNumber(this.item['pageNumber']);
    }

    ngOnInit() {
        this.dealPageSrv.getDocFile(this.item['image']).subscribe(data => {
            const tiff = new Tiff({buffer: data});
            tiff.setDirectory(this.item['pageNumber'] - 1);
            this.canvas.nativeElement.appendChild(tiff.toCanvas());
        });
    }

}
