import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Asset } from 'src/app/models/asset';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-admin-assets',
  templateUrl: './admin-assets.component.html',
  styleUrls: ['./admin-assets.component.scss']
})
export class AdminAssetsComponent implements OnInit {

  assets: Asset[] = []

  constructor(
    private sanitizer: DomSanitizer,
    private assetService: AssetService
  ) { }

  ngOnInit(): void {
    this.assetService.assets.subscribe(a => {
      this.assets = a.map((a, i, s) => {
        console.log(a);
        a.dataUrl = this.sanitizer.bypassSecurityTrustUrl(a.data);
        return a;
      });
    });
  }

  update(asset: any) {
    this.assetService.updateAsset(asset);
  }

  remove(asset: any) {
    this.assetService.removeAsset(asset);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      console.log(file);
      console.log(reader.result);

      let asset: Asset = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        data: reader.result,
        dataUrl: undefined
      };

      this.assetService.addAsset(asset);
    };
  }
}
