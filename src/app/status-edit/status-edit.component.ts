import {Component, Input, OnInit} from '@angular/core';
import {IStatus} from '../model/istatus';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IImage} from '../model/iimage';
import {StatusService} from '../service/status.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';

import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {


  constructor(private statusService: StatusService,
              private fb: FormBuilder,
              private storage: AngularFireStorage,

              private router: Router,
  ) { }
  @Input()
  currentStatus!: IStatus;
  // @ts-ignore
  editForm: FormGroup;

  showEditForm = false;

  selectedImage: any = null;

  // @ts-ignore
  newImg: IImage;

  hideImg = false;

  ngOnInit(): void {
    this.editForm = this.fb.group({
        content: [''],
        images: [{
          url: ['']
        }],
      }
    );
  }

  // tslint:disable-next-line:typedef
  getCurrentStatus(){
    this.showEditForm = !this.showEditForm;
    this.editForm.patchValue(this.currentStatus);
    console.log(this.currentStatus);
  }

  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    console.log('hàm showpreview');
    // tslint:disable-next-line:triple-equals
    if (this.currentStatus.images == ''){
      this.currentStatus.images = [{
        url: [''],
      }];
    }
    if (event.target.files && event.target.files[0]) {
      const imgReader = new FileReader();
      imgReader.onload = (e: any) => {
        this.currentStatus.images.map(
          (image: { url: any; }) => image.url = e.target.result,
        );
      };
      imgReader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }

  }


  uploadImage() {
    if (this.selectedImage !== null){
      const filePath = `status/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(
          () => fileRef.getDownloadURL().subscribe(url => {

            this.currentStatus.images.map(
              // @ts-ignore
              image => image.url =  url
            );
            this.editStatus(url);
          }, () => {
            console.log('Load ảnh thất bại');

          })
        )
      ).subscribe();
    } else {
      this.editStatus();
    }
  }

  // tslint:disable-next-line:typedef
  editStatus(image?: any){
    if (image != null){
      this.currentStatus.images = [{
        url: image
      }];
    }
    this.currentStatus.content = this.editForm.value.content;
    // @ts-ignore
    this.statusService.editStatus(this.currentStatus).subscribe(() => {
      console.log('Chỉnh sửa thành công');

      this.showEditForm = false;
    });

  }
  submit() {
    this.uploadImage();
  }
  deleteImg() {
    this.currentStatus.images = [];
    this.hideImg = true;

  }

  // tslint:disable-next-line:typedef
  changeEditStatus() {
    this.showEditForm = false;
  }

}
