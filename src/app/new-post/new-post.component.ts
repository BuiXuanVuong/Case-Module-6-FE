import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StatusService} from '../service/status.service';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UploadService} from '../service/upload.service';
import {IStatus} from '../model/istatus';
import {FileUpload} from '../model/upload-file';
import {Observable} from 'rxjs';
import {IAccount} from '../model/iaccount';
import {finalize} from 'rxjs/operators';
import {TokenStorageService} from '../service/token-storage.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {IImage} from '../model/iimage';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @Input()
  currentAccount: IAccount = {
    image: '',
    userName: '',
    email: '',
    password: ''
  };
  // @ts-ignore
  newStatus: FormGroup;
  // @ts-ignore
  imgList: IImage[];
  totalImg = 0;
  // @ts-ignore
  imgOne: string;
  imgTwo = '';
  imgThree = '';

  isImgUploading = false;

  selectedImage: any = null;


  constructor(private fb: FormBuilder,
              private token: TokenStorageService,
              private auth: AuthService,

              private statusService: StatusService,
              private route: Router,
              private storage: AngularFireStorage, ) {
  }

  ngOnInit(): void {
    this.newStatus = this.fb.group({
      content: [''],
      privacy: ['0'],
    });
  }

  addStatus(image?: any) {
    // @ts-ignore
    const dataSent: IStatus = {
      content: this.newStatus.value.content,
    };
    if (image != null){
      // @ts-ignore
      dataSent.imageURL = image;

    }
    // tslint:disable-next-line:triple-equals
    if (dataSent.content == '') {
      alert('Hãy điền vào form');
      return;
    } else {
      this.statusService.createStatus(this.auth.currentUserValue.userName, dataSent).subscribe(
        (data) => {

           console.log('Đăng thành công');
           window.location.reload();
           this.newStatus = this.fb.group({
              content: [''],
            });
           console.log(dataSent);


        }, (e) => {
          console.log('Lỗi kết nối');
          console.log(e);
        }
      );
    }
  }

  // @ts-ignore
  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const imgReader = new FileReader();
      imgReader.onload = (e: any) => {
        this.imgOne = e.target.result;
      };
      imgReader.readAsDataURL(event.target.files[0]);
      this.totalImg++;
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }

  }

  submit() {
    this.getImgFromFireBase();
  }

  getImgFromFireBase() {
    if (this.selectedImage !== null) {
      const filePath = `status/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(
          () => fileRef.getDownloadURL().subscribe(responseUrl => {
            console.log('Up ảnh thành công');
            this.addStatus(responseUrl);
          }, () => {
            console.log('Up ảnh thất bại');
          })
        )
      ).subscribe();
    } else {
      this.addStatus();
    }

  }



}
