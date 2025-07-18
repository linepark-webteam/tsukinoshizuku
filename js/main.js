// salon-lp.js
/**
 * LP共通スクリプト
 * - ヘッダー透過 → スクロールで背景付与
 * - フッターボタンのフェード表示など
 */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".header__toggle");
  const nav    = document.querySelector(".header__nav");

  function openNav() {
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
  }

  toggle.addEventListener("click", () => {
    if (toggle.classList.contains("is-open")) closeNav();
    else                                     openNav();
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
    }
  });
});
