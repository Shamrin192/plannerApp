import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { profile } from 'console';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  selectedFile : File | null = null;

  constructor(private fb: FormBuilder, private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(10)]],
      confirmPassword: ['', Validators.required],
      nickname: ['', Validators.required],
      profilePic: ['']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched()
    }

    const formData = new FormData();
    formData.append('name',this.registerForm.value.name);
    formData.append('email',this.registerForm.value.email);
    formData.append('password',this.registerForm.value.password);
    formData.append('nickName',this.registerForm.value.nickname);

    if (this.selectedFile) {
    formData.append('profilePicture', this.selectedFile);
    }

    this.auth.register(formData)
    .subscribe({
      next:(res:any)=>{
        console.log(res);
        this.auth.setUserDetails(res);
         this.router.navigate(['/planner']);
      },
      error:(error:any)=>{
        console.error('Login failed', error);
      }
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0] || null;
  }
}
