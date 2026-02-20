const promotionUlWrap = document.querySelector('.ul_wrap');
const promotionUl = document.querySelector('.ul_wrap ul');
const oneLine = 915;

const max = getComputedStyle(promotionUl).height;
isMoreBtnDisplay(915, max.substring(0, max.length-2));

const promotions = document.querySelectorAll('.ul_wrap ul li a');
console.log(promotions);
promotions.forEach((item, idx) => {
  const title = item.querySelector('p').innerHTML;
  const titleJSON = makeQueryString(title);
  
  // "./promotion_detail.html?title=&no="
  item.href = `./happymeal_detail.html?title=${titleJSON}&no=${idx}`;
})

// more버튼함수
function more() {
  const currHeightPx = getComputedStyle(promotionUlWrap).maxHeight;
  const maxHeight = getComputedStyle(promotionUl).height;
  const currHeight = Number(currHeightPx.substring(0, currHeightPx.length - 2));

  promotionUlWrap.style.maxHeight = (currHeight + oneLine) + "px";
  isMoreBtnDisplay((currHeight + oneLine), maxHeight);
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