const cart = [
            {
                id : 1,
                name : "레이스 데이 웨이스트밴드",
                img : "./images/cart/레이스-데이-웨이스트밴드-brRACE-DAY-Waistband.avif",
                cost : 49000,
                quantity : 1
                
            },

            {
                id : 2,
                name : "디비에이트 나이트로 4 와이드 우먼스",
                img : "./images/cart/디비에이트-나이트로-4-와이드-brDeviate-NITRO-4-WIDE.avif",
                cost : 219000,
                quantity : 1
            }
        ];

        localStorage.setItem("cart", JSON.stringify(cart));
        