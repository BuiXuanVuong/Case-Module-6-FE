import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AboutComponent } from './about/about.component';
import { FriendComponent } from './friend/friend.component';
import { GroupComponent } from './group/group.component';
import { PhotoComponent } from './photo/photo.component';
import { VideoComponent } from './video/video.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CreatePostComponent } from './create-post/create-post.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PostListComponent } from './post-list/post-list.component';
// @ts-ignore
import { HeaderComponent } from './header/header.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import { StatusComponent } from './status/status.component';
import { StatusFormComponent } from './status-form/status-form.component';
// @ts-ignore
import { StatusEditComponent } from './status-edit/status-edit.component';

import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

import { FriendListSuggestComponent } from './friend-list-suggest/friend-list-suggest.component';
import { InviteFriendComponent } from './invite-friend/invite-friend.component';
import { ListFriendComponent } from './list-friend/list-friend.component';
import { HelloComponent } from './hello/hello.component';
import {JwtInterceptor} from './jwt-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import { NewPostComponent } from './new-post/new-post.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';


import { UserManagerComponent } from './user-manager/user-manager.component';
import {PipesModule} from 'w-ng5';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreateMessageComponent } from './create-message/create-message.component';
import { ListMessageComponent } from './list-message/list-message.component';
import { HeaderBackgroundComponent } from './header-background/header-background.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    AboutComponent,
    FriendComponent,
    GroupComponent,
    PhotoComponent,
    VideoComponent,
    LoginComponent,
    RegisterComponent,
    SettingComponent,
    PageNotFoundComponent,
    CreatePostComponent,
    EmployeeListComponent,
    PostListComponent,

    HeaderComponent,
    StatusComponent,
    StatusFormComponent,
    StatusEditComponent,


    ProfileComponent,
    UpdateProfileComponent,

    FriendListSuggestComponent,
    InviteFriendComponent,


    ListFriendComponent,


    HelloComponent,




    NewPostComponent,




    UserManagerComponent,


    CreateMessageComponent,


    ListMessageComponent,


    HeaderBackgroundComponent,


    EditCommentComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,

    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,

    MatButtonModule,
    PipesModule,
    NgxPaginationModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,







  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AngularFirestoreModule,
    AngularFireStorage],
  bootstrap: [AppComponent],

})
export class AppModule { }
