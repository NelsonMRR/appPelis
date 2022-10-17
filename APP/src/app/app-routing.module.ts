import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './pages/admin/add-movie/add-movie.component';
import { AddUserComponent } from './pages/admin/add-user/add-user.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard/dashboard.component';
import { ViewAlquileresComponent } from './pages/admin/view-alquileres/view-alquileres.component';
import { ViewComprasComponent } from './pages/admin/view-compras/view-compras.component';
import { ViewHistorialMoviesComponent } from './pages/admin/view-historial-movies/view-historial-movies.component';
import { ViewMoviesComponent } from './pages/admin/view-movies/view-movies.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AddAlquilerComponent } from './pages/user/add-alquiler/add-alquiler.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard/user-dashboard.component';
import { UserMoviesComponent } from './pages/user/user-movies/user-movies.component';
import { UserViewMoviesComponent } from './pages/user/user-view-movies/user-view-movies.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[ AdminGuard ],
    children:[
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'users',
        component:ViewUsersComponent
      },
      {
        path:'add-users',
        component:AddUserComponent
      },
      {
        path:'add-users/:id',
        component:AddUserComponent
      },
      {
        path:'movies',
        component:ViewMoviesComponent
      },
      {
        path:'add-movies',
        component:AddMovieComponent
      },
      {
        path:'add-movies/:id',
        component:AddMovieComponent
      },
      {
        path:'alquileres',
        component:ViewAlquileresComponent
      },
      {
        path:'compras',
        component:ViewComprasComponent
      },
      {
        path:'historial-peliculas/:id',
        component:ViewHistorialMoviesComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[ NormalGuard ],
    children:[
      {
        path:'',
        component:UserWelcomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'mymovies',
        component:UserViewMoviesComponent
      },
      {
        path:'movies',
        component:UserMoviesComponent
      },
      {
        path:'add-alquiler/:id',
        component:AddAlquilerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
