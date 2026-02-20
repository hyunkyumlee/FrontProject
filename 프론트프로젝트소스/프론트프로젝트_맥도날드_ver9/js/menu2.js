// txt파일에서 메뉴 정보 읽어오기
const files = ['menu2_set.txt'];
async function readFileText(fileList) {
  for(const file of fileList) {
    try {
      const response = await fetch(`../../txt/${file}`);
      const text = await response.text();

      const menu_datas = text.split('=')[0];
      const menu_data = menu_datas.split('\r\n');
      const menus = [];
      menu_data.forEach((data, idx) => {
        const d = data.split('|');
        const menu_obj = {
          no : `${idx}`,
          name: `${d[0]}`,
          eng_name: `${d[1]}`,
          img: `${d[2]}`
        };
        menus.push(menu_obj);
      });

      let length = menus.length;
      while(menus[length - 1].name === '')
      {
        menus.pop();
        length--;
      }
      
      printCnt(menus, ".cnt_set");
      makeUlLi(menus, ".ul_set");
      stylingLi(".ul_set");
    }
    catch(err) {
      console.error(`${file} 읽기 실패 : `, err);
    }
  }
}

readFileText(files);

// 단품, 세트 토글
const rdBtns = document.querySelectorAll('input[name="single_set"]');
const singleDiv = document.querySelector('.menu_single');
const setDiv = document.querySelector('.menu_set');
let currDiv = currPage();
const oneLine = 775;

rdBtns.forEach(rdBtn => {
  rdBtn.addEventListener('change', (event) => {
    if(rdBtn.value == "single") {
      if(rdBtn.checked) {
        singleDiv.style.display = "block";
        setDiv.style.display = "none";
        setDiv.style.maxHeight = "780px";
      }
    }
    else {
      if(rdBtn.checked) {
        setDiv.style.display = "block";
        singleDiv.style.display = "none";
        singleDiv.style.maxHeight = "780px";
      }
    }
    currDiv = currPage();
    isMoreBtnDisplay(returnCurrHeight(currDiv), returnMaxHeight(currDiv));
  })
});

// 하단 +버튼 배치
setTimeout(() => {  // 메뉴 구현을 잠깐 대기 - 안하면 최대 높이가 이상한 값이 들어옴
  isMoreBtnDisplay(returnCurrHeight(currDiv), returnMaxHeight(currDiv));
}, 100)


// 상품 개수 출력 함수
function printCnt(menus, pName) {
  let singleCnt = menus.length;
  const singleP = document.querySelector(pName);
  singleP.textContent = `${singleCnt} Products`;
}


// Ul, li 만드는 함수
function makeUlLi(menus, divName) {
  const category = "맥런치__menu2_set";

  // ul li 추가
  const ulDiv = document.querySelector(divName);
  const ul = document.createElement('ul');

  // 배너 설명
  const bannerText = document.querySelector('.subCopy').innerHTML;

  const params = bannerText;
  const url = makeQueryString(params);

  menus.forEach(menu => {
    const li = document.createElement('li');
    li.innerHTML = `<a href=detail.html?category=${category}&banner_text=${url}&menuNo=${menu.no}>
                      <div class="thum">
                        <img src="./menu_images/menu2/${menu.img}" alt="${menu.name} 이미지">
                      </div>
                      <div class="menu_name">
                        <p>${menu.name}</p>
                        <p>${menu.eng_name}</p>
                      </div>
                    </a>`;

    ul.appendChild(li);
  })

  // singleUl스타일 지정
  ul.style.display = "flex";
  ul.style.gap = "35px";
  ul.style.flexWrap = "wrap";

  ulDiv.appendChild(ul);
}


// li 스타일링
function stylingLi(divName) {
  const lis = document.querySelectorAll(`${divName} ul li`);
  lis.forEach(li => {
    li.style.width = "366px";
    li.style.height = "352px";

    const a = li.querySelector('a');
    a.style.display = "block";
    a.style.height = "100%";
    a.style.padding = "20px 30px";
    a.style.textAlign = "center";
    a.style.textDecoration = "none";
    a.style.backgroundColor = "#f8f8f8";
    a.style.border = "1px solid #f8f8f8";
    a.style.borderRadius = "10px";
    a.style.boxSizing = "border-box";

    const p1 = li.querySelector('a .menu_name p:nth-child(1)');
    p1.style.fontSize = "20px";
    p1.style.fontWeight = "500";
    p1.style.lineHeight = "1.3";
    p1.style.color = "#292929";

    const p2 = li.querySelector('a .menu_name p:nth-child(2)');
    p2.style.marginTop = "12px";
    p2.style.fontSize = "15px";
    p2.style.lineHeight = "1.3";
    p2.style.color = "#808080";
    
    // a태그 오버시 스타일링
    a.addEventListener('mouseover', (event) => {
      a.style.backgroundColor = "#fff";
      a.style.border = "1px solid #ffbc0d";
    });
    a.addEventListener('mouseout', (event) => {
      a.style.backgroundColor = "#f8f8f8";
      a.style.border = "1px solid #f8f8f8";
    });
  });
}


// more버튼함수
function more() {
  const currHeight = returnCurrHeight(currDiv);
  const maxHeight = returnMaxHeight(currDiv);

  currDiv.style.maxHeight = (currHeight + oneLine) + "px";
  isMoreBtnDisplay((currHeight + oneLine), maxHeight);
}


// 현재 페이지를 반환하는 함수
function currPage() {
  const divs = document.querySelectorAll(".content");

  let currPage;
  divs.forEach(div => {
    const divDisplay = getComputedStyle(div).display;
    if(divDisplay == "block") {
      currPage = div;
    }
  });

  return currPage;
}

// 현재 페이지의 높이를 반환하는 함수
function returnCurrHeight(curr) {
  let currHeightStr = getComputedStyle(curr).maxHeight;
  const currHeight = Number(currHeightStr.substring(0, currHeightStr.length - 2));
  return currHeight;
}

// 현재 페이지의 최대 높이를 반환하는 함수
function returnMaxHeight(curr) {
  const div = curr.querySelector(".newUl");

  const maxHeight = div.offsetHeight;
  return maxHeight;
}

// more버튼 display여부
function isMoreBtnDisplay(curr, max) {
  const btnMoreWrapper = document.querySelector(".btnMore");
  const isBetween = (max < (curr + oneLine) && max > curr);
  const isBig = max > (curr + oneLine);

  // 최대 높이가 현재 높이와 다음줄 높이의 사이값에 있거나
  // 최대 높이가 다음줄 높이보다 높으면 버튼 생성
  (isBetween || isBig) ? btnMoreWrapper.style.display = "block" 
                       : btnMoreWrapper.style.display = "none";
}


// 쿼리스트링 만드는 함수
function makeQueryString(items) {
  // 객체 배열을 JSON 문자열로 변환
  const jsonString = JSON.stringify(items);
  // URL에 사용 가능하도록 인코딩
  const encoded = encodeURIComponent(jsonString);
  // 최종 URL
  const url = encoded;
  return url;
}
