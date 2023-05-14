import { Location } from '@angular/common';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Constants } from '../config/constants';
import { PayloadDto } from '../shared/dtos/payload.dto';
import { FirebaseService } from '../services/storage/firebase/firebase.service';
import { UtilHelper } from './util.helper';
import { UserDto } from '../shared/dtos/user.dto';

@Injectable()
export abstract class AbstractComponent implements OnDestroy {
  protected location: Location;
  protected router: Router;
  protected route: ActivatedRoute;
  protected alertService: AlertService;
  protected firebaseService: FirebaseService;
  protected subscriptions: Subscription = new Subscription();

  constructor(injector: Injector) {
    this.location = injector.get(Location);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.alertService = injector.get(AlertService);
    this.firebaseService = injector.get(FirebaseService);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected getCurrentUser(): PayloadDto {
    const currentUser = JSON.parse(localStorage?.getItem(Constants.currentUser) || '{}') as PayloadDto;
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

  protected getUserImage(user?: UserDto): string {
    return UtilHelper.getUserImage(user ? user : this.getCurrentUser().user);
  }

  protected getImage(entity: any, field: string): string {
    return UtilHelper.getImage(entity, field);
  }

  protected getParam(key: string): any {
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
