export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateAmount(amount: string): boolean {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}

export function validateTwitterUrl(url: string): boolean {
  return url.startsWith('https://twitter.com/') || url.startsWith('https://x.com/');
}