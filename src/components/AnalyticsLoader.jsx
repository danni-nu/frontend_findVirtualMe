import { useEffect } from "react";

// The environmental variable should be in env file
const GA_ID = "G-1K7H507PG3";

// 从 localStorage 或 cookie 读取同意状态
function getConsent() {
  const local = localStorage.getItem("cookieConsent");
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cookie_consent="))
    ?.split("=")[1];
  return local || cookie || "";
}

// 只加载一次 GA（加防抖标记）
function loadGAOnce() {
  if (window.__gaLoaded) return; // 已加载则跳过
  window.__gaLoaded = true;

  // 远程 gtag.js
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gaScript);

  // inline 配置
  const inline = document.createElement("script");
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;
  document.head.appendChild(inline);

  console.log("✅ Analytics script injected.");
}

export function AnalyticsLoader() {
  useEffect(() => {
    function maybeLoad() {
      const consent = getConsent();
      if (consent === "accepted") {
        console.log("✅ User consented. Loading analytics...");
        loadGAOnce();
      } else {
        console.log("❌ User did not consent to analytics. Script not loaded.");
        // 说明：GA 一旦加载无法“完全卸载”。若你想严格切换，
        // 可在设置里提示用户刷新页面以停止后续追踪。
      }
    }

    // 首次进入时检查
    maybeLoad();

    // 监听 CookieSettings / CookieConsent 改变同意状态时的事件
    window.addEventListener("consent-changed", maybeLoad);

    // 卸载监听器
    return () => window.removeEventListener("consent-changed", maybeLoad);
  }, []);

  // 不渲染任何 UI
  return null;
}
