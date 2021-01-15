import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../service/account.service';
import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';
import {IAccount} from '../model/iaccount';
import {IStatus} from '../model/istatus';
import {INewfeedResponse} from '../model/inewfeed-response';
import {IComment} from '../model/icomment';
import {NofiticationService} from '../service/nofitication.service';
import {IImage} from '../model/iimage';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {$} from 'protractor';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  // @ts-ignore
  listPost: IStatus[];
  // @ts-ignore
  post: IStatus;
  // @ts-ignore
  user: IAccount;
  // @ts-ignore
  images: IImage;
  // @ts-ignore
  statusPost: number;
  // @ts-ignore
  contentPost: string;
  arrayPicture = '';

  constructor(private http: HttpClient,
              private db: AngularFireDatabase,
              private router: Router) {
  }

  ngOnInit() {
    this.statusPost = 1;
    this.getAllPost();
    this.getImgUserLogin();
  }

  // @ts-ignore
  setIdUserPost(id) {
    localStorage.setItem('idUserPost', id);
    this.router.navigate(['/friendswall']);
  }

  getAllPost() {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const url = 'http://localhost:8080/api/allPost';
    this.http.get<IStatus[]>(url).subscribe((resJson) => {
      this.listPost = resJson;
      console.log('this.listPost');
      console.log(this.listPost);
      this.listPost.reverse();
      this.getPostShare();
    });
  }

  getImgUserLogin() {
    const url = 'http://localhost:8080/users/' + this.user.id;
    this.http.get<IAccount>(url).subscribe((resJson) => {
      this.user = resJson;
      console.log('this.user');
      console.log(this.user);
    });
  }

  getPostShare() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listPost.length; i++) {
      // @ts-ignore
      if (this.listPost[i].postIdShear != null) {
        // @ts-ignore
        const url = 'http://localhost:8080/api/findPostById/' + this.listPost[i].postIdShear;
        this.http.get<IStatus>(url).subscribe((resJson) => {
          // @ts-ignore
          this.listPost[i].post = resJson;
          console.log('ppppppppppppppppppppp');
          // @ts-ignore
          console.log(this.listPost[i].post);
        });
      }
    }
  }

  savePost() {
    // tslint:disable-next-line:max-line-length
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.post = {id: null, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: null, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/addPost/' + this.user.id;
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('create thành công');
    }, error => {
      alert('create lỗi');
    });
  }

  // @ts-ignore
  updatePostNoImg(id) {
    // tslint:disable-next-line:max-line-length
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.post = {id, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: null, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/editPost/' + this.user.id;
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('edit thành công');
    }, error => {
      alert('edit lỗi');
    });
  }

  // @ts-ignore
  deletePost(id) {
    const url = 'http://localhost:8080/api/deletePost/' + id;
    this.http.post(url, id).subscribe((resJson) => {
      alert('remote thành công');
    }, error => {
      alert('remote lỗi');
    });
  }

  // @ts-ignore
  sharePost(id) {
    // tslint:disable-next-line:max-line-length
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.post = {id: null, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: id, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/addPost/' + this.user.id;
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('create thành công');
    }, error => {
      alert('create lỗi');
    });
  }

  // @ts-ignore
  updatePostAndImg(idPost, idImg, linkImg) {
    if (this.arrayPicture === '') {
      this.arrayPicture = linkImg;
    }
    // tslint:disable-next-line:max-line-length
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.post = {id: idPost, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: null, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/editPostAndImg/' + idImg;
    console.log(idImg);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('edit thành công');
    }, error => {
      alert('edit lỗi');
    });
  }

  // @ts-ignore
  saveImg(value) {
    const file = value.target.files;
    // @ts-ignore
    const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0]);
    // @ts-ignore

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // @ts-ignore
      (snapshot) => {
        // in progress
        // @ts-ignore
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      () => {
        console.log('Error');
      },
      () => {
        // @ts-ignore
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.arrayPicture = downloadURL;
          console.log(this.arrayPicture);
        });
      }
    );
  }

  // @ts-ignore
  showUpdatePost = (id, content, status) => {
    this.contentPost = content;
    this.statusPost = status;
    $('#myModal' + id).modal('show');
  }
  // @ts-ignore
  showSharePost = (id) => {
    $('#modalShare' + id).modal('show');
  }
  closeEditPost = () => {
    this.contentPost = '';
    this.statusPost = 1;
    // @ts-ignore
    this.arrayPicture = null;
  }


}
