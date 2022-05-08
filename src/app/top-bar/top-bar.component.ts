import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  /**
   * Internal variable for sidenav computational control
   * */
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  /**
   * Toggle sidenav menu
   * */
  toggleMenu() {
    if (this.sidenav.opened) {
      console.log("cloising sidenavc")
      this.sidenav.close()
    } else {
      console.log("opening sidenav")
      this.sidenav.open()
    }
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/