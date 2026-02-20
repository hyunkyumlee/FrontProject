//장바구니 관련 변수들
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartWrap = document.querySelector(".cartWrap");
const cartItemsContainer = document.querySelector(".cart-items");
const totalAmountSpan = document.querySelector(".total-amount");

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
