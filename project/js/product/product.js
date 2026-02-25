 
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
      // 필터창 닫을 때 열려있던 카테고리 전부 접기
      panel.querySelectorAll(".filter-group.active").forEach(group => {
      group.classList.remove("active");
    });
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
 document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".product-list .card"); //  카드 기준
  const pageTitle = document.querySelector(".page-title");
  const showAllBtn = document.querySelector(".more-pro-gold");    // 모두 표시(202)
  
  // 클릭한 카테고리 버튼 내용으로 제목도 바뀌기
  function setTitle(text){
    if(pageTitle) pageTitle.textContent = text;
  }
  
  function setVisible(filter) {
    cards.forEach(card => {
      const cat = card.dataset.cat;
      const wrapper = card.closest(".card-link") || card; // a로 감싸졌으면 a를 숨김

      if (!filter || cat === filter) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
  }

  // 탭 클릭 -> 해당 카테고리만
  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const filter = this.dataset.filter;

      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      
      setTitle(this.textContent.trim()); //  제목 변경
      setVisible(filter);
    });
  });  

  // 모두 표시(202) -> 전체 보기
  if (showAllBtn) {
    showAllBtn.addEventListener("click", function () {
      tabs.forEach(t => t.classList.remove("active"));
      setTitle("신상품");     //  제목도 다시 -> 신상품
      setVisible(null); // 전체
    });
  }
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
        
        /* ====== 2색상 hover 썸네일 (간략히보기 위에서는 X) ====== */
          const colorEl = card.querySelector(".color");
          const quickEl = card.querySelector(".quick");

          // "2 색상" 카드만 적용 (1색상은 패스)
          // 공백/개행 대비해서 includes로 체크
          const isTwoColor = colorEl && colorEl.textContent.includes("2");

          if (isTwoColor) {
            // 1) color 영역에 has-thumbs 붙이기(높이 확보용)
            colorEl.classList.add("has-thumbs");

            // 2) 기존 텍스트를 span.color-text로 감싸기 (이미 있으면 패스)
            if (!colorEl.querySelector(".color-text")) {
              const text = colorEl.textContent.trim(); // 예: "2 색상"
              colorEl.textContent = "";

              const textSpan = document.createElement("span");
              textSpan.className = "color-text";
              textSpan.textContent = text;
              colorEl.appendChild(textSpan);
            }

            // 3) 썸네일 컨테이너 만들기 (이미 있으면 패스)
            if (!colorEl.querySelector(".color-thumbs")) {
              const thumbs = document.createElement("div");
              thumbs.className = "color-thumbs";

              // 썸네일 2장: 대표 이미지 + data-img1 (없으면 대표로 대체)
              const t1 = document.createElement("img");
              t1.src = img.src;
              t1.alt = "";

              const t2 = document.createElement("img");
              t2.src = img.dataset.img1 ? img.dataset.img1 : img.src;
              t2.alt = "";

              thumbs.appendChild(t1);
              thumbs.appendChild(t2);
              colorEl.appendChild(thumbs);
            }

            // 4) 카드 hover 시 show-thumbs ON
            //    단, "간략히 보기(.quick)" 위에서는 OFF
            card.addEventListener("mousemove", function (e) {
              const onQuick = e.target.closest(".quick");
              if (onQuick) card.classList.remove("show-thumbs");
              else card.classList.add("show-thumbs");
            });

            card.addEventListener("mouseleave", function () {
              card.classList.remove("show-thumbs");
            });

            // (선택) quick에 마우스 들어오면 확실히 꺼주기
            if (quickEl) {
              quickEl.addEventListener("mouseenter", () => {
                card.classList.remove("show-thumbs");
              });
            }
          }
          /* ====== /2색상 hover 썸네일 ====== */
            
        let currentIndex = 0;

        // 슬라이드용 next 이미지(한 번만 생성)
        const nextImg = document.createElement("img");
        nextImg.className = "product-img next";
        nextImg.alt = "";
        nextImg.style.transform = "translateX(100%)"; // 기본은 오른쪽 밖
        const imgBox = card.querySelector(".img-box");
        imgBox.appendChild(nextImg);

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

/* 2색상인 제품들은 마우스 올리면 2색상 텍스트 자리에 이미지 2개 뜨기 */


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
