

document.addEventListener("DOMContentLoaded", function(){

    const slider = document.querySelector(".slider");
    let cards = document.querySelectorAll(".img-card");

    const leftBtn = document.querySelector(".left");
    const rightBtn = document.querySelector(".right");

    const cardWidth = 400;
    const gap = 10;
    const moveAmount = cardWidth + gap;
    const offset = moveAmount / 2;

    /* ⭐ 앞뒤에 복제 카드 추가 */
    const firstClones = [];
    const lastClones = [];

    for(let i = 0; i < 3; i++){
        firstClones.push(cards[i].cloneNode(true));
        lastClones.push(cards[cards.length - 1 - i].cloneNode(true));
    }

    firstClones.forEach(clone => slider.appendChild(clone));
    lastClones.reverse().forEach(clone => slider.prepend(clone));

    cards = document.querySelectorAll(".img-card");

    let index = 3;  // ⭐ 복제된 3개 때문에 시작은 3

    slider.style.transform =
        `translateX(-${offset + moveAmount * index}px)`;

    function updateActiveCards() {
        cards.forEach(card => card.classList.remove("active"));

        for(let i = index + 1; i <= index + 3; i++){
            if(cards[i]){
                cards[i].classList.add("active");
            }
        }
    }

    updateActiveCards();

    rightBtn.addEventListener("click", () => {
        index++;
        slider.style.transition = "transform 0.5s ease";
        slider.style.transform =
            `translateX(-${offset + moveAmount * index}px)`;

        updateActiveCards();
    });

    leftBtn.addEventListener("click", () => {
        index--;
        slider.style.transition = "transform 0.5s ease";
        slider.style.transform =
            `translateX(-${offset + moveAmount * index}px)`;

        updateActiveCards();
    });

    /* ⭐ 끝에 도달하면 순간이동 */
    slider.addEventListener("transitionend", () => {

        if(index >= cards.length - 3){
            slider.style.transition = "none";
            index = 3;
            slider.style.transform =
                `translateX(-${offset + moveAmount * index}px)`;
        }

        if(index <= 2){
            slider.style.transition = "none";
            index = cards.length - 6;
            slider.style.transform =
                `translateX(-${offset + moveAmount * index}px)`;
        }

        updateActiveCards();
    });

    // 언어 선택 모달 코드
    const langBtn = document.querySelector(".footer-lang");
    const modal = document.querySelector(".lang-modal");
    const closeBtn = document.querySelector(".close-btn");

    if(langBtn && modal && closeBtn){

        // 🔽 열기
        langBtn.addEventListener("click", function(){
            modal.classList.add("active");
        });

        // ❌ 닫기 버튼
        closeBtn.addEventListener("click", function(){
            modal.classList.remove("active");
        });

        // 🔲 배경 클릭 시 닫기
        modal.addEventListener("click", function(e){
            if(e.target === modal){
                modal.classList.remove("active");
            }
        });

    }

});

