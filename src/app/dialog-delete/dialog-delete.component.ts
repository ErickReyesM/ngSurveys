import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as firebase from 'firebase'

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {

  collectionFB:string = 'surveys';

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    onRemoveSurvey() {
      firebase.firestore().collection(this.collectionFB).doc(this.data.surveyInfo.id).delete();
      this.dialogRef.close();
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
