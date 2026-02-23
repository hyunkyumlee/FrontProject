 

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
