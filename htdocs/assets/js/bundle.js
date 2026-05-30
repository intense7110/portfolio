const e="portfolio-auth",n="ok",u="cG9ydGZvbGlvOjIwMjZjYXJlZXI=";sessionStorage.getItem(e)!==n&&(document.documentElement.dataset.authStatus="locked");const a=()=>{document.body.innerHTML=`
    <main class="auth-fallback">
      <div>
        <h1>Authentication required</h1>
        <p>IDまたはパスワードが正しくありません。</p>
      </div>
    </main>
  `,document.documentElement.dataset.authStatus="unlocked"},d=()=>{if(sessionStorage.getItem(e)===n){document.documentElement.dataset.authStatus="unlocked";return}const t=window.prompt("IDを入力してください"),o=t===null?null:window.prompt("パスワードを入力してください");if(t!==null&&o!==null&&btoa(`${t}:${o}`)===u){sessionStorage.setItem(e,n),document.documentElement.dataset.authStatus="unlocked";return}a()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d,{once:!0}):d();
