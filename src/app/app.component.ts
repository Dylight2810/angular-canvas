import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core'
import { DOCUMENT } from '@angular/common'

export interface OmiDOMRect {
    id: number
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
    selectedMode = 1

    constructor() {
    }

    ngOnInit(): void {
    }
}
