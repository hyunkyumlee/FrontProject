     /*
     const social_Tab_1 = document.getElementById("social_Tab_1");
          const social_Tab_2 = document.getElementById("social_Tab_2");
          const social_Tab_3 = document.getElementById("social_Tab_3");
          const social_Tab_4 = document.getElementById("social_Tab_4");

          const social_tab_bg_1 = document.getElementById("social_tab_bg_1");
          const social_tab_bg_2 = document.getElementById("social_tab_bg_2");
          const tab_01 = document.getElementById("tab_01")
          const tab_02 = document.getElementById("tab_02")
          const tab_03 = document.getElementById("tab_03")
          const tab_04 = document.getElementById("tab_04")

          function tab_1(){
               tab_01.classList.add("on")
               tab_02.classList.remove("on")
               tab_03.classList.remove("on")
               tab_04.classList.remove("on")

               social_Tab_1.classList.add("on");
               social_Tab_2.classList.remove("on");
               social_Tab_3.classList.remove("on");
               social_Tab_4.classList.remove("on");

               social_tab_bg_1.classList.add("on");
               social_tab_bg_2.classList.remove("on");
          }

          function tab_2(){
          tab_02.classList.add("on")
               tab_01.classList.remove("on")
               tab_03.classList.remove("on")
               tab_04.classList.remove("on")

               social_Tab_2.classList.add("on");
               social_Tab_1.classList.remove("on");
               social_Tab_3.classList.remove("on");
               social_Tab_4.classList.remove("on");

               social_tab_bg_2.classList.add("on");
               social_tab_bg_1.classList.remove("on");
          }

          function tab_3(){
          tab_03.classList.add("on")
               tab_01.classList.remove("on")
               tab_02.classList.remove("on")
               tab_04.classList.remove("on")

               social_Tab_3.classList.add("on");
               social_Tab_1.classList.remove("on");
               social_Tab_2.classList.remove("on");
               social_Tab_4.classList.remove("on");

               social_tab_bg_1.classList.add("on");
               social_tab_bg_2.classList.remove("on");
          }

          function tab_4(){
          tab_04.classList.add("on")
               tab_01.classList.remove("on")
               tab_02.classList.remove("on")
               tab_03.classList.remove("on")
               social_Tab_4.classList.add("on");
               social_Tab_1.classList.remove("on");
               social_Tab_2.classList.remove("on");
               social_Tab_3.classList.remove("on");

               social_tab_bg_1.classList.add("on");
               social_tab_bg_2.classList.remove("on");
          }

          */

// 구상
//  클릭 가능한 탭 버튼은 4개
//  탭 컨텐츠도 4개
//  활성화 해야하는 백스토리란 2개.
// 버튼/컨텐츠의 번호(n)를 받아서 해당 번호만 'on' 클래스를 붙이고 나머지는 제거

// 활성화할 대상들의 번호 목록
const tabIds = [1, 2, 3, 4];
const btnIds = [1, 2, 3, 4];
const bgIds  = [1, 2]; // 배경 문구는 2가지(1 or 2)

//  탭 버튼 ID:    social_Tab_{n}
//  탭 컨텐츠 ID:  tab_{n}
//  배경 문구 ID:  social_tab_bg_{n}
const tab = n => document.getElementById(`tab_${n}`);
const btn = n => document.getElementById(`social_Tab_${n}`);
const bg  = n => document.getElementById(`social_tab_bg_${n}`);

// 번호 n의 버튼/탭/배경을 활성화하고, 나머지는 비활성화
function active(n) {
  // 탭 컨텐츠 on/off
  //  - classList.toggle('on', 조건)
  //    -> 조건이 true면 on 추가, false면 on 제거
  tabIds.forEach(id => tab(id).classList.toggle('on', id === n));

  // 탭 버튼 on/off
  btnIds.forEach(id => btn(id).classList.toggle('on', id === n));

  // 배경 on/off
  //  - 규칙: n이 2이면 배경2를, 그 외는 배경1을 보여준다.
  const bgActive = (n === 2) ? 2 : 1;
  bgIds.forEach(id => bg(id).classList.toggle('on', id === bgActive));
}
// 초기 상태(1번 탭 활성화)
active(1);