        /*
        
        //페이지 1
        function next() {
            location.href = ("newnotice_item_2.html")
        }
        //페이지2
         function prev() {
            location.href = ("newnotice_item_1.html")
        }

        function next() {
            location.href = ("newnotice_item_3.html")
        }
        //페이지3
        function prev() {
            location.href = ("newnotice_item_2.html")
        }

        function next() {
            location.href = ("newnotice_item_4.html")
        }
        //페이지4
        function prev() {
            location.href = ("newnotice_item_3.html")
        }

        function next() {
            location.href = ("newnotice_item_5.html")
        }
        //페이지5
        function prev() {
            location.href = ("newnotice_item_4.html")
        }
        */
        
    
//위 이벤트를 아래와 같이 변환.

/*코드 구상 방안.
각 페이지 명은 newnotice_item_(i).html 형태로 되어있는 총 5개 html.
그렇다면 해당 경로를 인식하고 i라는 숫자만 읽을 수 있다면 경로 제어가 가능.

현재 페이지 newnotice_item_(i).html를 newnotice_item_(i-1).html 하면 prev()
현재 페이지 newnotice_item_(i).html를 newnotice_item_(i+1).html 하면 next()
*/

//정규표현식을 사용하여 타겟숫자인 i를 추출

    // 현재 페이지 번호를 저장할 변수
    let page;
    //최대 페이지 개수를 지정할 상수
    const TOTAL = 5;
    // 현재창의 url에서 도메인과 주소를 빼고 경로부분만 추출하는 상수 선언. 
    const path = window.location.pathname;


    // location : 브라우저의 URL 관련 정보를 담고 있는 객체(window.location)
    // window   : 현재 브라우저 창
    // pathname : URL에서 도메인 이후 경로 부분만 반환하는 속성
    // match    : 문자열에서 정규 표현식과 일치하는 부분을 찾아 배열로 반환하는 메서드
    /*
        path에서 "newnotice_item_숫자.html" 형태를 찾음.
        (\d+) : 하나 이상의 숫자를 그룹으로 캡처
        \.html$ : ".html"로 끝나는지 확인
        match() 결과 예시:
            "newnotice_item_3.html", // [0] 전체 일치 문자열
            "3",                     // [1] 캡처 그룹: 페이지 번호
            index: 6,                // 일치 시작 위치
            input: "/html/newnotice_item_3.html"
    */
   //변수저장 결과 예시 newnotice_items = ["newnotice_item_3.html", "3"]
    const newnotice_items = path.match(/newnotice_item_(\d+)\.html$/);
    console.log(newnotice_items);

    //newnotice_items를 저장했을 경우
    //배열의 두번째에 저장된 숫자를 10진수로 출력하여 page변수에 저장.
    //실패시 페이지를 추출할 수 없습니다.
    if (newnotice_items) {
    page = parseInt(newnotice_items[1], 10);
    } else {
    console.error("페이지를 추출할 수 없습니다.");
    }

    //next이벤트 발생시
    function next() {
        //page변수에 저장된 숫자가 5 미만이라면 
    if (page < TOTAL) {
        // replace : replace(찾을_값, 바꿀_값)
        //저장된 위치는 = 현재위치(path)에서 replace(page를 찾고, page+1로 바꾼다)
        //정리하면 next 클릭이벤트 발생시 현재페이지 newnotice_item_(i+1)하여 반환한 경로로 이동된다.
        // location.href = path.replace(page, page + 1);
        location.href = path.replace(`newnotice_item_${page}`, `newnotice_item_${page + 1}`);
    }
    }
    //위 와 같음.
    function prev() {
    if (page > 1) {
        // location.href = path.replace(page, page - 1);
        location.href = path.replace(`newnotice_item_${page}`, `newnotice_item_${page - 1}`);
    }
    }
