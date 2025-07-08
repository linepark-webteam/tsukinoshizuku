// salon-lp.js
/**
 * LP共通スクリプト
 * - ヘッダー透過 → スクロールで背景付与
 * - フッターボタンのフェード表示など
 */
document.addEventListener("DOMContentLoaded", () => {
  /* ヘッダー透過制御（必要に応じて実装） */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("solid", window.scrollY > 100);
    });
  }

  /* IntersectionObserver で要素フェードイン */
  const faders = document.querySelectorAll(".fade-up");
  const options = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);
  faders.forEach((el) => observer.observe(el));
});
