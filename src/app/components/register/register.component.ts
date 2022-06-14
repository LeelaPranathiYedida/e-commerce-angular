import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,} from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register:any = FormGroup;
  user:any={};

  constructor(private fb:FormBuilder, private router:Router, private userService:UserServiceService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
  }
  registerSubmit(data:any){
    console.log(data)
    this.user=Object.assign(this.user,data);
    this.userService.addUser(this.user);
    this.register.reset();
    this.router.navigate(['header']);


  }
  // addUser(user:any){
  //   let users=[];
  //   if(localStorage.getItem('Users')){
  //   users=JSON.parse(localStorage.getItem('Users') as string)
  //   users=[user, ...users];}
  //   else{
  //     users=[user];
  //   }
  //   localStorage.setItem('Users',JSON.stringify(users));
  // }
  goToLogin(){
    this.router.navigate(['login'])
  }

}
