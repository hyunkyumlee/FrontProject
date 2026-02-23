const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3, // 캡처 화면처럼 다음 상품이 살짝 보이게 3.5개 설정
    spaceBetween: 20,   // 상품 사이 간격
    speed: 1000,
    navigation: {       // 화살표 버튼 활성화
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // 반응형 설정 (화면이 작아지면 개수 조절)
    breakpoints: {
        768: { slidesPerView: 3 },
        320: { slidesPerView: 1.5 }
    }
});