import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ClarityIcons, userIcon, usersIcon, importIcon, exportIcon, displayIcon, trashIcon } from '@cds/core/icon';


import '@cds/core/icon/register.js';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  /**
   *
   */
  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  RegisterIcons() {

    console.log("register icons");

    ClarityIcons.addIcons(userIcon);
    ClarityIcons.addIcons(usersIcon);
    ClarityIcons.addIcons(importIcon);
    ClarityIcons.addIcons(exportIcon);
    ClarityIcons.addIcons(displayIcon);
    ClarityIcons.addIcons(trashIcon);


    let mergeIcon: any = ['merge', require("!!raw-loader?!./../../assets/icons/merge-line.svg").default];
    ClarityIcons.addIcons(mergeIcon);
  }
}
