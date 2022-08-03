import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export const userNamePassword: ValidatorFn = (formGroup: AbstractControl) => {

    const userName = formGroup.get('userName')?.value;
    const password = formGroup.get('password')?.value;

    if(userName.trim() + password.trim()) {
        return userName != password
            ? null
            : { userNamePassword: true };
    } else {
        return null;
    }
}
