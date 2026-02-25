        /*화면 슬라이드*/
        let index = 0;
        const itemshow = 5;

        function updateslider(){
            const track = document.querySelector(".track");
            const movepercent = index * (100 / itemshow);
            track.style.transform = `translateX(-${movepercent}%)`
        }
        function prev(){
            const listcount = document.querySelectorAll(".list").length;

            if (index > 0){
                index--;
                
            }else{
                index = listcount - itemshow;
            }
            updateslider();
        }

        function next(){
            const listcount = document.querySelectorAll(".list").length;

            if(index < listcount-itemshow){
                index++;
                
            }
            else{
                   index = 0;
            }
            updateslider();
        }
        
    
    window.addEventListener("DOMContentLoaded", function() {
    // 저장소에서 'id'와 '수량', '사이즈' 정보 가져옴
    let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    
    // 저장소의 ID를 바탕으로 data.js(products)에서 상세 정보 합치기
    let cart = cartStorage.map(storageItem => {
        const productDetail = products.find(p => p.id === storageItem.id);
        return {
            ...productDetail,
            quantity: storageItem.quantity,
            selectedSize: storageItem.selectedSize || "L"
        };
    }).filter(item => item.name); // 혹시 모를 데이터 오류 방지

    const cartContainer = document.querySelector(".cart-list");

    //쿠폰 적용하기 일부 숨기고 나타내기
    const couponheader = document.querySelector(".coupon-header");
    const couponcontent = document.querySelector(".coupon-content");
    const fasolid = document.querySelector(".coupon-header .fa-solid");

    couponheader.addEventListener("click", function(){
        couponcontent.classList.toggle("hide");

        fasolid.classList.toggle("rotate");
    });

    // 장바구니 화면 그리기 함수
    function renderCart() {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p style='font-size:20px; padding:20px;'>장바구니가 비어 있습니다.</p>";
            calc();
            return;
        }

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item-container");

            
            div.innerHTML = `
                <input type="checkbox" class="item-check">
                <div class="div-imgbox">
                    <img src="${item.mainImages[0]}" alt="${item.name}" class="cart-img">
                </div>
                <div class="div-itembox">
                    <p><strong> ${item.name}</strong></p>
                    <p class="gray">사이즈 : ${item.selectedSize}</p>
                    <p class="item-price">가격 : ${(item.price * item.quantity).toLocaleString()}원</p>         
                    <select class="qty-select">
                        ${[...Array(10).keys()].map(i => 
                            `<option value="${i+1}" ${item.quantity === i+1 ? 'selected' : ''}>${i+1}</option>`
                        ).join('')}
                    </select>
                </div>
            `;

            // 수량 변경 이벤트
            const select = div.querySelector(".qty-select");
            select.addEventListener("change", function() {
                item.quantity = Number(select.value);
                updateStorage(); // 스토리지 업데이트
                div.querySelector(".item-price").textContent = `가격 : ${(item.price * item.quantity).toLocaleString()}원`;
                calc();
            });

            cartContainer.appendChild(div);
        });
        calc();
    }

    // 로컬스토리지 동기화 함수
    function updateStorage() {
        const storageData = cart.map(item => ({ id: item.id, quantity: item.quantity, size: item.selectedSize}));
        localStorage.setItem("cart", JSON.stringify(storageData));
    }

    // 금액 계산 logic (기존과 동일하되 연계 데이터 기반)
    function calc() {

        //총 상품 금액(순수 상품 가격 * 수량)
        let total_price = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        //총 상품금액 출력
        document.querySelector(".price").textContent = `${total_price.toLocaleString()}원`;
        
        //할인금액
        let sale_price = 2000;
        if(total_price==0) sale_price = 0;
        document.querySelector(".price1").textContent = `-${sale_price.toLocaleString()}원`;
        
        //배송비(100000원이상, 상품이 없으면 0원. 아니면 배송비 3000원)
        let deliver = (total_price >= 100000 || total_price == 0) ? 0 : 3000;
        document.querySelector(".price_deliver").textContent = `${deliver.toLocaleString()}원`;

        let total_calc = total_price - sale_price + deliver;
        document.querySelector(".price2").textContent = `${total_calc.toLocaleString()}원`;
    }

    //프로그램 작동 확인용
    //     const testData = [
    //         { id: 1, quantity: 1 },
    //         { id: 2, quantity: 3 },
    //         { id: 3, quantity: 2 }
    //     ];

    //     // 로컬스토리지에 저장
    //     localStorage.setItem("cart", JSON.stringify(testData));

    //     // 페이지 새로고침하여 반영 확인
    //     location.reload();


    // 전체 삭제 버튼
    document.querySelector("#clear-cart").addEventListener("click", function(e){
        e.preventDefault();
        
        cart = [];

        localStorage.removeItem("cart");
        
        renderCart();

        calc();
        
    })
    // 선택 삭제 버튼
    document.querySelector("#choice-clear-cart").addEventListener("click", function(e) {
        e.preventDefault();
        const checks = document.querySelectorAll(".item-check");
        cart = cart.filter((item, index) => !checks[index].checked);
        updateStorage();
        renderCart();
    });

    renderCart();
});
       