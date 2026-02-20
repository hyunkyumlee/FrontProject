//한국&글로벌 탭
        const history_kr = document.getElementsByClassName("history_kr");
        const history_gl = document.getElementsByClassName("history_gl");

        //한국 탭
        const subtabMn_2020 = document.getElementsByClassName("subtabMn_2020");
        const subtabMn_2010 = document.getElementsByClassName("subtabMn_2010");
        const subtabMn_2000 = document.getElementsByClassName("subtabMn_2000");
        const subtabMn_1990 = document.getElementsByClassName("subtabMn_1990");
        //한국 년도별 페이지
        const tab_year_kr = document.getElementById("tab_year_kr")

        const historyList_kr_2020 = document.getElementById("historyList_kr_2020");
        const historyList_kr_2010 = document.getElementById("historyList_kr_2010");
        const historyList_kr_2000 = document.getElementById("historyList_kr_2000");
        const historyList_kr_1990 = document.getElementById("historyList_kr_1990");

        //글로벌 탭
        const gl_subtabMn_2000 = document.getElementsByClassName("gl_subtabMn_2000");
        const gl_subtabMn_1900 = document.getElementsByClassName("gl_subtabMn_1900");
        //글로벌 년도별 페이지
        const tab_year_gl = document.getElementById("tab_year_gl")

        const historyList_gl_2000 = document.getElementById("historyList_gl_2000");
        const historyList_gl_1900 = document.getElementById("historyList_gl_1900");

        function history_kr_click() {
            history_kr[0].classList.add("brandintro_on");
            history_gl[0].classList.remove("brandintro_on");
            tab_year_kr.classList.add("on");
            tab_year_gl.classList.remove("on");

        }

        function history_gl_click() {
            history_gl[0].classList.add("brandintro_on");
            history_kr[0].classList.remove("brandintro_on");
            tab_year_gl.classList.add("on");
            tab_year_kr.classList.remove("on");
        }


        function tab_kr_2020() {
            subtabMn_2020[0].classList.add("historyTab_button_on")
            subtabMn_2010[0].classList.remove("historyTab_button_on")
            subtabMn_2000[0].classList.remove("historyTab_button_on")
            subtabMn_1990[0].classList.remove("historyTab_button_on")

            historyList_kr_2020.classList.add("on")
            historyList_kr_2010.classList.remove("on")
            historyList_kr_2000.classList.remove("on")
            historyList_kr_1990.classList.remove("on")
        }
        function tab_kr_2010() {
            subtabMn_2010[0].classList.add("historyTab_button_on")
            subtabMn_2020[0].classList.remove("historyTab_button_on")
            subtabMn_2000[0].classList.remove("historyTab_button_on")
            subtabMn_1990[0].classList.remove("historyTab_button_on")
            historyList_kr_2010.classList.add("on")
            historyList_kr_2020.classList.remove("on")
            historyList_kr_2000.classList.remove("on")
            historyList_kr_1990.classList.remove("on")
        }

        function tab_kr_2000() {
            subtabMn_2000[0].classList.add("historyTab_button_on")
            subtabMn_2020[0].classList.remove("historyTab_button_on")
            subtabMn_2010[0].classList.remove("historyTab_button_on")
            subtabMn_1990[0].classList.remove("historyTab_button_on")
            historyList_kr_2000.classList.add("on")
            historyList_kr_2020.classList.remove("on")
            historyList_kr_2010.classList.remove("on")
            historyList_kr_1990.classList.remove("on")
        }

        function tab_kr_1990() {
            subtabMn_1990[0].classList.add("historyTab_button_on")
            subtabMn_2020[0].classList.remove("historyTab_button_on")
            subtabMn_2010[0].classList.remove("historyTab_button_on")
            subtabMn_2000[0].classList.remove("historyTab_button_on")
            historyList_kr_1990.classList.add("on")
            historyList_kr_2020.classList.remove("on")
            historyList_kr_2010.classList.remove("on")
            historyList_kr_2000.classList.remove("on")
        }

        function tab_gl_2000() {
            gl_subtabMn_2000[0].classList.add("historyTab_button_on")
            gl_subtabMn_1900[0].classList.remove("historyTab_button_on")
            historyList_gl_2000.classList.add("on")
            historyList_gl_1900.classList.remove("on")
        }

        function tab_gl_1900() {
            gl_subtabMn_1900[0].classList.add("historyTab_button_on")
            gl_subtabMn_2000[0].classList.remove("historyTab_button_on")
            historyList_gl_1900.classList.add("on")
            historyList_gl_2000.classList.remove("on")
        }