import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() href = '';
  @Input() backButton = false;
  constructor(
    private uService: UtilsService,
  ) { }

  ngOnInit() {}

  onGoPage(url: string) {
    this.uService.navigateUrl(url);
  }
}
