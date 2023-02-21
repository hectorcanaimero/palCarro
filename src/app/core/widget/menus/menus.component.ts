import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {

  toogle: boolean = false;
  data = mockMenusData;
  constructor(
    private uService: UtilsService
  ) { }

  ngOnInit() {}

  onGoPage(url: string) {
    this.uService.navigateUrl(url);
  }

  onToggle() {
    this.toogle = !this.toogle;
  }

}

export const mockMenusData = [
  {
    icon: 'reader-outline',
    title: 'Ordenes',
    action: '/pages/orders'
  },
  {
    icon: 'calendar-outline',
    title: 'Historico',
    action: ''
  },
  {
    icon: 'barcode-outline',
    title: 'Rastreamento',
    action: ''
  },
  {
    icon: 'person-outline',
    title: 'Perfil',
    action: ''
  },
  {
    icon: 'notifications-outline',
    title: 'Notificaciones',
    action: ''
  }
]
