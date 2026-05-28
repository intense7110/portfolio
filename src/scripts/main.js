const AUTH_KEY = 'portfolio-auth';
const AUTH_VALUE = 'ok';
const AUTH_TOKEN = 'YToxMjM=';

const lockStyle = document.createElement('style');
lockStyle.textContent = `
  html[data-auth-status="locked"] body {
    visibility: hidden;
  }

  .auth-fallback {
    display: grid;
    min-height: 100vh;
    place-items: center;
    padding: 24px;
    color: #202020;
    background: #fbfaf7;
    font-family: system-ui, sans-serif;
    line-height: 1.7;
    text-align: center;
  }
`;
document.head.append(lockStyle);

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
