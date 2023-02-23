import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import * as fs from '@angular/fire/firestore';
import { Firestore } from "@angular/fire/firestore";
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  items$!: Observable<any[]>;
  toogle: boolean = false;
  total!: number;
  constructor(
    private fire: Firestore,
    private uService: UtilsService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const query = fs.query(
      fs.collection(this.fire, `menus`),
      fs.where('type', '==', 1),
      fs.orderBy('order')
    );
    this.items$ = fs.collectionData(query, { idField: 'id' }).pipe(
      tap((res: any) => this.total = res.length)
    ) as Observable<any[]>
  }

  onGoPage(url: string) {
    this.uService.navigateFoward(url);
  }

  onToggle() {
    this.toogle = !this.toogle;
  }

}

export const mockMenusData = [
  {
    icon: 'notifications-outline',
    title: 'Notificaciones',
    action: ''
  }
]
