const btn = document.querySelector(".plusList")
const itemList = document.querySelectorAll(".storeList ul li");
let cnt = 14;
// 버튼 눌렀을때 리스트를 15개씩 display : "none" 에서 display: "block" 으로 바꿔주고, 만약 전체 리스트가 화면에 나오면 버튼삭제
btn.addEventListener("click", () => {
    const plusCnt = 15;
    for(i=0; i<plusCnt; i++){
        if(cnt > itemList.length-1){ 
            btn.remove()
        }else{
            itemList[cnt].style.display = "block"
            cnt += 1;
        }
    }
})