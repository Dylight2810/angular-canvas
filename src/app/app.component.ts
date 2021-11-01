import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core'
import { DOCUMENT } from '@angular/common'

interface OmiDOMRect {
    x: number
    y: number
    width: number
    height: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    canvas: HTMLCanvasElement
    canvasImage: HTMLImageElement
    context: CanvasRenderingContext2D
    rect: OmiDOMRect = { x: 0, y: 0, height: 0, width: 0 }
    drag: boolean
    mouse: MouseEvent = new MouseEvent('move')
    mouseDown: MouseEvent = new MouseEvent('down')

    @ViewChild('omiCanvas', { static: true }) omiCanvas: ElementRef<HTMLCanvasElement>

    @HostListener('mousemove', ['$event'])
    onMousemove(event): void {
        this.drawRectWithMouseMoveEvent(event)
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
            this.context.drawImage(this.canvasImage, 0, 0)
        }

        this.context.strokeStyle = '#0081ff'
        this.context.lineWidth = 2
        this.context.strokeRect(50, 50, 100, 50)
    }

    onCanvasMouseUp(event): void {
        this.drag = false
    }

    onCanvasMouseDown(event): void {
        this.mouseDown = event
        const { pageX, offsetX, clientX, screenX, movementX } = event
        this.rect.x = Math.round(event.pageX - this.canvas.getBoundingClientRect().x) + 0.5
        this.rect.y = Math.round(event.pageY - this.canvas.getBoundingClientRect().y) + 0.5
        console.log('<< MOUSE DOWN >> ', { pageX, offsetX, clientX, screenX, movementX })
        console.log(this.canvas, this.canvas.offsetLeft, this.canvas.offsetTop)
        this.drag = true
    }

    onCanvasMouseMove(event): void {
        this.mouse = event
        // this.drawRectWithMouseMoveEvent(event)
    }

    drawRectWithMouseMoveEvent(event: MouseEvent): void {
        if (this.drag) {
            // this.context.clearRect(0, 0, 600, 300)
            this.context.restore();
            this.context.drawImage(this.canvasImage, 0, 0)
            this.rect.width = Math.round((event.pageX - this.canvas.getBoundingClientRect().x) - this.rect.x)
            this.rect.height = Math.round((event.pageY - this.canvas.getBoundingClientRect().y) - this.rect.y)
            console.log(this.rect)
            this.context.strokeStyle = '#0081ff'
            this.context.lineWidth = 1
            this.context.fillStyle = 'rgba(0, 129, 255, 0.1)'
            this.context.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
            this.context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
            this.context.save();
        }
    }
}
