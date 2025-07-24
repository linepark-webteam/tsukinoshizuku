// salon-lp.js
/**
 * LP共通スクリプト
 * - ヘッダー透過 → スクロールで背景付与
 * - フッターボタンのフェード表示など
 */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".header__toggle");
  const nav = document.querySelector(".header__nav");
  const links = document.querySelectorAll(".nav__link");
  const logoImg = document.querySelector(".header__logo img");
  const origLogo = "./img/logo.webp";
  const whiteLogo = "./img/logo-white.webp";

  // スクロール量に応じてロゴ切替
  function updateLogoByScroll() {
    if (window.scrollY > 50) logoImg.src = whiteLogo;
    else logoImg.src = origLogo;
  }

  // メニューを開く
  function openNav() {
    logoImg.src = origLogo;
    nav.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
    nav.setAttribute("aria-hidden", "false");

    // PCのとき(768より大きい時)は body のスクロールロックをしない
    if (window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // メニューを閉じる
  function closeNav() {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
    nav.setAttribute("aria-hidden", "true");

    // 解除
    document.body.style.overflow = "";

    // 閉じたあとロゴを再設定
    updateLogoByScroll();
  }

  // トグルクリックで開閉
  toggle.addEventListener("click", () =>
    toggle.classList.contains("is-open") ? closeNav() : openNav()
  );

  // メニュー内リンクをクリックしたら閉じる
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (toggle.classList.contains("is-open")) closeNav();
    });
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
    }
  });

  // スクロールでロゴ切替（メニュー閉中のみ）
  window.addEventListener("scroll", () => {
    if (!nav.classList.contains("is-open")) {
      updateLogoByScroll();
    }
  });

  // ナビリンクやトグル以外をクリック／タップしたらメニューを閉じる
  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("is-open") &&
      // トグルボタン自体ではない
      !toggle.contains(e.target) &&
      // <a class="nav__link"> の内部でもない
      !e.target.closest(".nav__link")
    ) {
      closeNav();
    }
  });

    /* ---------- Hero animation ---------- */
  const heroSection = document.getElementById("hero");

  const heroObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroSection.classList.add("is-animated");
          heroObserver.unobserve(heroSection); // 1 回だけ発火
        }
      });
    },
    { threshold: 0.3 } // 30% ほど画面に入ったら
  );

  heroObserver.observe(heroSection);
});
