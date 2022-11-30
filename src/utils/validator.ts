export const validate = (val: string, len: number = 4) => {
  const isValid = len ? val.length === len : val !== '';
  return isValid || 'Please enter correctly!';
}