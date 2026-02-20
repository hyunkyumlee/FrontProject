/*
            const global_mc_button_1 = document.getElementById("global_mc_button_1");
            const global_mc_button_2 = document.getElementById("global_mc_button_2");
            const global_mc_button_3 = document.getElementById("global_mc_button_3");
            const global_mc_button_4 = document.getElementById("global_mc_button_4");
            const global_mc_button_5 = document.getElementById("global_mc_button_5");

            const tab01 = document.getElementById("tab01");
            const tab02 = document.getElementById("tab02");
            const tab03 = document.getElementById("tab03");
            const tab04 = document.getElementById("tab04");
            const tab05 = document.getElementById("tab05");


            function global_mc_1() {
                global_mc_button_1.classList.add("on");
                global_mc_button_2.classList.remove("on");
                global_mc_button_3.classList.remove("on");
                global_mc_button_4.classList.remove("on");
                global_mc_button_5.classList.remove("on");

                tab01.classList.add("on")
                tab02.classList.remove("on")
                tab03.classList.remove("on")
                tab04.classList.remove("on")
                tab05.classList.remove("on")
            }

            function global_mc_2() {
                global_mc_button_2.classList.add("on");
                global_mc_button_1.classList.remove("on");
                global_mc_button_3.classList.remove("on");
                global_mc_button_4.classList.remove("on");
                global_mc_button_5.classList.remove("on");

                tab02.classList.add("on")
                tab01.classList.remove("on")
                tab03.classList.remove("on")
                tab04.classList.remove("on")
                tab05.classList.remove("on")
            }

            function global_mc_3() {
                global_mc_button_3.classList.add("on");
                global_mc_button_1.classList.remove("on");
                global_mc_button_2.classList.remove("on");
                global_mc_button_4.classList.remove("on");
                global_mc_button_5.classList.remove("on");

                tab03.classList.add("on")
                tab01.classList.remove("on")
                tab02.classList.remove("on")
                tab04.classList.remove("on")
                tab05.classList.remove("on")
            }

            function global_mc_4() {
                global_mc_button_4.classList.add("on");
                global_mc_button_1.classList.remove("on");
                global_mc_button_2.classList.remove("on");
                global_mc_button_3.classList.remove("on");
                global_mc_button_5.classList.remove("on");

                tab04.classList.add("on")
                tab01.classList.remove("on")
                tab02.classList.remove("on")
                tab03.classList.remove("on")
                tab05.classList.remove("on")
            }

            function global_mc_5() {
                global_mc_button_5.classList.add("on");
                global_mc_button_1.classList.remove("on");
                global_mc_button_2.classList.remove("on");
                global_mc_button_3.classList.remove("on");
                global_mc_button_4.classList.remove("on");

                tab05.classList.add("on")
                tab01.classList.remove("on")
                tab02.classList.remove("on")
                tab03.classList.remove("on")
                tab04.classList.remove("on")
            }
*/

//구상
//클릭이벤트는 총 5개.
//탭 또한 5개.
//클릭이벤트에 번호를 부여하고 해당 번호를 입력받아 해당 탭의 번호에 해당하는 페이지를 활성회


//활성화할 페이지의 번호를 배열로 저장
  const btnNum = ['1','2','3','4','5'];
  //btn은 id =global_mc_button_ 의 {문자열} 의 함수 n
  const btn = n => document.getElementById(`global_mc_button_${n}`);
  //tab은 id =tab0 의 {문자열} 의 함수 n
  const tab = n => document.getElementById(`tab0${n}`);

  // 번호 n의 버튼/탭을 활성화하고, 나머지는 비활성화
  function active(n) {
    //btnNum배열의 각 요소에 i함수를 실행하여 반복호출한다.
    btnNum.forEach(i => {
        //1~5까지 반복호출 했을 때 조건 i 가 n이라면 true 이며 on클래스를 togle로 추가.
        //조건 i 가 n이 아니라면 false로 on클래스를 togle로 제거.
        //결국 발생한 클릭이벤트와 같은 번호의 페이지를 활성화.
      btn(i).classList.toggle('on', i == n);
      tab(i).classList.toggle('on', i == n);
    });
  }

  // 초기 페이지
  active('1');

