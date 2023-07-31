import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

interface MyNotification {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifier$ = new Subject<MyNotification>();
  constructor() {
    this.notifier$.subscribe(
      {
        next: (myNotification) => {
          Swal.fire(myNotification.title, myNotification.message, myNotification.type)
        }
      }
    )
  }

  sendSuccessNotification(message: string, title = 'Success') {
    this.notifier$.next({
      type: 'success',
      message,
      title
    })
  }
  sendErrorNotification(message: string, title = 'Error') {
    this.notifier$.next({
      type: 'error',
      message,
      title
    })
  }
  sendConfirm(message: string, title?: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
  }
}
