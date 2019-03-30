import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent {

  baseURL:string = 'https://sondaggio-input-user.firebaseapp.com/';

  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.baseURL = this.baseURL + this.data.id;
    }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  onNoClick(): void {
    this.dialogRef.close();
    window.location.assign('https://sondaggio-admin.firebaseapp.com');
  }

}
