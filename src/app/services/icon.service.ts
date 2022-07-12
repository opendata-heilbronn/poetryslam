import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ClarityIcons, userIcon, usersIcon, importIcon, exportIcon, displayIcon, trashIcon, angleIcon } from '@cds/core/icon';


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
    ClarityIcons.addIcons(angleIcon);

    // let tableSortNoneSvg = require("!!raw-loader?!./../../assets/icons/table-sort-none.svg").default;
    // console.log(tableSortNoneSvg);
    // let tableSortNone: any = ['table-sort-none', tableSortNoneSvg];
    // ClarityIcons.addIcons(tableSortNone);

    // let mergeIcon: any = ['merge', require("!!raw-loader?!./../../assets/icons/merge-line.svg").default];
    // ClarityIcons.addIcons(mergeIcon);
  }
}
