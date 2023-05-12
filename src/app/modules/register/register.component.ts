import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractComponent } from 'src/app/core/abstract.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends AbstractComponent implements OnInit {
  public formGroup!: FormGroup;
  public load: boolean = false;
  public hide: boolean = true;

  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);
    this.setupForm();
  }

  ngOnInit(): void {}

  setupForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  isFieldErrorsRequired(field: string, name: string): any {
    if (this.formGroup.get(field)?.errors?.['required']) {
      let text = name + ' obrigatório';
      return text.toLocaleUpperCase();
    }
  }

  verifyPassword() {
    if (
      this.formGroup.value.confirmPassword !== this.formGroup.value.password
    ) {
      this.alertService.error('Senha não conferem');
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      if (this.verifyPassword()) {
        this.alertService.success('sucesso');
        console.log(this.formGroup.getRawValue());
        this.load = true;
      }
      // const email = this.formGroup.value.email.trim();
      // const password = this.formGroup.value.password;
      // this.authenticationService.login(email, password).subscribe({
      //   next:async (user: User) => {
      //     await this.delay(1000)
      //     this.load = false;
      //     window.location.href = this.returnUrl;
      //   },
      //   error:(error)=>{
      //     this.load = false;
      //   }
      // });
    }
  }
}