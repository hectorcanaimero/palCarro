import { Injectable } from "@angular/core";
import * as fs from '@angular/fire/firestore';
import { Firestore } from "@angular/fire/firestore";
import { StorageService } from "@core/services/storage.service";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  constructor(
    private fire: Firestore,
    private storage: StorageService,
  ) {}

  async getMenus() {
    const query = fs.query(fs.collection(this.fire, `menus`) );
    return from(fs.collectionData(query, { idField: 'id' }) as Observable<any[]>);
  }

}
