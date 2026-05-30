const AUTH_KEY = 'portfolio-auth';
const AUTH_VALUE = 'ok';
const AUTH_TOKEN = 'cG9ydGZvbGlvOjIwMjZjYXJlZXI=';

if (sessionStorage.getItem(AUTH_KEY) !== AUTH_VALUE) {
  document.documentElement.dataset.authStatus = 'locked';
}

const showDenied = () => {
  document.body.innerHTML = `
    <main class="auth-fallback">
      <div>
        <h1>Authentication required</h1>
        <p>IDまたはパスワードが正しくありません。</p>
      </div>
    </main>
  `;
  document.documentElement.dataset.authStatus = 'unlocked';
};

const requestAuth = () => {
  if (sessionStorage.getItem(AUTH_KEY) === AUTH_VALUE) {
    document.documentElement.dataset.authStatus = 'unlocked';
    return;
  }

  const id = window.prompt('IDを入力してください');
  const password = id === null ? null : window.prompt('パスワードを入力してください');

  if (id !== null && password !== null && btoa(`${id}:${password}`) === AUTH_TOKEN) {
    sessionStorage.setItem(AUTH_KEY, AUTH_VALUE);
    document.documentElement.dataset.authStatus = 'unlocked';
    return;
  }

  showDenied();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', requestAuth, { once: true });
} else {
  requestAuth();
}
