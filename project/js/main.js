document.addEventListener ("DOMContentLoaded", function(){
       // 언어 선택 모달 코드
    const langBtn = document.querySelector(".footer-lang");
    const modal = document.querySelector(".lang-modal");
    const closeBtn = document.querySelector(".close-btn");

    if(langBtn && modal && closeBtn){

        // 열기
        langBtn.addEventListener("click", function(){
            modal.classList.add("active");
        });

        // 닫기 버튼
        closeBtn.addEventListener("click", function(){
            modal.classList.remove("active");
        });

    }
});