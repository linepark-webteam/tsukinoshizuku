// salon-lp.js
/**
 * LP共通スクリプト
 * - ヘッダー透過 → スクロールで背景付与
 * - フッターボタンのフェード表示など
 */

document.addEventListener("DOMContentLoaded", () => {
  const toggle   = document.querySelector(".header__toggle");
  const nav      = document.querySelector(".header__nav");
  const links    = document.querySelectorAll(".nav__link");
  const logoImg  = document.querySelector(".header__logo img");
  const origLogo   = "./img/logo.webp";
  const whiteLogo  = "./img/logo-white.webp";

  function updateLogoByScroll() {
    // スクロール量に応じて白→黒を切替
    if (window.scrollY > 50) logoImg.src = whiteLogo;
    else                    logoImg.src = origLogo;
  }

  function openNav() {
    // メニュー展開時は必ずオリジナル（黒）ロゴ
    logoImg.src = origLogo;

    nav.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
    nav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
    nav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // メニューを閉じたら、現在のスクロール位置に合わせて再切替
    updateLogoByScroll();
  }

  // トグルクリックで開閉
  toggle.addEventListener("click", () =>
    toggle.classList.contains("is-open") ? closeNav() : openNav()
  );

  // リンククリックでメニューを閉じる
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (toggle.classList.contains("is-open")) closeNav();
    });
  });

  // スクロールでロゴ切り替え（メニュー閉中のみ反映）
  window.addEventListener("scroll", () => {
    if (!nav.classList.contains("is-open")) {
      updateLogoByScroll();
    }
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
    }
  });
});
