export class ValidateVal {

  len?: number | undefined;

  constructor(len?: number) {
    this.len = len || undefined;
  }

  validate(val: string) {
    const isValid = this.len ? val.length === this.len : val !== '';
    return isValid || 'Please enter correctly!';
  }
}