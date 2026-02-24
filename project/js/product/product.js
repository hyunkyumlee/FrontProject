 
/* 필터버튼 왼쪽 패널, 배경 흐려지게 */
  document.addEventListener("DOMContentLoaded", function(){

  document.querySelectorAll(".filter-item").forEach(btn => {
  btn.addEventListener("click", function(){
    const group = this.closest(".filter-group");
    group.classList.toggle("active");
  });
});

  const openBtn = document.querySelector(".left-btn-filter-open");  // 필터 버튼
  const panel = document.querySelector(".filter-panel");
  const overlay = document.querySelector(".overlay");
  const closeBtn = document.querySelector(".filter-close");
 
    // 필터 열릴 때   
  function openFilter(){
    panel.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }

    // 필터 닫힐 떄
  function closeFilter(){
    panel.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  openBtn.addEventListener("click", openFilter);
  closeBtn.addEventListener("click", closeFilter);
  overlay.addEventListener("click", closeFilter);

  // ESC로 닫기 (선택)
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape") closeFilter();
  });
});

/* 필터 - 컬러 - 컬러 선택된 거 테두리 주기 */
   document.querySelectorAll(".color-item").forEach(btn => {
  btn.addEventListener("click", function(){
    this.classList.toggle("active");
  });
});

/* 신상품 카테고리 신발.의류.용품 선택시 해당 제품만 표시 (해당 안되는 걸 가려버림) */
    document.addEventListener("DOMContentLoaded", function(){
  const tabs = document.querySelectorAll(".tab");
  const items = document.querySelectorAll(".card-link"); // ✅ a 기준

  tabs.forEach(tab => {
    tab.addEventListener("click", function(){
      const filter = this.dataset.filter;

      // 탭 active 표시(원하면)
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      // a(그리드 아이템) 자체를 숨긴다
      items.forEach(aTag => {
        const card = aTag.querySelector(".card");   // a 안의 카드 찾기
        const cat = card.dataset.cat;

        if(cat === filter){
          aTag.classList.remove("is-hidden");
        }else{
          aTag.classList.add("is-hidden");
        }
      });
    });
  });
});

/* 카테고리 별 보기 했다가 다시 12개 보이게 하기 - 모두 표시 버튼 이용 */
     document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const items = document.querySelectorAll(".card-link"); // a 기준
  const showAllBtn = document.querySelector(".more-pro-gold"); // 모두표시 버튼

  function showAll(){
    // 카드 전부 보이기
    items.forEach(aTag => aTag.classList.remove("is-hidden"));

    // 탭 active 해제(원하면)
    tabs.forEach(t => t.classList.remove("active"));
  }

  // 탭 클릭 시 필터
  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const filter = this.dataset.filter;

      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      items.forEach(aTag => {
        const card = aTag.querySelector(".card");
        const cat = card.dataset.cat;

        if (cat === filter) aTag.classList.remove("is-hidden");
        else aTag.classList.add("is-hidden");
      });
    });
  });

  // 모두 표시(202) 누르면 전체 보기로
  showAllBtn.addEventListener("click", function(){
    showAll();
  });
});

/* 정렬 아이콘 누르면 2개보기 / 4개보기 */
    document.addEventListener("DOMContentLoaded", function(){

    const list = document.querySelector(".product-list");

    const btn2 = document.querySelector(".view-btn-2");
    const btn4 = document.querySelector(".view-btn-4");

    btn2.addEventListener("click", function(){
        list.classList.add("two");

        btn2.classList.add("active");
        btn4.classList.remove("active");
    });

    btn4.addEventListener("click", function(){
        list.classList.remove("two");

        btn4.classList.add("active");
        btn2.classList.remove("active");
    });
});

