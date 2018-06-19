import { RouterModule, Routes, CanActivate, RouterLinkActive} from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfersComponent } from './ofers/ofers.component';

// ROUTING
const routesConfig: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'oferta/:id', component: OfersComponent}
    
  ]

export const routerModule = RouterModule.forRoot(routesConfig, {
    enableTracing: false,
    useHash: true,
})