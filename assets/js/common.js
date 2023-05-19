// スクロールトップボタン
$(".js-top-link").click(function() {
  $("html, body").animate({
    scrollTop: 0
  }, 300);
  return false;
});

// ページ内リンク制御
$('.js-section-links a[href*="#"]').click(function () {
  //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  const elementHashtag = $(this).attr('href');
  //idの上部の距離を取得
  const upperDistance = $(elementHashtag).offset().top;
  $('html,body').animate({
    scrollTop: upperDistance
  }, 300); 
  return false;
});

// ハンバーガーボタン
const hamburger = $('#js-hamburger');
const navigationLinks = $('.js-section-links a');

hamburger.on('click',function(){
  $('body').toggleClass('is-open');

  if ($(this).attr('aria-expanded') == 'false') {
    $(this).attr('aria-expanded', true);
  } else {
    $(this).attr('aria-expanded', false);
  };

  if ($(this).attr('aria-label') == 'ナビゲーションを開く') {
    $(this).attr('aria-label', 'ナビゲーションを閉じる');
  } else {
    $(this).attr('aria-label', 'ナビゲーションを開く');
  }
});

// navigationLinks.each(function() {
//   this.on('click',function(){
//     $('body').removeClass('is-open');
//   });
// });

// Swiperアニメーション制御
const swiper = new Swiper(".section-voice-slider", {
  // ナビボタン
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  // ページネーション
  pagination: {
    el: ".swiper-pagination",
    clickable:true
  },
  //スライドの繰り返し処理
  rewind:true,
  //スライドの表示方法
  slidesPerView: 1,
  spaceBetween:40,
  grabCursor: true,
  //レスポンシブで表示変化
  breakpoints: {
    // 599px以上の場合
    599: {
      slidesPerView: 2
    },
    // 1025px以上の場合
    1025: {
      slidesPerView: 3
    }
  }
});

// header nav、ハンバーガーの色が変化する
const triggerEl = document.querySelector(".js-triggerEl");
const linkEl = document.querySelectorAll(".js-linkEl");
const hamburgerEl = document.querySelectorAll(".js-hamburgerEl");
const activeClass = "is-active";
const showClass = "is-show";

// header logo が変化する
const logoCurrent = document.querySelector("#js-logo-overlay");
const logoWhite = "assets/images/common/logo(white).svg";
const logoBlack = "assets/images/common/logo.svg";

// ビューポートと交差したら、アニメーションのきっかけとなる要素
const animationTriggers = document.querySelectorAll(".js-animationTrigger");

const inView = () => {
  linkEl.forEach((el) => {
    el.classList.remove(activeClass);
  });
  hamburgerEl.forEach((el) => {
    el.classList.remove(activeClass);
  });
};

const outView = () => {
  linkEl.forEach((el) => {
    el.classList.add(activeClass);
  });
  hamburgerEl.forEach((el) => {
    el.classList.add(activeClass);
  });
};

const returnLogo = () => {
  logoCurrent.src = logoWhite;
}
const changeLogo = () => {
  logoCurrent.src = logoBlack;
};

// オプション設定
const options01 = {
  root: document.querySelector('#main')
};
const options02 = {
  rootMargin: '-50% 0px',
  threshold: 0.5
};

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      inView();
      returnLogo();
    } else {
      outView();
      changeLogo();
    }
  });
});
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animationObserver.unobserve(entry.target);
      entry.target.classList.add(showClass);
    }
  });
});

// 監視対象01：メインビジュアル
headerObserver.observe(triggerEl, options01);
// 監視対象02：.js-animationTriggerが入ったすべての要素
animationTriggers.forEach(trigger => {
  animationObserver.observe(trigger, options02);
});


// ローディングアニメーション設定
const loadingAnimation = document.querySelector('.js-loading-animation');
const logoAnimation = document.querySelector('.js-logo-animation');
const loadedAnimation = document.querySelectorAll(".js-loaded");
const loadedClass = "is-loaded";
const hiddenClass = "is-hidden";


  const loaded = () => {
    logoAnimation.classList.add(loadedClass);
    loadingAnimation.classList.add(loadedClass);
  }
  const hiddenLoaded = () => {
    loadingAnimation.classList.add(hiddenClass);
  }

  const addLoadedClass = ((item) => {
    item.classList.add(loadedClass);
  });

// firstVisitの値と同じ型の物がなかったら、アニメーションする
// あったなら、アニメーションしない
window.addEventListener('DOMContentLoaded', function() {
  const firstVisit = this.sessionStorage.getItem('firstVisit');
  if (firstVisit === null) {
    sessionStorage.setItem('firstVisit','false');
    loaded();
    setTimeout(function() {
      loadedAnimation.forEach(addLoadedClass);
    }, 2800)
  } else {
    hiddenLoaded();
    loadedAnimation.forEach(addLoadedClass);
  }
});
