import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TimelineComponent} from './timeline/timeline.component';
import {AboutComponent} from './about/about.component';
import {FriendComponent} from './friend/friend.component';
import {GroupComponent} from './group/group.component';
import {PhotoComponent} from './photo/photo.component';
import {VideoComponent} from './video/video.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {SettingComponent} from './setting/setting.component';

import {CreatePostComponent} from './create-post/create-post.component';
import {PostListComponent} from './post-list/post-list.component';
// @ts-ignore
import {StatusEditComponent} from './status-edit/status-edit.component';
import {StatusFormComponent} from './status-form/status-form.component';
import {ProfileComponent} from './profile/profile.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';

// @ts-ignore
import {FriendListSuggestComponent} from './friend-list-suggest/friend-list-suggest.component';
import {InviteFriendComponent} from './invite-friend/invite-friend.component';
import {HeaderComponent} from './header/header.component';

import {ListFriendComponent} from './list-friend/list-friend.component';
import {HelloComponent} from './hello/hello.component';
import {AuthGuard} from './auth-guard';

import {NewPostComponent} from './new-post/new-post.component';

import {UserManagerComponent} from './user-manager/user-manager.component';

import {CreateMessageComponent} from './create-message/create-message.component';
import {ListMessageComponent} from './list-message/list-message.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'about/:userNamePath', component: AboutComponent},
  {path: 'friend', component: FriendComponent},
  {path: 'group', component: GroupComponent},
  {path: 'photo', component: PhotoComponent},
  {path: 'video', component: VideoComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'timeline/:userNamePath', component: TimelineComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'update-profile/:id', component: UpdateProfileComponent},


  {path: 'status-form/:id', component: StatusFormComponent},

  {path: 'status-form/:userName', component: StatusFormComponent},
  {path: 'status-edit/:id', component: StatusEditComponent},


  {path: 'friend-list-suggest/:id', component: FriendListSuggestComponent},
  {path: 'invite-friend/:id', component: InviteFriendComponent},

  {path: 'list-friend/:userNamePath', component: ListFriendComponent},

  // {path: 'hello', component: HelloComponent, canActivate: [AuthGuard]},
  {path: 'create-message/:userPath', component: CreateMessageComponent},
  {path: 'list-message', component: ListMessageComponent},
  {path: 'admin', component: UserManagerComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
