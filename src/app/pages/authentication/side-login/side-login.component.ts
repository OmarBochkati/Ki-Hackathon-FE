import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, private authService: AuthService) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.authService.signIn({email:this.form.get('email')?.value!, password:this.form.get('password')?.value!})
        .subscribe((data : any) => {
          console.log(data)
          this.router.navigate(['/dashboard/documents']);
        }, error => {
          console.error(error)
        })
  }
}
