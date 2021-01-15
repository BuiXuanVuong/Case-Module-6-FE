import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NofiticationService {

  constructor() { }
  success(message: string) {
    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      // @ts-ignore
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        icon: 'success',
        title: message
      });

    });
  }

  fail(message: string){
    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      // @ts-ignore
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        icon: 'error',
        title: message
      });

    });
  }
}
