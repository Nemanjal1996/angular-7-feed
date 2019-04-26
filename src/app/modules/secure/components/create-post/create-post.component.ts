import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/interfaces';
import { FeedService } from 'src/app/services';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  public postForm: FormGroup;
  public formSubmited = false;
  public fileData: File;
  public imagePath: any;
  public imageBase = environment.apiUrl;
  public post: Post;

  constructor(private dialogRef: MatDialogRef<CreatePostComponent>,
              private formBuilder: FormBuilder,
              private feedService: FeedService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.postForm = this.formBuilder.group({
      title: [this.data ? this.data.title : '', [Validators.required]],
      image: [''],
      content: [this.data ? this.data.content : '', [Validators.required]]
    });
    this.post = this.data;
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
    formData.append('image', this.fileData || this.data.imageUrl);
    formData.append('content', this.postForm.get('content').value);

    if(this.post && this.post._id) {
      this.feedService.updatePost(formData, this.post._id)
      .subscribe(response => {
        this.dialogRef.close(response);
      });
    } else {
    this.feedService.createPost(formData)
      .subscribe(response => {
        this.dialogRef.close({ ...response.post, creator: response.creator });
      });
    }
  }
}
