import { Routes } from '@angular/router'
import { DrawCanvasComponent } from './draw-canvas/draw-canvas.component'
import { DrawWithoutCanvasComponent } from './draw-without-canvas/draw-without-canvas.component'

export const AppRoutes: Routes = [
    { path: 'draw-canvas', component: DrawCanvasComponent },
    { path: 'draw-without-canvas', component: DrawWithoutCanvasComponent },
    { path: '**', redirectTo: '/draw-canvas', pathMatch: 'full' }
]
