import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.scss']
})
export class PreloadComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigateTo() {
    this.router.navigate([{ outlets: { selected: ['card'] }}]).then();
  }

  public close() {
    this.router.navigate([{ outlets: { selected: null }}]).then();
  }

}
