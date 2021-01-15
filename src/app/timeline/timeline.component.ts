import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IImage} from '../model/iimage';
import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';
import {NofiticationService} from '../service/nofitication.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {IStatus} from '../model/istatus';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @Input()
  currentAccount: IAccount = {
    // @ts-ignore
    avatar: '',
    name: '',
    email: '',
    password: ''
  };
  newStatus!: FormGroup;
  imgList: IImage[] = [];
  totalImg = 0;
  imgOne!: string;
  imgTwo = '';
  imgThree = '';

  isImgUploading = false;

  selectedImage: any = null;

  constructor(private fb: FormBuilder,
              private token: TokenStorageService,
              private notice: NofiticationService,
              private statusService: StatusService,
              private route: Router,
              private storage: AngularFireStorage, ) {
  }

  ngOnInit(): void {
  }

  addStatus(image?: any) {

    // @ts-ignore
    const dataSent: IStatus = {
      content: this.newStatus.value.content,
      // @ts-ignore
      privacy: this.newStatus.value.privacy,
    };
    if (image != null){
      // @ts-ignore
      dataSent.images = [{
        url: image
      }];
    }
    // tslint:disable-next-line:triple-equals
    if (dataSent.content == '') {
      this.notice.fail('Hãy điền vào form.');
      return;
    } else {
      this.statusService.createStatus(this.currentAccount.id, dataSent).subscribe(
        (data) => {
          // tslint:disable-next-line:triple-equals
          if (data.message == 'success') {
            this.notice.success('Đăng status thành công!');
            window.location.reload();
            this.newStatus = this.fb.group({
              content: [''],
            });
            console.log(dataSent);

          } else {
            this.notice.fail('Đăng thất bại :(');
          }
        }, () => {
          this.notice.fail('Lỗi kết nối');
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
            this.notice.success('Upload ảnh thành công');
            this.addStatus(responseUrl);
          }, () => {
            this.notice.fail('Up ảnh thất bại');
          })
        )
      ).subscribe();
    } else {
      this.addStatus();
    }

  }
}
