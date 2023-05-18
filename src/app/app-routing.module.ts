import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionComponent } from './attraction/attraction.component';
import { AuthGuard } from './auth/auth.guard';
import { BackgroundSystemComponent } from './background-system/background-system.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: AttractionComponent },
  { path: 'admin', component: BackgroundSystemComponent },
  { path: 'attraction', component: ShowComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
