{
// 현재 페이지 경로 가져오기
const footerScripts = document.getElementsByTagName("script");
let footerScriptSrc = "";

for (let i = 0; i < footerScripts.length; i++) {
  if (footerScripts[i].src.includes("script.js")) {
    footerScriptSrc = footerScripts[i].src;
    break;
  }
}

if (!footerScriptSrc) {
  console.error("script.js를 찾을 수 없습니다.");
}
const footerScriptDir = footerScriptSrc.substring(0, footerScriptSrc.lastIndexOf("/"));


// sns 이미지 동적으로 가져오기
const icoSns = document.querySelectorAll(".footer_fSns a");
icoSns.forEach(el => 
  el.style.setProperty("--fSns--icon", `url(${footerScriptDir}/../images/ico_sns.png)`));


// 한국디지털접근성진흥원 이미지 동적으로 넣기
const webImg = document.querySelector(".web_accessibility a img");
webImg.src = `${footerScriptDir}/../images/web_accessibility.png`;


// ISMS 이미지 동적으로 넣기
const ismsImg = document.querySelector(".footer_icon img");
ismsImg.src = `${footerScriptDir}/../images/web_isms.png`;


const footer_links = document.querySelectorAll(".footer_link a");
footer_links.forEach(footer_link => {
  const footer_link_oldHref = footer_link.getAttribute('href');
  console.log(footerScriptDir);
  console.log(footer_link_oldHref);
  console.log(`${footerScriptDir}/../html/${footer_link_oldHref}`);
  footer_link.href = `${footerScriptDir}/../html/${footer_link_oldHref}`;
});
}