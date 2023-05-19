import { Component, Injector, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/abstract.component';

@Component({
  selector: 'app-details',
  templateUrl: './details-room.component.html',
  styleUrls: ['./details-room.component.scss'],
})
export class DetailsRoomComponent extends AbstractComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    console.log(this.getParam('id'));
  }
}
