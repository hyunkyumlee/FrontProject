document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find((item) => item.id == productId);

  if (product) {
    renderProductDetail(product);
  } else {
    handleProductNotFound();
  }
});

/**
 * 상품 상세 정보를 화면에 그리는 함수
 */
function renderProductDetail(product) {
  // 1. 텍스트 정보 업데이트
  updateTextContent(product);
  
  // 2. 이미지 리스트 생성
  updateImageGrid(product);
  
  // 3. 특징 및 장점 리스트 생성
  updateFeatures(product);
}
// 기존 DOMContentLoaded 내부의 renderProductDetail(product); 바로 아래에 추가하세요
initQuantityDropdown(); 

/**
 * 수량 선택 드롭다운 기능을 초기화하는 함수
 */
function initQuantityDropdown() {
  const dropContainer = document.querySelector('.drop');
  const dropBtn = document.querySelector('.drop-btn');
  const dropMenu = dropContainer.querySelector('ul');
  const dropItems = dropMenu.querySelectorAll('li');

  // 1. 버튼 클릭 시 메뉴 보이기/숨기기 토글
  dropBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 부모로 이벤트가 퍼지는 것을 막아 메뉴가 바로 닫히지 않게 함
    dropContainer.classList.toggle('active');
  });

  // 2. 리스트 아이템(숫자) 클릭 시 선택 처리
  dropItems.forEach(item => {
    item.addEventListener('click', () => {
      const val = item.innerText;
      // 버튼의 텍스트를 선택한 숫자로 변경 (아이콘 유지)
      dropBtn.innerHTML = `${val} <i class="fa-solid fa-angle-down"></i>`;
      dropContainer.classList.remove('active');
    });
  });

  // 3. 메뉴 바깥쪽 아무데나 클릭하면 메뉴 닫기
  window.addEventListener('click', () => {
    dropContainer.classList.remove('active');
  });
}

// --- 세부 기능 함수들 ---

function updateTextContent(product) {
  document.querySelector(".tree-item").innerHTML = `${product.name}<br>${product.engName}`;
  document.querySelector(".item-name h3").innerHTML = `${product.name}<br>${product.engName}`;
  document.querySelector(".item-name h4").innerText = `${product.price.toLocaleString()} 원`;
  document.querySelector(".item-intro p").innerText = product.intro;
}

function updateImageGrid(product) {
  const imageUl = document.querySelector(".item-images ul");
  imageUl.innerHTML = ""; // 기존 정적 이미지 제거

  product.mainImages.forEach((imgSrc) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${imgSrc}" alt="${product.name}">`;
    imageUl.appendChild(li);
  });
}

function updateFeatures(product) {
  const featureContainer = document.querySelector(".item-info div:first-child");
  // 제목(h4)만 남기고 나머지는 비우기
  const title = featureContainer.querySelector("h4");
  featureContainer.innerHTML = "";
  featureContainer.appendChild(title);

  product.features.forEach(text => {
    const p = document.createElement("p");
    p.className = "gray";
    p.innerText = text;
    featureContainer.appendChild(p);
    featureContainer.appendChild(document.createElement("hr"));
  });
}

// function handleProductNotFound() {
//   console.error("상품을 찾을 수 없습니다.");
//   alert("존재하지 않는 상품입니다. 메인 페이지로 이동합니다.");
//   window.location.href = "./index.html";
// }