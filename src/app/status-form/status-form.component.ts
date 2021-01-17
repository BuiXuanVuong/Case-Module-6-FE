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


  constructor(private fb: FormBuilder,
              private token: TokenStorageService,
              private statusService: StatusService,
              private route: Router,
              private router: ActivatedRoute,
              private storage: AngularFireStorage, ) {
  }
  public id = 0;
  ngOnInit(): void {
    this.newStatus = this.fb.group({
      imageURL: [''],
      content: [''],
      privacy: ['0'],
    });

    // @ts-ignore
    this.id =+this.router.snapshot.paramMap.get('id');
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
    if (image != null){
      dataSent.images = [{
        url: image
      }];
    }
    // tslint:disable-next-line:triple-equals
    if (dataSent.content == '') {
     alert('Hãy điền vào form');
     return;
    } else {
      this.statusService.createStatus(this.currentAccount.id, dataSent).subscribe(
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
    }
  }

  public editStatus() {
    if (this.id > 0) {
      // @ts-ignore
      this.statusService.modifyStatus(this.id, this.createNewStatus())
        .subscribe((data) => {

        });
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
      this.addStatus();
    }

  }




}

