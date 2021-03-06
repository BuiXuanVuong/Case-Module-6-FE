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
import {AccountService} from '../service/account.service';
import {Iuser} from '../model/iuser';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {
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

  // @ts-ignore
  public userLogin: Iuser;

  constructor(private fb: FormBuilder,
              private token: TokenStorageService,
              private statusService: StatusService,
              private route: Router,
              private router: ActivatedRoute,
              private storage: AngularFireStorage,
              private auth: AuthService,
              private accountService: AccountService) {


    // @ts-ignore
    // this.userNamePath = +this.route.snapshot.paramMap.userNamePath;
    this.router.paramMap.subscribe((paraMap: ParamMap) => {
      console.log(paraMap.get('userName'));
      this.userNamePath = paraMap.get('userName');
    });
    this.userNameLogin = auth.currentUserValue.userName;

    accountService.getUserPathByUserName(this.auth.currentUserValue.userName).subscribe( data => {
      // @ts-ignore
      this.userLogin = data;
    });

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
    this.id = +this.router.snapshot.paramMap.get('id');
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
              alert('Success');
              window.location.reload();
              this.newStatus = this.fb.group({
                content: [''],
              });
              console.log(dataSent);

            } else {
              // alert('Đăng thất bại');
            }
            this.goToTimeLine();
          }, () => {
            alert('Lỗi');
          }
        );
      } else {
        // @ts-ignore
        this.statusService.addStatusOnWallFriend(this.userNameLogin, this.userNamePath, dataSent).subscribe((data) => {
          console.log('statusform.component.ts ' + this.userNameLogin + '/ ' + this.userNamePath);
          this.newStatus.reset();
        });
      }
    }
  }

  goToTimeLine() {
    this.route.navigate(['timeline', this.userNamePath]);
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
            alert('Success');
            this.addStatus(responseUrl);
          }, () => {
            // alert('Up thất bại');
          })
        )
      ).subscribe();
    } else {
      this.addStatus();
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

