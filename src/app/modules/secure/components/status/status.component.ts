import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services';

import * as _ from 'lodash';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  public statusForm: FormGroup;
  public status: string;
  public statusUpdate: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserStatus()
      .subscribe(response => {
        this.status = response.status;
        this.statusForm = this.formBuilder.group({
          status: [this.status, [Validators.required]]
        });
      });
  }

  onSubmit() {
    this.statusUpdate = true;
    this.userService.updateUserStatus(this.statusForm.value.status)
      .subscribe(() => {
        this.statusUpdate = false;
      });
  }
}
