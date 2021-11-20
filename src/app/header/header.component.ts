import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';
import { exit } from 'process';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
logout(){
  window.open('http://daycare.impelcreations.co.in', '_self', '');
  window.close();
  
}
}
