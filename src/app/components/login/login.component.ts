import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any=FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.login=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
  }
  loginSubmit(data:any){
    console.log(data)
    const user =this.authService.authUser(this.login.value)
    if(user){
      console.log("login sucess")
      this.router.navigate(['header'])
    }
    else{
      alert("Name or email is incorrect")
      console.log("login  not sucess")
    }
    this.login.reset();


  }
  goToSignup(){
    this.router.navigate(['register'])
  }

}
