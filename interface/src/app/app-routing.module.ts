import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router'
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuardService]},
    { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService]},
    { path: 'login', pathMatch: 'full', component: LoginComponent},
    { path: '**', redirectTo: 'error' },
    { path: 'error', pathMatch: 'full', component: ErrorComponent}
];

@NgModule({
    declarations:[
        ErrorComponent
    ],
    imports: [
        RouterModule.forRoot(
        appRoutes
        )
    ],
    exports: [
        RouterModule,
        ErrorComponent
    ]
})
export class AppRoutingModule {}