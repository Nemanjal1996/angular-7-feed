import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as _ from 'lodash';
import { FeedService } from 'src/app/services';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  public postForm: FormGroup;
  public formSubmited: boolean = false;
  public fileData: File;
  public imagePath: any;

  constructor(private dialogRef: MatDialogRef<CreatePostComponent>,
              private formBuilder: FormBuilder,
              private feedService: FeedService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: [''],
      content: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = () => {
        this.imagePath = reader.result;
      };
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.postForm.get('title').value);
    formData.append('image', this.fileData);
    formData.append('content', this.postForm.get('content').value);

    this.feedService.createPost(formData)
      .subscribe(response => {
        this.dialogRef.close({
          post:  { ...response.post, creator: response.creator }
        });
      });
  }
}
