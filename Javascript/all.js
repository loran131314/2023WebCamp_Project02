/*
$(document).ready(function (event) {

    // 檢查視窗大小並執行相應程式碼
    checkWindowSize();

    // 當視窗大小改變時重新檢查
    $(window).on('resize', function () {
        checkWindowSize();
    });
});

function checkWindowSize() {
    var windowWidth = $(window).width();

    if (windowWidth < 375) {
        // 裝置小於768px的程式碼
        console.log("裝置寬度小於768px");} else {
        // 裝置大於等於992px的程式碼
        console.log("裝置寬度大於等於992px");
    }
}
*/

/* 企業圖片動畫滑動效果 */
// function scrollRight() {
//   /*先向右移动一个图片的宽度 移动后把最后一个元素插入到头部 然后移除最后一个元素*/
//   $('.enterprise-line-1').animate({
//   }, 0, function() {
//     $('.enterprise-line-1').prepend($('.enterprise-line-1 li:last').clone());
//     $('.enterprise-line-1 li:last').remove();
//   });

//   /*完成上面动作后将left置为0*/
//   $('.enterprise-line-l').animate({
//     left: 0
//   }, 200);
// }
// scrollRight();

// var auto;
// $('#auto').click(function() {
//   auto = setInterval(scrollLeft, 2000);
// });

// $('#stop').click(function() {
//   clearInterval(auto);
// });


$(document).ready(function (event) {

  $('.navbar-icon-mobile').click(function () {
    $('.navbar-menu-icon-mobile').toggle();
    $('.navbar-close-icon-mobile').toggle();
    $('.navbar-menu-mobile').toggle();
    $('.banner, main').toggle(10);
  });

  $('.category-click').click(function () {
    $(this).find('.category-menu').slideToggle();
  });
  $('.sort-new').click(function (event) {
    event.preventDefault();
    $('.sort-menu').slideDown();
    $('.sort-text').text('由新到舊');
  });
  $('.sort-old').click(function (event) {
    event.preventDefault();
    $('.sort-menu').slideDown();
    $('.sort-text').text('由舊到新');
  });

  $('.QnA-list').click(function (event) {
    event.preventDefault();
    $(this).toggleClass('QnA-list-active');
    $(this).find('.icon-add').toggleClass('d-none');
    $(this).find('.icon-remove').toggle();
    $(this).find('.QnA-detail-a').slideToggle();
  })
});

/* 原本要利用 swiper 實現自動滾動, codepen 測試沒問題, 但放入專案縮放視窗時圖片會重疊*/
// 已解決 ↑↑↑ 將_home.scss Line348 設置最大最小寬度
// https://codepen.io/laron9486/pen/PoyXaqV
/*const enterpriseSwiper = new Swiper(".enterprise-swiper", {
  // on: {
  //   resize: function () {
  //     this.update();
  //   },
  // },
  slidesPerView: 6,
  slidesPerGroup: 1,
  spaceBetween: 20,
  speed: 2500,
  loop: true,  // 此模式下直接拖拉視窗不會自動輪播
  // 物件元素要比 slidesPerView 的值大於兩倍, loop 才會啟動
  // ［Swiper.js loop when slidesPerView is bigger than half of the amount of Slides］
  // https://reurl.cc/o7eVbQ
  autoplay: {
    delay: 500,
    pauseOnMouseEnter: true,
    //disableOnInteraction: false,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  breakpoints: {
    // 768: {
    //   slidesPerView: 5,
    // },
    // 993: {
    //   slidesPerView: 6,
    // },
    1201: {
      slidesPerView: 7,
      slidesPerGroup: 0
    },
  },
});*/
const enterpriseSwiper = new Swiper(".enterprise-swiper", {
  slidesPerView: 'auto',
  spaceBetween: 20,
  freeMode: true,
});

/* --------------- 拖曳類型列表 --------------- 測試未果(放置)
let areaDrag = document.querySelector('.category-menu');

// 添加滑鼠滾動事件監聽器
areaDrag.addEventListener("wheel", function (event) {
  event.preventDefault();
  areaDrag.scrollLeft += event.deltaY;
});
*/

const commentSwipper = new Swiper('.comment-swiper', {

  // 頁面呈現的物件數
  slidesPerView: 1,
  // 一次切換幾個物件
  slidesPerGroup: 1,
  // 物件之間的間距,單位px,其他單位用字串呈現
  spaceBetween: 0,
  loop: true,         // 此模式下視窗改變尺寸需重整才會自動播放
  // 自動輪播,單位毫秒
  autoplay: {
    delay: 2500,
  },
  // 斷點
  breakpoints: {
    767: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: false,
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 0,
      spaceBetween: 24,
      loop: false,
    },
  },
  // 分頁   
  pagination: {
    el: '.swiper-pagination',
    clickable: true,        // 分頁按鈕可點選切換
  },
  // 左右箭頭
  /*  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },*/
  // 滾動條
  /*  scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },*/
});



