import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Importaciones
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatSelectModule } from '@angular/material/select';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard/user-dashboard.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewMoviesComponent } from './pages/admin/view-movies/view-movies.component';
import { AddMovieComponent } from './pages/admin/add-movie/add-movie.component';
import { AddUserComponent } from './pages/admin/add-user/add-user.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { ViewAlquileresComponent } from './pages/admin/view-alquileres/view-alquileres.component';
import { ViewComprasComponent } from './pages/admin/view-compras/view-compras.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { UserViewMoviesComponent } from './pages/user/user-view-movies/user-view-movies.component';
import { UserMoviesComponent } from './pages/user/user-movies/user-movies.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { AddAlquilerComponent } from './pages/user/add-alquiler/add-alquiler.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewMoviesComponent,
    AddMovieComponent,
    AddUserComponent,
    ViewUsersComponent,
    ViewAlquileresComponent,
    ViewComprasComponent,
    UserSidebarComponent,
    UserViewMoviesComponent,
    UserMoviesComponent,
    UserWelcomeComponent,
    AddAlquilerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Importaciones
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
