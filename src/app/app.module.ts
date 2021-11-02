import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrawCanvasComponent } from './draw-canvas/draw-canvas.component';
import { DrawWithoutCanvasComponent } from './draw-without-canvas/draw-without-canvas.component';
import { RouterModule } from '@angular/router'
import { AppRoutes } from './app.routes'

@NgModule({
    declarations: [
        AppComponent,
        DrawCanvasComponent,
        DrawWithoutCanvasComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
