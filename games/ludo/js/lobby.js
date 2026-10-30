const GAME_ORIGIN = 'https://game.nomi98.com';
const LOBBY_PATH = '/games/ludo/lobby.html';

function showError(message) {
  let box = document.getElementById('ludo-loading-error');

  if (!box) {
    box = document.createElement('p');
    box.id = 'ludo-loading-error';
    box.setAttribute('role', 'alert');
    box.style.cssText = 'text-align:center;padding:12px';
    (document.querySelector('main') || document.body).append(box);
  }

  box.textContent = message;
  window.startQuickMatch = () => window.alert(message);

  const start = document.getElementById('start-game-btn');
  if (start) start.onclick = () => window.alert(message);
}

if (location.origin !== GAME_ORIGIN) {
  // همهٔ آیکون‌های فعلی که این لابی را باز می‌کنند،
  // از این نقطه وارد میزبان بازی می‌شوند.
  const target = new URL(LOBBY_PATH, GAME_ORIGIN);
  const current = new URLSearchParams(location.hash.slice(1));
  const launch = new URLSearchParams();

  for (const key of [
    'tgWebAppData',
    'tgWebAppVersion',
    'tgWebAppPlatform',
    'tgWebAppThemeParams',
    'tgWebAppStartParam',
  ]) {
    const value = current.get(key);
    if (value !== null) launch.set(key, value);
  }

  const app = window.Telegram?.WebApp;

  // دادهٔ امضاشده بدون دست‌کاری منتقل می‌شود.
  // اعتبارسنجی هویت همچنان وظیفهٔ سرور است.
  if (app?.initData) {
    launch.set('tgWebAppData', app.initData);
  }
  if (app?.version) {
    launch.set('tgWebAppVersion', app.version);
  }
  if (app?.platform) {
    launch.set('tgWebAppPlatform', app.platform);
  }

  // اطلاعات ورود در query قرار نمی‌گیرد.
  target.hash = launch.toString();
  location.replace(target.href);
} else {
  window.startQuickMatch = () =>
    window.alert('در حال بارگذاری لابی منچ…');

  const start = document.getElementById('start-game-btn');
  if (start) start.onclick = window.startQuickMatch;

  try {
    await import('/games/ludo-light/assets/lobby.js');
  } catch (error) {
    console.error('Ludo lobby loading failed:', error);
    showError(
      'فایل لابی منچ روی میزبان بازی بارگذاری نشد: ' +
      '/games/ludo-light/assets/lobby.js'
    );
  }
}
