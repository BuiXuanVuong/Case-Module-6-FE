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
import {HttpClientModule} from '@angular/common/http';
import { CreatePostComponent } from './create-post/create-post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import { StatusComponent } from './status/status.component';
import { StatusFormComponent } from './status-form/status-form.component';
import { StatusEditComponent } from './status-edit/status-edit.component';
import { FriendListSuggestComponent } from './friend-list-suggest/friend-list-suggest.component';
import { InviteFriendComponent } from './invite-friend/invite-friend.component';
import { ListFriendComponent } from './list-friend/list-friend.component';

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
    FriendListSuggestComponent,
    InviteFriendComponent,
    ListFriendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AngularFirestoreModule,
    AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
