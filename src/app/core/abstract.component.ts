import { Location } from '@angular/common';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Constants } from '../config/constants';
import { UserDto } from '../dtos/user.dto';
import { PayloadDto } from '../dtos/payload.dto';

@Injectable()
export abstract class AbstractComponent implements OnDestroy {
  protected location: Location;
  protected router: Router;
  protected route: ActivatedRoute;
  protected alertService: AlertService;
  protected subscriptions: Subscription = new Subscription();

  constructor(injector: Injector) {
    this.location = injector.get(Location);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.alertService = injector.get(AlertService);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected getCurrentUser(): PayloadDto {
    const currentUser = JSON.parse(
      localStorage?.getItem(Constants.currentUser) || '{}'
    ) as PayloadDto;
    return currentUser ? currentUser : ({} as PayloadDto);
  }

  protected getNameCurrentUser(): String | any {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser?.user?.name;
    }
  }

  protected getEmailCurrentUser(): String | any {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser?.user?.email;
    }
  }

  protected getIdCurrentUser(): String | any {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser.user.userId;
    }
  }

  getParam(key: string): any {
    let result = null;
    this.route.params.forEach((params: Params) => (result = params[key]));
    return result;
  }

  protected delay(ms: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
