// url에서 데이터(title : 선택한 프로모션 제목, no : 선택한 프로모션 번호) 가져오기
const params = new URLSearchParams(window.location.search);
const titleJson = decodeURIComponent(params.get('title'));
let titleText;
const proNo = Number(params.get('no'));

try {
  titleText = JSON.parse(titleJson);
}
catch(err) {
  titleText = params.get('title');
}

// 데이터가 없다면 menu1으로 이동
if(params.size === 0) {
  alert("잘못된 접근 입니다.");
  window.location.replace("./promotion.html");
}

const pro_title = document.querySelector('.pro_title');
pro_title.innerHTML = titleText;

const proImg = document.querySelector('.pro_img_wrap img:first-child');
proImg.src = `./new_images/promotion_item_${proNo + 1}_1.jpg`