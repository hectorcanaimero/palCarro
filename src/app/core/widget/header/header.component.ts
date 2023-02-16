import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private uService: UtilsService
  ) { }

  ngOnInit() {}
}
