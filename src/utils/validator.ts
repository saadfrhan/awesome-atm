export const validate = (val: string | number, len: number = 4) => {
  const isValid = () => {
    if (typeof val === 'string') {
      return len ? val.length === len : val !== '';
    } else if (typeof val === 'number') {
      return val > 0;
    }
  };
  return isValid() || 'Please enter correctly!';
}