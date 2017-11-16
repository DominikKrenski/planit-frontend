import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { InlineEditorModule } from 'ng2-inline-editor';
import * as moment from 'moment';
import { A2Edatetimepicker } from 'ng2-eonasdan-datetimepicker';
import { TagInputModule } from 'ngx-chips';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { FrontPageComponent } from './front-page/front-page.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { EventsListComponent } from './events-list/events-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RegisterPageComponent } from './register-page/register-page.component'
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

import { UsersService } from './users-list/users.service';
import { AccountService } from './my-account/account.service';
import { TagsService } from './tags-list/tags.service';
import { EventsService } from './events-list/events.service';
import { EventDetailService } from './event-details/event-detail.service';
import { CalendarListService } from './calendar-list/calendar-list.service';

const routesConfig:Routes = [
  {path:'', redirectTo: 'frontpage', pathMatch:'full'},
  {path:'login', component: LoginPageComponent},
  {path:'register', component: RegisterPageComponent},
  {path:'frontpage', component: FrontPageComponent},
  {path:'users', component: UsersListComponent},
  {path:'calendar', component: CalendarListComponent},
  {path:'events', component: EventsListComponent},
  {path:'tags', component: TagsListComponent},
  {path:'my-account', component: MyAccountComponent},
  {path:'change-password', component: ChangePasswordComponent},
  {path:'edit-account', component: EditAccountComponent},
  {path:'event-details/:eventid', component: EventDetailsComponent},
  {path:'restore-password', component: RestorePasswordComponent},
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
    UsersListComponent,
    RegisterPageComponent,
    MyAccountComponent,
    ChangePasswordComponent,
    EditAccountComponent,
    EventDetailsComponent,
    RestorePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    InlineEditorModule,
    A2Edatetimepicker,
    TagInputModule,
    routerModule
  ],
  providers: [
    UsersService,
    AccountService,
    TagsService,
    EventsService,
    EventDetailService,
    CalendarListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
