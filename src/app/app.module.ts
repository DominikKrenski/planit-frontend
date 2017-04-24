import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { FrontPageComponent } from './front-page/front-page.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { EventsListComponent } from './events-list/events-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersListComponent } from './users-list/users-list.component';

import { UsersService } from './users-list/users.service'

const routesConfig:Routes = [
  {path:'', redirectTo: 'frontpage', pathMatch:'full'},
  {path:'login', component: LoginPageComponent},
  {path:'frontpage', component: FrontPageComponent},
  {path:'users', component: UsersListComponent},
  {path:'calendar', component: CalendarListComponent},
  {path:'events', component: EventsListComponent},
  {path:'tags', component: TagsListComponent},
]

const routerModule = RouterModule.forRoot(routesConfig,{
})


@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    TagsListComponent,
    CalendarListComponent,
    EventsListComponent,
    LoginPageComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routerModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
