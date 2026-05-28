const e="portfolio-auth",n="ok",s="YToxMjM=",d=document.createElement("style");d.textContent=`
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
`;document.head.append(d);sessionStorage.getItem(e)!==n&&(document.documentElement.dataset.authStatus="locked");const u=()=>{document.body.innerHTML=`
    <main class="auth-fallback">
      <div>
        <h1>Authentication required</h1>
        <p>IDまたはパスワードが正しくありません。</p>
      </div>
    </main>
  `,document.documentElement.dataset.authStatus="unlocked"},a=()=>{if(sessionStorage.getItem(e)===n){document.documentElement.dataset.authStatus="unlocked";return}const t=window.prompt("IDを入力してください"),o=t===null?null:window.prompt("パスワードを入力してください");if(t!==null&&o!==null&&btoa(`${t}:${o}`)===s){sessionStorage.setItem(e,n),document.documentElement.dataset.authStatus="unlocked";return}u()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",a,{once:!0}):a();
