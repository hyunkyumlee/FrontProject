document.addEventListener("DOMContentLoaded", function () {
  const infoBtn = document.querySelector(".info_btn"); // "도서 정보" 버튼
  const reviewBtn = document.querySelector(".review_btn"); // "리뷰" 버튼
  const infoMenu = document.querySelector(".info_menu_wrap"); // 도서 정보 영역
  const reviewMenu = document.querySelector(".info_review_menu"); // 리뷰 영역

  // 기본적으로 도서 정보 보이기
  infoMenu.style.display = "block";
  reviewMenu.style.display = "none";

  // 도서 정보 버튼 클릭 시
  infoBtn.addEventListener("click", function () {
    infoMenu.style.display = "block";
    reviewMenu.style.display = "none";
  });

  // 리뷰 버튼 클릭 시
  reviewBtn.addEventListener("click", function () {
    reviewMenu.style.display = "block";
    infoMenu.style.display = "none";
  });
});

const cbt = document.querySelector(".quizDiv");
const NoteDiv = document.querySelector(".NoteDiv");

const quiz = [
  {
    title:
      "1. HTML5 표준에 따라 HTML 페이지에 반드시 있어야 하는 태그가 아닌 것은?",
    select_1: "head",
    select_2: "img",
    select_3: "body",
    select_4: "!doctype html",
    corrent: "2",
  },
];

cbt.innerHTML = `
<h2>CBT 문제 미리보기</h2>
  <h4>${quiz[0].title}</h4>
  <form>
    <input name = "select"  type = "radio" value = "1">${quiz[0].select_1}<br>
    <input name = "select"  type = "radio" value = "2">${quiz[0].select_2}</input><br>
    <input name = "select"  type = "radio" value = "3">${quiz[0].select_3}</input><br>
    <input name = "select"  type = "radio" value = "4">${quiz[0].select_4}</input>
  </form>
  <p class="correct">정답입니다.</p>
  <p class="wrong">정답은 2번입니다.</p>
`;

function cbtBtn() {
  const correct = document.querySelector(".correct");
  const wrong = document.querySelector(".wrong");

  const selectRadio = document.getElementsByName("select");
  let radioValue = null;

  selectRadio.forEach((node) => {
    if (node.checked) {
      radioValue = node.value;
    }
  });

  if (radioValue === null) {
    return;
  } else if (radioValue == "2") {
    correct.style.display = "block";
    wrong.style.display = "none";
    wron;
  } else {
    correct.style.display = "none";
    wrong.style.display = "block";
  }
}

//장바구니 관련 변수들
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartWrap = document.querySelector(".cartWrap");
const cartItemsContainer = document.querySelector(".cart-items");
const totalAmountSpan = document.querySelector(".total-amount");

// 장바구니에 책 추가하는 함수
function addToCart() {
  const book = {
    id: Date.now(), // 고유 ID 생성
    title: "명품 HTML5+CSS3+Javascript 웹 프로그래밍",
    price: 28000,
    quantity: parseInt(document.querySelector(".cartAmount").value) || 1,
    image: "https://image.yes24.com/goods/107005339/XL",
  };

  // 이미 장바구니에 있는 책인지 확인
  const existingBookIndex = cartItems.findIndex(
    (item) => item.title === book.title
  );

  if (existingBookIndex !== -1) {
    // 이미 있는 책이면 수량만 증가
    cartItems[existingBookIndex].quantity += book.quantity;
  } else {
    // 새로운 책이면 추가
    cartItems.push(book);
  }

  // 로컬 스토리지에 저장
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // UI 업데이트
  updateCartUI();

  // 알림 표시
  alert("장바구니에 추가되었습니다!");

  // 장바구니 추가 후 자동으로 팝업 표시
  const cartPopup = document.getElementById("cartPopup");
  cartPopup.classList.add("show");
}

// 장바구니에서 책 삭제하는 함수
function removeFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartUI();
}

