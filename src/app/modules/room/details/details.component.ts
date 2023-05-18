import { Component, Injector, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/abstract.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent extends AbstractComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    console.log(this.getParam('id'));
  }
}
