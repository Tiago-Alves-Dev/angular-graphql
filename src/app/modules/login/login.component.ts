import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { PayloadDto } from 'src/app/dtos/payload.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent implements OnInit {
  public formGroup!: FormGroup;
  public load: boolean = false;
  private returnUrl!: string;
  public hide: boolean = true;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    super(injector);
    this.setupForm();
  }

  ngOnInit(): void {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  setupForm(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  isFieldErrorsRequired(field: string, name: string): any {
    if (this.formGroup.get(field)?.errors?.['required']) {
      let text = name + ' obrigatório';
      return text.toLocaleUpperCase();
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.load = true;

      this.authService
        .signIn({
          email: this.formGroup.value.email.trim(),
          password: this.formGroup.value.password,
        })
        .subscribe({
          next: async (res) => {
            if (res.data) {
              this.alertService.success();
              await this.delay(1000);
              this.load = false;
              window.location.href = this.returnUrl;
            }
            if (res.errors) {
              this.alertService.error(res.errors[0].message);
              this.load = false;
            }
          },
        });
    }
  }
}
