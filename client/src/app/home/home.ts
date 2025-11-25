import { Component, inject, OnInit, signal } from '@angular/core';
import { Account } from '../_services/account';
import { Register } from "../register/register";
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'app-home',
  imports: [Register, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home{
  users : any;
  registerMode = false;

  cancelRegisteration(){
    this.registerMode = false;
  }

  registerToggle() {
    this.registerMode = !this.registerMode
  }

}
