import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileUpload} from '../model/upload-file';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/uploads';
  uploadSubject = new Subject();

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
          this.uploadSubject.next(downloadURL);
          this.uploadSubject = new Subject();
        });
      })
    ).subscribe();
    // @ts-ignore
    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }
}
