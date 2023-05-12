import { AuthService } from 'src/app/services/auth.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
import { NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { AbstractComponent } from 'src/app/core/abstract.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AbstractComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  returnUrl!: string;

  constructor(injector: Injector, private readonly authService: AuthService) {
    super(injector);

    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }

  ngOnInit() {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.returnUrl },
    });
  }
}
