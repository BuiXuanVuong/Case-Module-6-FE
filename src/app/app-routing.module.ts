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
import {StatusComponent} from './status/status.component';
import {StatusEditComponent} from './status-edit/status-edit.component';
import {StatusFormComponent} from './status-form/status-form.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'friend', component: FriendComponent},
  {path: 'group', component: GroupComponent},
  {path: 'photo', component: PhotoComponent},
  {path: 'video', component: VideoComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'status-form', component: StatusFormComponent},
  {path: 'status-edit', component: StatusEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
