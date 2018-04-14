import {
    Component, ElementRef, Host, HostListener, Inject, Input, OnChanges, OnInit, Renderer,
    ViewChild
} from '@angular/core';
import {DealPageService} from '../deal-page.service';
import {DealPageComponent} from '../deal-page/deal-page.component';

import * as Tiff from 'tiff.js';

@Component({
    selector: 'app-docs-viewer',
    templateUrl: './docs-viewer.component.html',
    styleUrls: ['./docs-viewer.component.scss']
})
export class DocsViewerComponent implements OnChanges {
    @ViewChild('el') canvas: ElementRef;
    @Input() item: Object = {};

    private canDraw: Boolean = false;
    private drawElems: Object = {};

    private lastCreatedId;
    private tiffFile;
    private canvasFirstState;

    public zoom = 1;

    constructor(
        private dealPageSrv: DealPageService,
        private renderer: Renderer,
        @Inject(DealPageComponent) private parent: DealPageComponent
    ) {
        Tiff.initialize({TOTAL_MEMORY: 16777216 * 10});
    }

    ngOnChanges() {
        if (this.item['pageNumber']) {
            this.zoom = 1;
            this.dealPageSrv.getDocFile(this.item['image']).subscribe(data => {
                if (!this.drawElems[this.item['pageNumber']]) {
                    this.drawElems[this.item['pageNumber']] = [];
                }
                this.tiffFile = new Tiff({buffer: data});
                this.drawPageImage(this.item['pageNumber'] - 1);
                this.canvasFirstState = this.tiffFile.toCanvas();

                this.drawRectangles();

                this.renderer.listen(this.canvas.nativeElement.querySelector('canvas'), 'mousedown', (e) => {
                    this.canDraw = true;
                    this.lastCreatedId = this.createRectangle(e);
                });

                this.renderer.listen(this.canvas.nativeElement.querySelector('canvas'), 'mousewheel', (e) => {
                    if (e.wheelDelta > 0) {
                        this.zoomIn();
                    } else if (e.wheelDelta < 0) {
                        this.zoomOut();
                    }
                });

                this.renderer.listen(this.canvas.nativeElement.querySelector('canvas'), 'mousemove', (e) => {
                    if (!this.canDraw) {
                        return false;
                    }

                    this.updateRectangle(e, this.lastCreatedId);
                    this.drawRectangles();
                });

                this.renderer.listen(this.canvas.nativeElement.querySelector('canvas'), 'mouseup', (e) => {
                    this.drawRectangles();

                    // here we still have

                    this.canDraw = false;
                    this.lastCreatedId = null;
                });
            });
        }
    }

    drawPageImage(id) {
        this.tiffFile.setDirectory(id);
        this.canvas.nativeElement.innerHTML = '';
        this.canvas.nativeElement.appendChild(this.tiffFile.toCanvas());
    }

    getCoords(e) {
        const scale = this.getScale();

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) * scale.widthScale;
        const y = (e.clientY - rect.top) * scale.heightScale;

        return { x, y };
    }

    getScale() {
        const canvas = this.canvas.nativeElement.querySelector('canvas');
        const canvasWidth = parseInt(canvas.clientWidth, 10);
        const canvasHeight = parseInt(canvas.clientHeight, 10);
        const canvasRealWidth = parseInt(canvas.getAttribute('width'), 10);
        const canvasRealHeight = parseInt(canvas.getAttribute('height'), 10);

        return {
            widthScale: parseFloat((canvasRealWidth / canvasWidth).toFixed(2)) / this.zoom,
            heightScale: parseFloat((canvasRealHeight / canvasHeight).toFixed(2)) / this.zoom
        };
    }

    createRectangle(e) {
        const { x, y } = this.getCoords(e);
        const id = `_${  Math.random().toString(36).substr(3, 10)}`;
        this.drawElems[this.item['pageNumber']].push({
            id, x1: x, y1: y, w: 0, h: 0
        });

        return id;
    }

    updateRectangle(e, id) {
        const { x, y } = this.getCoords(e);
        const elemIndex = this.drawElems[this.item['pageNumber']].findIndex(item => item.id === id);

        this.drawElems[this.item['pageNumber']][elemIndex].w = x - this.drawElems[this.item['pageNumber']][elemIndex].x1;
        this.drawElems[this.item['pageNumber']][elemIndex].h = y - this.drawElems[this.item['pageNumber']][elemIndex].y1;
    }

    drawRectangles() {
        this.clearCanvas();
        this.drawElems[this.item['pageNumber']].forEach(item => {
            const ctx = this.canvas.nativeElement.querySelector('canvas').getContext('2d');
            ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
            ctx.fillRect(item.x1, item.y1, item.w, item.h);
        });
    }

    clearCanvas() {
        const canvas = this.canvas.nativeElement.querySelector('canvas');
        canvas.getContext('2d').drawImage(this.canvasFirstState, 0, 0);
    }

    zoomIn() {
        if (this.zoom >= 2) {
            this.zoom = 2;
            return;
        }
        this.zoom = this.zoom + 0.1;
        this.canvas.nativeElement.querySelector('canvas').style.transform = `scale(${this.zoom})`;
        this.canvas.nativeElement.style.overflow = 'hidden';
        setTimeout(() => {
            this.canvas.nativeElement.style.overflow = 'auto';
        }, 0);
    }

    zoomOut() {
        if (this.zoom <= 1) {
            this.zoom = 1;
            return;
        }
        this.zoom = this.zoom - 0.1;
        this.canvas.nativeElement.querySelector('canvas').style.transform = `scale(${this.zoom})`;
        this.canvas.nativeElement.style.overflow = 'hidden';
        setTimeout(() => {
            this.canvas.nativeElement.style.overflow = 'auto';
        }, 0);
    }

    goFirst() {
        const pages = this.parent.docList['filteredPages'];
        const firstPageNumber = pages[0]['pageNumber'];
        this.dealPageSrv.updatePageNumber(firstPageNumber);
    }

    goPrevious() {
        const pages = this.parent.docList['filteredPages'];
        const activePageId = this.item['_id'];
        let activePageIndex = 0;
        pages.forEach((page, index) => {
            if (activePageId === page._id) {
                activePageIndex = --index;
            }
        });
        if (activePageIndex < 0) {
            activePageIndex = pages.length - 1;
        }
        this.dealPageSrv.updatePageNumber(pages[activePageIndex]['pageNumber']);
    }

    goNext() {
        const pages = this.parent.docList['filteredPages'];
        const activePageId = this.item['_id'];
        let activePageIndex = 0;
        pages.forEach((page, index) => {
            if (activePageId === page._id) {
                activePageIndex = ++index;
            }
        });
        if (activePageIndex >= pages.length) {
            activePageIndex = 0;
        }
        this.dealPageSrv.updatePageNumber(pages[activePageIndex]['pageNumber']);
    }

    goLast() {
        const pages = this.parent.docList['filteredPages'];
        const lastPageNumber = pages[pages.length - 1]['pageNumber'];
        this.dealPageSrv.updatePageNumber(lastPageNumber);
    }

    goToPage(id) {
        const pages = this.parent.docList['filteredPages'];
        let index = id - 1;
        if (index >= pages.length) {
            index = pages.length - 1;
        }
        if (index < 0) {
            index = 0;
        }
        this.dealPageSrv.updatePageNumber(pages[index]['pageNumber']);
    }
}