/* --------------- 利用穎旻老師的程式碼做修改 --------------- */
// API 文件：https://hackmd.io/wA0Zeuk8QI-i7jeEXVssIA?view
// 資料串接
const apiPath = "https://2023-engineer-camp.zeabur.app";    // Line109
const product = document.querySelector(".product");         // Line135
const pagination = document.querySelector(".pagination");   // Line

const data = {
  type: "",
  sort: 0,
  page: 1,
  search: ""
};

let worksData = [];     // Line138
let pagesData = {};     // Line165

// 若 API 文件內的 request／Query String 的 request 是 false 則 ? 問號後的路徑可以不寫
function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${
    type ? `type=${type}&` : ""
  }${search ? `search=${search}` : ""}`;

  // axios 取第三方資料
  axios.get(apiUrl).then(function (response) {
    worksData = response.data.ai_works.data;
    pagesData = response.data.ai_works.page;

    // console 確認資料取得
    // console.log('response', response)
    // console.log('worksData', worksData)
    // console.log('pagesData', pagesData)

    WorksRender();
    PagesRender();
  });
}

getData(data);  // Line97

// 渲染作品
function WorksRender() {
  let works = "";

  worksData.forEach((item) => {
    works += /*html*/ `<li class="product-card">
        <div class="product-card-pic">
          <img class="img" src="${item.imageUrl}" alt="ai image">
        </div>
        <div class="product-subject">
          <h4 class="product-subject-title fz-20">${item.title}</h4>
          <p class="product-subject-describe">${item.description}</p>
        </div>
        <div class="product-belong">
          <p class="ai">AI 模型</p>
          <p class="name">${item.discordId.slice(0, -5)}</p>
        </div>
        <div class="product-function">
          <span class="tag">#${item.type}</span>
          <a class="card-link" href="${item.link}" target="_blank">
            <span class="material-icons">share</span>
          </a>
        </div>
    </li>`;
  });

  product.innerHTML = works;   // Line 95
}

// 分頁切換
function changePage(pagesData) {
  const pageLinks = document.querySelectorAll("a.pagination-item-link");
  let pageId = "";

  pageLinks.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      pageId = e.target.dataset.page;
      data.page = Number(pageId);

      if (!pageId) {
        data.page = Number(pagesData.current_page) + 1;
      }

      getData(data);
    });
  });
}

/* --------------- 先撈範例,之後要回頭看 Code --------------- */
// 渲染分頁
function PagesRender() {
  let pageStr = "";

  for (let i = 1; i <= pagesData.total_pages; i += 1) {
    pageStr += /*html*/ `<li class="pagination-item ${
      pagesData.current_page == i ? "active" : ""
    }" >
      <a class="pagination-item-link ${
        pagesData.current_page == i ? "disabled" : ""
      }" href="#search"  data-page="${i}">${i}</a>
    </li>`;
  }

  if (pagesData.has_next) {
    pageStr += /*html*/ `<li class="pagination-item">
      <a class="pagination-item-link" href="#search">
        <span class="material-icons">
          keyboard_arrow_right
        </span>
      </a>
    </li>`;
  }
  pagination.innerHTML = pageStr;

  changePage(pagesData);
}

// 排序切換
const desc = document.querySelector("#desc");
const asc = document.querySelector("#asc");
const btnSort = document.querySelector("#btn-sort");
//  由新到舊 -> sort = 0
// desc.addEventListener("click", function (e) {
//   e.preventDefault();
//   data.sort = 0;
//   getData(data);
//   btnSort.innerHTML = '<span class="category-text">由新到舊</span><span class="material-icons">expand_more</span>';
// });
//  由舊到新 -> sort = 1
// asc.addEventListener("click", function (e) {
//   e.preventDefault();
//   data.sort = 1;
//   getData(data);
//   btnSort.innerHTML = '<span class="category-text">由舊到新</span><span class="material-icons">expand_more</span>';
// });

// 類型切換
// const filterBtns = document.querySelectorAll(".filter-btn li a");
// filterBtns.forEach(function (item) {
//   item.addEventListener("click", function (e) {
//     e.preventDefault();
//     if (item.textContent === "全部") {
//       console.log(item.textContent);
//       data.type = "";
//     } else {
//       console.log(item.textContent);
//       data.type = item.textContent;
//     }
//     getData(data);
//   });
// });

// 搜尋欄
// const search = document.querySelector("#search");
// search.addEventListener("keydown", function (e) {
//   if (e.keyCode === 13) {
//     data.search = search.value;
//     data.page = 1;
//     getData(data);
//   }
// });
