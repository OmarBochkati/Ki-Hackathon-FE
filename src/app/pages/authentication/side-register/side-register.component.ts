import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, private authService: AuthService) {}

  form = new FormGroup({
    full_name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);

    console.log(this.form.value);
    this.authService.signUp({
      email:this.form.get('email')?.value!,
      full_name:this.form.get('full_name')?.value!,
      password:this.form.get('password')?.value!
    })
        .subscribe((data : any) => {
          console.log(data)
          this.router.navigate(['/authentication/login']);
        }, error => {
          console.error(error)
        })
  }
}
