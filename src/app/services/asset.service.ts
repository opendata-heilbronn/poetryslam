import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Asset } from '../models/asset';
import { MessageType } from '../models/message';
import { DataService } from './data.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private dataKey = "assets";

  _assets: Asset[] = [];
  assets: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>(this._assets);

  constructor(
    private dataService: DataService
  ) {
    this.dataService.data.subscribe(d => {
      if (d) {
        this._assets = d.assets;
        this.assets.next(this._assets);
      }
    });
  }


  addAsset(asset: Asset): Asset {
    this._assets.push(asset);
    this.assets.next(this._assets);
    this.dataService.Update(this.dataKey, this._assets);
    return asset;
  }

  getAsset(id: string): Asset | undefined {
    return this._assets.find(m => m.id == id);
  }

  updateAsset(asset: Asset): Asset | undefined {
    let p = this._assets.find(m => m.id == asset.id);
    this.dataService.Update(this.dataKey, this._assets);
    return p;
  }

  removeAsset(asset: Asset) {
    this._assets = this._assets.filter(m => m.id != asset.id);
    this.dataService.Update(this.dataKey, this._assets);
  }

}
