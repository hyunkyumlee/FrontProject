const modal = document.querySelectorAll(".crew ul li a");
const modalParent = document.querySelector(".crewStory");
const btn = document.querySelectorAll(".crewStory button");
// 이미지 박스를 클릭했을때 숨겨놓았던 모달창을 띄워줌
modal.forEach((item,index) => {
    item.addEventListener("click", () => {
        let owo = document.querySelector(`.crewStory${index}`);
        modalParent.style.display = "block";
        owo.style.display = "block";
    })
})
// 모달창에 붙어있는 버튼으로, 버튼을 눌렀을 시 다시 모달창이 숨겨지게함
btn.forEach((item, index) => {
    item.addEventListener("click", () => {
        let owo = document.querySelector(`.crewStory${index}`)
        owo.style.display = "none";
        modalParent.style.display = "none";
    })
})