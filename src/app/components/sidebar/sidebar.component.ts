import { Component, OnInit, Injector } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { UserDto } from 'src/app/dtos/user.dto';
import { UploadTypeEnum } from 'src/app/enums/upload.type.enum';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends AbstractComponent implements OnInit {
  public load: boolean = false;
  private returnUrl!: string;
  public imgUrl = this.getUserImage();
  private user: UserDto = {} as UserDto;

  constructor(
    injector: Injector,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super(injector);

    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }

  ngOnInit(): void {}

  public onSelect(event: any) {
    if (this.imgUrl) {
      this.firebaseService.deleteFile(this.imgUrl).then();
    }

    let file0: File = event.addedFiles
      ? event.addedFiles[0]
      : event.target.files[0];
    let name: string = file0.name;
    let extension: string = name.substring(name.lastIndexOf('.'), name.length);

    let reader = new FileReader();
    reader.onload = (file) => {
      if (file0) {
        this.load = true;
        const idFile = `${uuid()}`;
        const filename = `${idFile}.${extension}`;
        this.firebaseService
          .uploadFile(file0, filename, UploadTypeEnum.USER)
          .then((snapshot: { url: string; urlSafe: string }) => {
            this.user.image = snapshot.url;
            this.userService
              .updateUser(this.getIdCurrentUser(), this.user)
              .subscribe({
                next: (res) => {
                  if (res.data) {
                    this.alertService.success();
                    this.load = false;
                    this.imgUrl = snapshot.url;
                  }
                  if (res.errors) {
                    this.alertService.error(res.errors[0].message);
                    this.load = false;
                  }
                },
              });
          });
      }
    };
    reader.readAsArrayBuffer(file0);
  }

  public logout() {
    this.authService.logout();

    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.returnUrl },
    });
  }
}