/* 상품 사진 화살표 누르면 다음 사진으로 넘어가게 하기 */
    document.addEventListener("DOMContentLoaded", function(){

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const img = card.querySelector(".product-img");
        const leftBtn = card.querySelector(".left");
        const rightBtn = card.querySelector(".right");

        const images = [img.src];
        let k = 1;
        while (img.dataset["img" + k]) {      // img1, img2, img3... 있는 동안
            images.push(img.dataset["img" + k]);
            k++;
        }

        // 제품 이미지 1장이라면 (선택)
        if (images.length <= 1) {
            leftBtn.style.display = "none";
            rightBtn.style.display = "none";
            return; // 이벤트도 안 붙이게
            }


        let currentIndex = 0;
        // 슬라이드용 next 이미지(한 번만 생성)
        const nextImg = document.createElement("img");
        nextImg.className = "product-img next";
        nextImg.alt = "";
        nextImg.style.transform = "translateX(100%)"; // 기본은 오른쪽 밖
        img.parentElement.appendChild(nextImg);

        let isAnimating = false;

        // 넘길 곳 없으면 버튼 비활성화
        function updateButtons(){
        if(currentIndex === 0){
            leftBtn.classList.add("disabled");
            leftBtn.disabled = true;
        }else{
            leftBtn.classList.remove("disabled");
            leftBtn.disabled = false;
        }

        if(currentIndex === images.length - 1){
            rightBtn.classList.add("disabled");
            rightBtn.disabled = true;
        }else{
            rightBtn.classList.remove("disabled");
            rightBtn.disabled = false;
        }
        }

        updateButtons();

        // 슬라이드용 
        function slideTo(newIndex, dir){
        if (isAnimating) return;
        isAnimating = true;

        // dir: "right"면 다음이 오른쪽에서 들어옴, "left"면 왼쪽에서 들어옴
        nextImg.src = images[newIndex];

        // 시작 위치 세팅
        nextImg.style.transition = "none";
        img.style.transition = "none";

        if(dir === "right"){
            nextImg.style.transform = "translateX(100%)"; // 오른쪽 밖
        }else{
            nextImg.style.transform = "translateX(-100%)"; // 왼쪽 밖
        }
        img.style.transform = "translateX(0)";

        // 강제로 한 프레임 적용
        requestAnimationFrame(() => {
            // 트랜지션 다시 켜고 이동
            nextImg.style.transition = "transform 0.25s ease";
            img.style.transition = "transform 0.25s ease";

            if(dir === "right"){
            img.style.transform = "translateX(-100%)";   // 현재 이미지는 왼쪽으로 나감
            nextImg.style.transform = "translateX(0)";   // 다음 이미지는 중앙으로
            }else{
            img.style.transform = "translateX(100%)";    // 현재 이미지는 오른쪽으로 나감
            nextImg.style.transform = "translateX(0)";
            }

            // 애니메이션 끝나면 정리
            setTimeout(() => {
            img.src = images[newIndex];
            img.style.transition = "none";
            img.style.transform = "translateX(0)";

            // nextImg는 다시 밖으로 보내기(기본 오른쪽)
            nextImg.style.transition = "none";
            nextImg.style.transform = "translateX(100%)";

            currentIndex = newIndex;
            updateButtons();
            isAnimating = false;
            }, 260);
          });
        }

        // 오른쪽 버튼
        rightBtn.addEventListener("click", function(e){
        e.stopPropagation();

        if(currentIndex >= images.length - 1) return;
        slideTo(currentIndex + 1, "right");
        });
        
 
        // 왼쪽 버튼
        leftBtn.addEventListener("click", function(e){
        e.stopPropagation();

        if(currentIndex <= 0) return;
        slideTo(currentIndex - 1, "left");
        });

    });
});

/* 마음에 들어요 하트 표시 */
   const hearts = document.querySelectorAll(".wish");

  for(let i = 0; i < hearts.length; i++){
    hearts[i].addEventListener("click", function(){

      // active 클래스 토글
      this.classList.toggle("active");

      // 하트 모양 변경
      if(this.classList.contains("active")){
        this.innerText = "♥";
      }else{
        this.innerText = "♡";
      }

    });
}