// 장바구니 UI 업데이트 함수
function updateCartUI() {
  // 장바구니 아이콘 텍스트 업데이트
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartWrap.textContent = `장바구니(${totalQuantity})`;

  // 장바구니 아이템 목록 업데이트
  cartItemsContainer.innerHTML = cartItems
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">
              ${
                item.quantity
              }개 × ${item.price.toLocaleString()}원 // 장바구니 아이템 수량 및 가격
            </div>
          </div>
          <button class="delete-btn" onclick="removeFromCart(${
            item.id
          })">×</button>
        </div>
      `
    )
    .join(""); // join 함수를 사용하여 배열을 문자열로 변환

  // 총 합계 업데이트
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ); // 총 합계 계산
  totalAmountSpan.textContent = totalAmount.toLocaleString(); // 총 합계 표시
}

// 장바구니 버튼 클릭 이벤트
function cartBtn() {
  addToCart();
}

// 페이지 로드 시 장바구니 UI 초기화
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});

function cancleBtn(obj) {
  console.log(obj);
  const p = obj.parentElement;
  console.log(p);

  const firInput = p.querySelector(".firInput");
  console.log(firInput);
  firInput.value = "";

  const sedText = p.querySelector(".sedText");
  sedText.value = "";

  write.style.display = "none";
}

// 도서정보와 리뷰 tap 클릭시 스타일 변경
const nonClick = document.querySelectorAll(".non-click");

function handleClick(event) {
  nonClick.forEach((e) => {
    e.classList.remove("click");
  });
  event.target.classList.add("click");
}

nonClick.forEach((e) => {
  e.addEventListener("click", handleClick);
});

const write = document.querySelector(".review_write");

function reviewBtn() {
  write.style.display = "block";
}

//로컬 스토리지를 이용해 리뷰를 작성하면 아래에 작성한 리뷰가 나오게 하는 코드
document.addEventListener("DOMContentLoaded", loadReviews);

function saveReview() {
  let title = document.querySelector(".firInput").value;
  let content = document.querySelector(".sedText").value;

  if (title.trim() === "" || content.trim() === "") {
    alert("제목과 내용을 입력하세요!");
    return;
  }

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push({ title, content });
  localStorage.setItem("reviews", JSON.stringify(reviews));

  document.querySelector(".firInput").value = "";
  document.querySelector(".sedText").value = "";

  displayReviews();
  document.querySelector(".flex_write").style.display = "none";
}

function toggleWriteBox() {
  let writeBox = document.querySelector(".flex_write");
  writeBox.style.display =
    writeBox.style.display === "none" || writeBox.style.display === ""
      ? "block"
      : "none";
}

document.querySelector(".review_js_btn").addEventListener("click", saveReview);
document
  .querySelector(".user_review_btn")
  .addEventListener("click", toggleWriteBox);

function loadReviews() {
  displayReviews();
}

function displayReviews() {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  let reviewContainer = document.querySelector(".reviewInput");
  reviewContainer.innerHTML = "";

  reviews.forEach((review, index) => {
    let reviewBox = document.createElement("div");
    reviewBox.classList.add("review-box");
    reviewBox.innerHTML = `
      <strong>${review.title}</strong>
      <p>${review.content}</p>
      <button class="review_js_btn2" onclick="deleteReview(${index})">삭제</button>
    `;
    reviewContainer.appendChild(reviewBox);
  });
}

function deleteReview(index) {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.splice(index, 1);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  displayReviews();
}

//순서
//1. 전체 div = input- container

//2. input id = "todoInput"
//3. button id = "addBtn"
//4. todoList 에 목록 추가

//1. input 태그 불러오기
//2. button 태그 불러오기
//3. 넣을 장소 불러오기

//1. 로컬스토리지에서 제목과 내용 가져오기
//2. 문자열로 변경

//1. 목록 저장함수

//1.

// 장바구니 토글 함수 추가
function toggleCart(event) {
  event.preventDefault(); // 기본 동작 방지
  const cartPopup = document.getElementById("cartPopup");
  cartPopup.classList.toggle("show"); // 장바구니 팝업 표시

  // 장바구니가 열릴 때 UI 업데이트
  if (cartPopup.classList.contains("show")) {
    // 장바구니가 열릴 때 UI 업데이트
    updateCartUI(); // 장바구니 아이템 목록 업데이트
  }
}

// 문서 클릭 이벤트 처리 추가
document.addEventListener("click", function (event) {
  const cartLink = document.getElementById("cart_link"); // 장바구니 링크
  const cartPopup = document.getElementById("cartPopup"); // 장바구니 팝업

  if (
    !cartLink.contains(event.target) &&
    cartPopup.classList.contains("show")
  ) {
    // 클릭된 요소가 장바구니 영역 내부가 아닐 경우에만 닫기
    cartPopup.classList.remove("show"); // 장바구니 팝업 닫기
  }
});
