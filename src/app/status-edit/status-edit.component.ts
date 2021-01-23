// import {Component, Input, OnInit} from '@angular/core';
// import {IStatus} from '../model/istatus';
// import {FormBuilder, FormGroup} from '@angular/forms';
// import {IImage} from '../model/iimage';
// import {StatusService} from '../service/status.service';
// import {AngularFireStorage} from '@angular/fire/storage';
// import {Router} from '@angular/router';
//
// import {finalize} from 'rxjs/operators';
//
// @Component({
//   selector: 'app-status-edit',
//   templateUrl: './status-edit.component.html',
//   styleUrls: ['./status-edit.component.css']
// })
// export class StatusEditComponent implements OnInit {
//
//
//   constructor(private statusService: StatusService,
//               private fb: FormBuilder,
//               private storage: AngularFireStorage,
//
//               private router: Router,
//   ) { }
//   @Input()
//   currentStatus!: IStatus;
//   // @ts-ignore
//   editForm: FormGroup;
//
//   showEditForm = false;
//
//   selectedImage: any = null;
//
//   // @ts-ignore
//   newImg: IImage;
//
//   hideImg = false;
//
//   ngOnInit(): void {
//     this.editForm = this.fb.group({
//         content: [''],
//         images: [{
//           url: ['']
//         }],
//       }
//     );
//   }
//
//   // tslint:disable-next-line:typedef
//   getCurrentStatus(){
//     this.showEditForm = !this.showEditForm;
//     this.editForm.patchValue(this.currentStatus);
//     console.log(this.currentStatus);
//   }
//
//   // tslint:disable-next-line:typedef
//   showPreview(event: any) {
//     console.log('hàm showpreview');
//     // tslint:disable-next-line:triple-equals
//     if (this.currentStatus.images == ''){
//       this.currentStatus.images = [{
//         url: [''],
//       }];
//     }
//     if (event.target.files && event.target.files[0]) {
//       const imgReader = new FileReader();
//       imgReader.onload = (e: any) => {
//         this.currentStatus.images.map(
//           (image: { url: any; }) => image.url = e.target.result,
//         );
//       };
//       imgReader.readAsDataURL(event.target.files[0]);
//       this.selectedImage = event.target.files[0];
//     } else {
//       this.selectedImage = null;
//     }
//
//   }
//
//
//   uploadImage() {
//     if (this.selectedImage !== null){
//       const filePath = `status/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
//       const fileRef = this.storage.ref(filePath);
//       this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
//         finalize(
//           () => fileRef.getDownloadURL().subscribe(url => {
//
//             this.currentStatus.images.map(
//               // @ts-ignore
//               image => image.url =  url
//             );
//             this.editStatus(url);
//           }, () => {
//             console.log('Load ảnh thất bại');
//
//           })
//         )
//       ).subscribe();
//     } else {
//       this.editStatus();
//     }
//   }
//
//   // tslint:disable-next-line:typedef
//   editStatus(image?: any){
//     if (image != null){
//       this.currentStatus.images = [{
//         url: image
//       }];
//     }
//     this.currentStatus.content = this.editForm.value.content;
//     // @ts-ignore
//     this.statusService.editStatus(this.currentStatus).subscribe(() => {
//       console.log('Chỉnh sửa thành công');
//
//       this.showEditForm = false;
//     });
//
//   }
//   submit() {
//     this.uploadImage();
//   }
//   deleteImg() {
//     this.currentStatus.images = [];
//     this.hideImg = true;
//
//   }
//
//   // tslint:disable-next-line:typedef
//   changeEditStatus() {
//     this.showEditForm = false;
//   }
//
// }


import {Component, Input, OnInit} from '@angular/core';
import {IAccount} from '../model/iaccount';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';

