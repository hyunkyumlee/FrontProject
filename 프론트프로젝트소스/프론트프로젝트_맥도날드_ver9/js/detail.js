// url에서 데이터(category : 선택한 메뉴, banner_text : 상단 배너 문구, no : 선택한 상품 번호) 가져오기
const params = new URLSearchParams(window.location.search);
const bannerJson = decodeURIComponent(params.get('banner_text'));
const bannerText = JSON.parse(bannerJson);

// 데이터가 없다면 menu1으로 이동
if(params.size === 0) {
  alert("잘못된 접근 입니다.");
  window.location.replace("./menu1.html");
}

const category = params.get('category').split('__');
let menuNo = Number(params.get('menuNo'));

// txt파일에서 메뉴 정보 읽어오기
async function readFileText(file) {
  try {
    const response = await fetch(`../../txt/${file}`);
    const text = await response.text();

    // 메뉴 데이터 세팅
    setMenuData(text.split('=')[0]);
    // 영양 정보 세팅
    setNutData(text.split('=')[1], "amount");
    setNutData(text.split('=')[2], "standard");
  }
  catch(err) {
    console.error(`${file} 읽기 실패 : `, err);
  }
}
readFileText(category[1] + '.txt');


// 상단 배너 타이틀, 문구, 링크 연결
const banner_title = document.querySelector('.banner_title');
banner_title.textContent = category[0];

const subCopy = document.querySelector('.subCopy');
subCopy.innerHTML = bannerText;

const nav_path1 = document.querySelector('.nav_path li:nth-child(2) a');
nav_path1.textContent = "Menu";
nav_path1.href = `./menu1.html`;

const nav_path2 = document.querySelector('.nav_path li:last-child a');
nav_path2.textContent = category[0];
nav_path2.href = `./${category[1].split('_')[0]}.html`;


// 상단 배너 이미지 변경 추가***************************************************************
const visual_area = document.querySelector('.visual_area');
const visual_area_url = `url(../html/menu/menu_images/${category[1].split('_')[0]}/bg_visual_menu.jpg)`
visual_area.style.setProperty("--img-banner-url", visual_area_url);

// 메뉴 데이터 세팅 함수
function setMenuData(menu_datas) {
  const menu_data = menu_datas.trim().split('\r\n');
  const menus = [];
  menu_data.forEach((data, idx) => {
    const d = data.split('|');
    const menu_obj = {
      no : `${idx+1}`,
      name: `${d[0]}`,
      eng_name: `${d[1]}`,
      img: `${d[2]}`,
      allergy: d[3],
      origin: d[4],
      comment: d[5]
    };
    menus.push(menu_obj);
  });

  // 갖고온 메뉴 정보를 쓰는 함수
  setDomEl(menus);
}

// 영양 정보 세팅 함수
function setNutData(nut_datas, row) {
  const nut_data = nut_datas.trim().split('\r\n');
  const datas = [];
  nut_data.forEach((data, idx) => {
    const d = data.split('|');
    datas.push(d);
  });

  const tds = document.querySelectorAll(`.${row} td`);
  tds.forEach((td, idx) => td.textContent = datas[menuNo][idx]);
}


// 선택된 상품을 dom에 출력
function setDomEl(menuDatas) {
  const data = menuDatas[menuNo];
  const name = document.querySelector('.kor_title');
  const eng_name = document.querySelector('.eng_title');
  const img = document.querySelector('.gallery img');
  const comment = document.querySelector('.img_info');

  name.textContent = data.name;
  eng_name.textContent = data.eng_name;
  img.src = `./detail_images/${category[1]}/${data.no}.png`;
  img.alt = `${data.name} 이미지`
  comment.innerHTML = data.comment;

  const allergy = document.querySelector('.allergy');
  allergy.textContent = `(${data.allergy})`;

  const origin = document.querySelector('.origin');
  origin.innerHTML = data.origin;

  // 이전 메뉴 버튼
  const prevBtn = document.querySelector('.prev');
  const prevTit = prevBtn.querySelector('.tit');
  if(menuNo !== 0) {
    const prevMenuImg = document.querySelector('.prev img');
    prevMenuImg.src = `./detail_images/${category[1]}/${menuDatas[menuNo-1].no}.png`;

    prevBtn.style.display = "block";
    prevTit.textContent = menuDatas[menuNo-1].name;
  }
  else {
    prevBtn.style.display = "none";
  }
  
  // 다음 메뉴 버튼
  const nextBtn = document.querySelector('.next');
  const nextTit = nextBtn.querySelector('.tit');
  if(menuNo < menuDatas.length-1) {
    const nextMenuImg = document.querySelector('.next img');
    nextMenuImg.src = `./detail_images/${category[1]}/${menuDatas[menuNo+1].no}.png`;
    nextBtn.style.display = "block";
    nextTit.textContent = menuDatas[menuNo+1].name;
  }
  else {
    nextBtn.style.display = "none";
  }
}


// 갤러리 버튼 클릭 이벤트
function move(obj) {
  if(obj.classList.contains('prev')) {
    menuNo--;
  }
  if(obj.classList.contains('next')) {
    menuNo++;
  }
  readFileText(category[1] + '.txt');
}


// 영양, 알레르기, 원산지 접거나 펼치기
function toggleInfoDiv(obj) {
  const opener = obj.closest('div').nextElementSibling;
  const span = obj.querySelector('span');
  if(obj.classList.contains('open')) {
    obj.classList.remove('open');
    opener.style.display = "none";
    span.textContent = "+";
  }
  else {
    obj.classList.add('open');
    opener.style.display = "block";
    span.textContent = "-";
  }
}

