window.addEventListener('scroll', function() {
    const fixedTag = this.document.querySelector(".fixedTag")
    // 현재 보이는 뷰포트 높이
    const windowHeight = window.innerHeight;
    // 현재 스크롤 위치 (Y축)
    const scrollY = window.scrollY || document.documentElement.scrollTop; // IE 호환성을 위한 fallback
    // 페이지 전체 높이
    const pageHeight = document.documentElement.scrollHeight;
    // 현재 뷰포트 높이 + 스크롤된 위치가 footer에 닿았을 때 class 부여/제거 실행
    if (windowHeight + scrollY >= pageHeight - 250) {
        fixedTag.classList.add("end")
    } else {
        fixedTag.classList.remove("end")
    }
});
//top클래스가 부여된 버튼을 불러와 클릭되었을때 스크롤을 최상단으로 부드럽게 올림
const btnTop = document.querySelector(".top")
btnTop.addEventListener("click", () => {
    window.scrollTo({top : 0, behavior: 'smooth'});
})

// 현재 페이지 경로 가져오기
const scripts = document.getElementsByTagName("script");
let scriptSrc = "";

for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.includes("script.js")) {
        scriptSrc = scripts[i].src;
        break;
    }
}
if (!scriptSrc) {
    console.error("script.js를 찾을 수 없습니다.");
}
const scriptDir = scriptSrc.substring(0, scriptSrc.lastIndexOf("/"));

const img = document.querySelector(".fixedTag a img");
img.src = `${scriptDir}/../images/burger.png`;
img.alt = "품질 이야기";

const fixedTagA = document.querySelector('.fixedTag a');
fixedTagA.href = `${scriptDir}/../html/story/restaurantstep1.html`;