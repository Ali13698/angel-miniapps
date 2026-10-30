const loadingMessage = 'اتصال لابی هنوز آماده نیست؛ چند لحظه دیگر تلاش کنید.';

window.startQuickMatch = () => {
  window.alert(loadingMessage);
};

const start = document.getElementById('start-game-btn');
if (start) {
  start.onclick = () => window.alert(loadingMessage);
}

try {
  await import('/games/ludo-light/assets/lobby.js');
} catch (error) {
  console.error('Online lobby bundle could not be loaded', error);

  const message = document.createElement('p');
  message.setAttribute('role', 'alert');
  message.style.cssText = 'text-align:center;padding:12px';
  message.textContent =
    'بستهٔ آنلاین لابی بارگذاری نشد. ایمیج یکپارچهٔ جدید باید ساخته و مستقر شود.';

  document.querySelector('main')?.append(message);

  window.startQuickMatch = () => window.alert(message.textContent);
  if (start) {
    start.onclick = () => window.alert(message.textContent);
  }
}
