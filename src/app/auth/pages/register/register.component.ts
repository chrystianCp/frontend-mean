import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',  
})
export class RegisterComponent  {

  registerForm: FormGroup = this.fb.group({
    // name: ['USER_ROLE | ADMIN_ROLE', [Validators.required, Validators.minLength(5)]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6) ]],
    role: ['', [Validators.required ]],
  });

  roles: string[] = ['USER_ROLE', 'ADMIN_ROLE'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

    
  register(){

    console.log(this.registerForm.value);
    const { /*name,*/email, password, role } = this.registerForm.value;

    this.authService.register(/*name,*/email,password,role)
      .subscribe(ok => {
        // console.log(ok);
        if( ok===true ){
          this.router.navigateByUrl('/auth/login');
        }else{
          Swal.fire('Error', ok, 'error');
        }
        
      });
        
  }

}
