import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionComponent } from './attraction/attraction.component';
import { AuthGuard } from './auth/auth.guard';
import { BackgroundSystemComponent } from './background-system/background-system.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ShowComponent } from './show/show.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AttractionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'attraction', component: ShowComponent },
  { path: 'admin', component: BackgroundSystemComponent },
  { path: 'preview', component: PreviewComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
