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

  // 4. 리뷰 모달창
  updateModal(product);

  // 5. 별점 고정 로직
  initModalStarRating();

  // 6. 색상 옵션 표시 로직
  updateColorOptions(product);
}

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

//----------------------- 모달 로직
const modal = document.querySelector(".modal-background");
const stars = document.querySelectorAll(".stars div");
const closeBtn = document.querySelector(".close-btn");
const writeBtn = document.getElementById("write-review-btn")

// 1. 별을 클릭하면 모달 열기
stars.forEach(star => {
    star.addEventListener("click", () => {
        modal.classList.add("active");
    });
});

writeBtn.addEventListener("click", () => {
  modal.classList.add("active");
})
// 2. 닫기 버튼 클릭 시 모달 닫기
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

// 3. 모달 바깥(배경) 클릭 시 닫기
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// --- 세부 기능 함수들 ---

function updateColorOptions(product){
  const colorUl = document.querySelector(".color-choose ul");
  if(!colorUl) return;

  colorUl.innerHTML = "";

  product.colorOptions.forEach((option) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="#">
        <img src="${option.img}" alt="${option.name}" title="${option.name}">
      </a>
    `;
    colorUl.appendChild(li);
  })
};

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

function updateModal(product) {
  const modal = document.querySelector(".modal-overlay");
  
  // 1. 모달 내 상품명 업데이트
  const modalTitle = modal.querySelector(".review-info h3 + p");
  if (modalTitle) {
    modalTitle.innerHTML = `${product.name} <br>${product.engName}`;
  }

  // 2. 모달 내 이미지 업데이트
  const modalImg = modal.querySelector(".review-info img");
  if (modalImg) {
    modalImg.src = product.mainImages[0]; // 첫 번째 이미지를 대표로 표시
    modalImg.alt = product.name;
  }
}

// 리뷰 등록 유효성 검사
function checkValidity(){
  const content = document.getElementById("review-content");
  const title = document.getElementById("review-title");


  if(content.value ==""){
    alert("내용을 입력하세요.");
  } else if(title.value == ""){
    alert("제목을 입력하세요");
  }else{
    alert("리뷰 등록을 완료했습니다.");
    document.querySelector(".modal-background").classList.remove("active");
  }
}

const uploadBtn = document.getElementById("review-upload-btn");
if(uploadBtn){
  uploadBtn.addEventListener("click", checkValidity);
};

// 모달 내 별점 고정 로직
function initModalStarRating(){
  const modalStars = document.querySelectorAll(".modal-ratings .stars div");
  console.log(document.querySelectorAll(".modal-ratings .stars div"));

  modalStars.forEach((star, index ) => {
    star.addEventListener("click", () => {
      modalStars.forEach(s => s.classList.remove("selected"));

      for(let i = 0; i <= index; i++){
        modalStars[i].classList.add("selected");
      }
    });
  });
}

function handleProductNotFound() {
  console.error("상품을 찾을 수 없습니다.");
  alert("존재하지 않는 상품입니다. 메인 페이지로 이동합니다.");
  window.location.href = "./index.html";
}