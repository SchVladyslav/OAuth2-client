import { Component, OnInit } from '@angular/core';
import { Environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  version: string;

  constructor() { }

  ngOnInit(): void {
    this.version = Environment.version;
  }

}
