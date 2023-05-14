import { Injectable } from '@angular/core';
import { StorageInterface } from '../storage.interface';
import { UploadTypeEnum } from 'src/app/shared/enums/upload.type.enum';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements StorageInterface {
  constructor(private _sanitizer: DomSanitizer, private angularFireStorage: AngularFireStorage) {}

  async uploadFile(file: File, filename: string, uploadTypeEnum: UploadTypeEnum): Promise<any> {
    try {
      const storage = this.angularFireStorage.storage;
      const storageRef = storage.ref();
      const uploadTask = storageRef.child(uploadTypeEnum.toString() + filename);
      const metadata = { contentType: file.type };

      return new Promise<any>((resolve, reject) => {
        return uploadTask
          .put(file, metadata)
          .then(() => {
            return uploadTask.getDownloadURL().then((url) => {
              resolve({
                url: url,
                urlSafe: this._sanitizer.bypassSecurityTrustResourceUrl(url),
              });
            });
          })
          .catch((err) => {
            console.error(JSON.stringify(err));
            reject(err);
          });
      });
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  deleteFile(storageUrl: string) {
    return new Promise<any>((resolve, reject) => {
      try {
        if (storageUrl.indexOf(environment.firebaseConfig.storageBucket) !== -1) {
          const storage = this.angularFireStorage.storage;
          const deleteTask = storage.refFromURL(storageUrl);
          resolve(deleteTask.delete());
        } else {
          resolve(storageUrl);
        }
      } catch (error) {
        console.error(error);
        resolve(error);
      }
    });
  }
}
