import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '@core/services/utils.service';
import { Observable } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  uid!: string | null;
  order$!: Observable<any>;
  items$!: Observable<any[]>;
  message: string = '';
  constructor(
    private fire: Firestore,
    private uService: UtilsService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.uid = this.actRoute.snapshot.paramMap.get('uid');
    console.log(this.message);
  }

  onSubmit() {
    console.log(this.message);
  }
  onEventInput(ev: any) {
    console.log(ev);
  }

  async takePicture(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    console.log(imageUrl);
  };
}