import {IStatus} from '../model/istatus';
import {finalize} from 'rxjs/operators';
import {IImage} from '../model/iimage';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {
  @Input()
  currentAccount: IAccount = {
    avatarUrl: '',
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


  public userNamePath: any;
  public userNameLogin: any;

  constructor(private fb: FormBuilder,
              private token: TokenStorageService,
              private statusService: StatusService,
              private route: Router,
              private router: ActivatedRoute,
              private storage: AngularFireStorage,
              private auth: AuthService) {


    // @ts-ignore
    // this.userNamePath = +this.route.snapshot.paramMap.userNamePath;
    this.router.paramMap.subscribe((paraMap: ParamMap) => {
      console.log(paraMap.get('id'));
      this.id = paraMap.get('id');
    });
    this.userNameLogin = auth.currentUserValue.userName;


  }

  public id = 0;

  ngOnInit(): void {
    this.newStatus = this.fb.group({
      imageURL: [''],
      content: [''],
      privacy: ['0'],
    });

    // @ts-ignore

    // @ts-ignore
    // this.id = +this.router.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.loadData(this.id);
    }
  }

  // @ts-ignore
  private loadData(id) {
    this.statusService.getOneStatus(id).subscribe((data) => {
      console.log('getStudent', data);
      for (const controlName in this.newStatus.controls) {
        if (controlName) {
          // @ts-ignore
          this.newStatus.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }

  private createNewStatus() {
    const newStatus = {};

    for (const controlName in this.newStatus.controls) {
      if (controlName) {
        // @ts-ignore
        newStatus[controlName] = this.newStatus.controls[controlName].value;
      }
    }
    return newStatus as IStatus;
  }


  addStatus(image?: any) {
    // @ts-ignore
    const dataSent: IStatus = {
      content: this.newStatus.value.content,
      imageURL: this.newStatus.value.imageURL,
    };
    if (image != null) {
      dataSent.imageURL = image;
    }
    // tslint:disable-next-line:triple-equals
    if (dataSent.content == '') {
      alert('Hãy điền vào form');
      return;
    } else {
      if (this.userNameLogin === this.userNamePath) {
        this.statusService.createStatus(this.currentAccount.userName, dataSent).subscribe(
          (data) => {
            // tslint:disable-next-line:triple-equals
            if (data.message == 'success') {
              alert('Đăng thành công');
              window.location.reload();
              this.newStatus = this.fb.group({
                content: [''],
              });
              console.log(dataSent);

            } else {
              alert('Đăng thất bại');
            }
          }, () => {
            alert('Lỗi');
          }
        );
      } else {
        // @ts-ignore
        this.statusService.addStatusOnWallFriend(this.userNameLogin, this.userNamePath, dataSent).subscribe((data) => {
          console.log('statusform.component.ts ' + this.userNameLogin + '/ ' + this.userNamePath);
        });
      }
    }
  }

  // @ts-ignore
  // public editStatus() {
  //   if (this.id > 0) {
  //     // @ts-ignore
  //     this.statusService.modifyStatus(this.id, this.updateStatus())
  //       .subscribe((data) => {
  //       });
  //   }
  // }

  private editStatus(image?: any) {
    // @ts-ignore
    const dataSent: IStatus = {
      content: this.newStatus.value.content,
      imageURL: this.newStatus.value.imageURL,
    };
    if (image != null) {
      dataSent.imageURL = image;
    }
    // tslint:disable-next-line:triple-equals
    if (dataSent.content == '') {
      alert('Hãy điền vào form');
      return;
    } else {
      // @ts-ignore
      this.statusService.modifyStatus(this.id, dataSent).subscribe(
        (data) => {
          // tslint:disable-next-line:triple-equals
          if (data.message == 'success') {
            alert('Upadete success');
            window.location.reload();
            this.newStatus = this.fb.group({
              content: [''],
            });
            console.log(dataSent);

          } else {
            alert('Update fail');
          }
        }, () => {
          alert('Fail');
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
            alert('Up ảnh thành công');
            this.addStatus(responseUrl);
          }, () => {
            alert('Up thất bại');
          })
        )
      ).subscribe();
    } else {
      this.editStatus();
    }

  }


  // @ts-ignore
  // tslint:disable-next-line:adjacent-overload-signatures
  public addStatusOnWallFriend(userNameLogin: string, userNamePath: string) {
    this.statusService.addStatusOnWallFriend(userNameLogin, userNamePath, this.createNewStatus()).subscribe((data) => {
      console.log('statusform.component.ts ' + userNameLogin + '/ ' + userNamePath);
    });
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  private back(userNameLogin: any) {
    this.route.navigate(['timeline', this.userNamePath]);
  }
}
