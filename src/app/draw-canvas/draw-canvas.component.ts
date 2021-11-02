import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { OmiDOMRect } from '../app.component'

@Component({
    selector: 'app-draw-canvas',
    templateUrl: './draw-canvas.component.html',
    styleUrls: ['./draw-canvas.component.scss']
})
export class DrawCanvasComponent implements OnInit {
    arrRects: OmiDOMRect[] = []
    canvas: HTMLCanvasElement
    canvasImage: HTMLImageElement
    context: CanvasRenderingContext2D
    rect: OmiDOMRect = { id: 0, x: 0, y: 0, height: 0, width: 0 }
    drag: boolean
    mouse: MouseEvent = new MouseEvent('move')
    mouseDown: MouseEvent = new MouseEvent('down')

    @ViewChild('omiCanvas', { static: true }) omiCanvas: ElementRef<HTMLCanvasElement>

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event): void {
        this.mouse = event
        this.drawRectWithMouseMoveEvent(event)
    }

    @HostListener('mouseup', ['$event'])
    onMouseup(event): void {
    }

    constructor(
        @Inject(DOCUMENT) private _doc: Document
    ) {
    }

    ngOnInit(): void {
        if (!this.context) {
            this.initCanvasImage()
        }
    }

    initCanvasImage(): void {
        this.canvas = this._doc.getElementById('OmiCanvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')
        this.canvasImage = new Image()
        this.canvasImage.src = 'https://storage.googleapis.com/boxme/omisocial/94/2021/09/HCUrbY_rbVBFE_202109.webp'
        this.canvasImage.width = 600
        this.canvasImage.height = 300
        this.canvasImage.onload = () => {
            this.context.drawImage(this.canvasImage, 0, 0, 600, 300)
        }
    }

    onCanvasMouseUp(event): void {
        this.drag = false
        if (this.rect && this.rect.width && this.rect.height) {
            const _rect = JSON.parse(JSON.stringify(this.rect))
            _rect.id = this.arrRects.length
            this.arrRects.push(_rect)
            this.rect = { id: 0, x: 0, y: 0, height: 0, width: 0 }
        }
    }

    onCanvasMouseDown(event): void {
        this.mouseDown = event
        this.rect.x = Math.round(event.pageX - this.canvas.getBoundingClientRect().x) + 0.5
        this.rect.y = Math.round(event.pageY - this.canvas.getBoundingClientRect().y) + 0.5
        this.drag = true
    }

    onCanvasMouseMove(event): void {
        this.mouse = event
        // this.drawRectWithMouseMoveEvent(event)
    }

    drawRectWithMouseMoveEvent(event: MouseEvent): void {
        if (this.drag) {
            this.context.drawImage(this.canvasImage, 0, 0, 600, 300)
            this.rect.width = Math.round((event.pageX - this.canvas.getBoundingClientRect().x) - this.rect.x)
            this.rect.height = Math.round((event.pageY - this.canvas.getBoundingClientRect().y) - this.rect.y)

            // Start draw
            this.context.strokeStyle = '#0081ff'
            this.context.lineWidth = 1
            this.context.fillStyle = 'rgba(0, 129, 255, 0.1)'
            this.context.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
            this.context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
            this.drawAllRectBefore()
        }
    }

    drawAllRectBefore(): void {
        this.arrRects.forEach(rect => {
            this.context.strokeStyle = '#0081ff'
            this.context.lineWidth = 1
            this.context.fillStyle = 'rgba(0, 129, 255, 0.1)'
            this.context.strokeRect(rect.x, rect.y, rect.width, rect.height)
            this.context.fillRect(rect.x, rect.y, rect.width, rect.height)
        })
    }

    onRemoveRect(rect: OmiDOMRect): void {
        this.arrRects = this.arrRects.filter(r => r.id !== rect.id)
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.drawImage(this.canvasImage, 0, 0, 600, 300)
        this.drawAllRectBefore()
    }
}
