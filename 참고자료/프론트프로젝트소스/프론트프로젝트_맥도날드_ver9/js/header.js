{
const dth1s = document.querySelectorAll(".hd_dth1");
const depth2s = document.querySelectorAll(".hd_depth2");
const wrapper = document.querySelector(".wrapper");
const wrapper_left = wrapper.getBoundingClientRect().x;

// 상위메뉴(depth)의 위치 구해서 하위메뉴(depth2) 위치 잡기
let dth1Rect;
// 처음 한번 실행
positionMenu();
// 윈도우창 크기 변화 이벤트 처리
window.addEventListener('resize', () => positionMenu());

function positionMenu() {
  dth1s.forEach((dth1, idx) => {
    // 화면 만들어지는걸위해 잠깐 대기
    setTimeout(() => {
      dth1Rect = dth1.getBoundingClientRect();
      
      depth2s[idx].style.position = "absolute";
      depth2s[idx].style.left = (dth1Rect.x - wrapper_left + 5) + "px";
    }, 10)
  });
}


// 현재 선택된 페이지의 상위메뉴에 밑줄 효과 추가
const currUrl = window.location.pathname;

const str = currUrl.search('/html/');
let str2;
if(currUrl.indexOf('/', str + 6) !== -1) {
  str2 = currUrl.substring(str + 6, currUrl.indexOf('/', str + 6));

  const currDth = document.querySelector(`.${str2}`);
  if(currDth !== null) {
    currDth.style.textDecoration = "underline";
  }
}


// 현재 페이지 경로 가져오기
const scripts = document.getElementsByTagName("script");
let scriptSrc = "";

for (let i = 0; i < scripts.length; i++) {
  if (scripts[i].src.includes("script.js")) {
    scriptSrc = scripts[i].src;
    break;
  }
}

if (!scriptSrc) {
  console.error("script.js를 찾을 수 없습니다.");
}
const scriptDir = scriptSrc.substring(0, scriptSrc.lastIndexOf("/"));


// 검색버튼 이미지 동적으로 가져오기
const btnSearchOpen = document.querySelector(".hd_btn_search_open");
const btnClose = document.querySelector(".hd_close");
const topSearch = document.querySelector(".hd_topSearch");
const inputId = document.querySelector("#commonSearchWord");

btnSearchOpen.style.setProperty("--ico-search-url", 
                                `url(${scriptDir}/../images/ico_search.png)`);
btnClose.style.setProperty("--btn-close-img", `url(${scriptDir}/../images/btn_close.png)`);


// 검색버튼 클릭 이벤트
btnSearchOpen.addEventListener('click', (event) => {
  topSearch.classList.add("open");
  inputId.focus();
});

btnClose.addEventListener('click', (event) => {
  topSearch.classList.remove("open");
});


// 검색하기
function gotoCommonSearch(obj) {
  const div = obj.closest('div');
  const input = div.querySelector("input");
  
  // input이 비었는지 유효성 체크
  if(input.value === "") {
    alert("검색어를 입력해 주세요");
  }
  else {
    const link = `${scriptDir}/../html/search.html`;
    location.href=link;
  }
}


// 맥도날드 로고 이미지 동적으로 넣기
const img = document.querySelector(".hd_mc_logo a img");
img.src = `${scriptDir}/../images/mc_logo.png`;

// 맥도날드 로고 클릭 이벤트 처리
const imgAtag = document.querySelector(".hd_mc_logo a");
imgAtag.addEventListener('click', (event) => {
  const oldHref = imgAtag.getAttribute('href');
  imgAtag.href = `${scriptDir}/../html/${oldHref}`;
});


// 메뉴 이동 - dth1
dth1s.forEach(dth1 => dth1.addEventListener('click', (event) => {
  const oldHref = dth1.getAttribute('href');
  dth1.href = `${scriptDir}/../html/${oldHref}`;
}));

console.log(scriptDir);
// 메뉴 이동 - dth2
const dth2s = document.querySelectorAll(".hd_dth2");
dth2s.forEach(dth2 => dth2.addEventListener('click', (event) => {
  const oldHref = dth2.getAttribute('href');
  console.log(oldHref);
  dth2.href = `${scriptDir}/../html/${oldHref}`;
}));


// 상위메뉴 오버시 header에 open클래스 추가
const header = document.querySelector(".header");
dth1s.forEach(dth1 => {
  const li = dth1.closest("li");
  li.addEventListener('mouseover', (event) => {
    header.classList.add("open");

    li.classList.add("hd_active");
    li.style.setProperty("--hover-underline-width", dth1.offsetWidth + "px");
  })
});
dth1s.forEach(dth1 => {
  const li = dth1.closest("li");
  li.addEventListener('mouseout', (event) => {
    header.classList.remove("open");

    li.classList.remove("hd_active");
    li.style.setProperty("--hover-underline-width", "");
  })
});


// 하위메뉴 오버시 header에 open클래스 추가
depth2s.forEach(depth2 => {
  const nav = depth2.closest("nav");
  nav.addEventListener('mouseover', (event) => {
    header.classList.add("open");
  })
});
depth2s.forEach(depth2 => {
  const nav = depth2.closest("nav");
  nav.addEventListener('mouseout', (event) => {
    header.classList.remove("open");
  })
});


// 하위메뉴 오버시 상위메뉴에 가상요소를 추가하는 hd_active클래스 추가
depth2s.forEach((depth2, idx) => depth2.addEventListener('mouseover', (event) => {
  dth1s[idx].classList.add("hd_active");
  dth1s[idx].style.setProperty("--hover-underline-width", dth1s[idx].offsetWidth + "px");
}));
depth2s.forEach((depth2, idx) => depth2.addEventListener('mouseout', (event) => {
  dth1s[idx].classList.remove("hd_active");
}));


// 헤더 스크롤시 fixed 처리
window.addEventListener('scroll', function() {
  if(this.window.scrollY > 140) {
    header.classList.add("fixed");
  }
  else {
    header.classList.remove("fixed");
  }
});
}