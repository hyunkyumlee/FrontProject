// header 불러오기
document.addEventListener("DOMContentLoaded", function() {
  // script.js를 로드한 script 태그를 찾음
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
    return;
  }

  const scriptDir = scriptSrc.substring(0, scriptSrc.lastIndexOf("/"));

  // header와 footer의 경로 설정
  const headerPath = `${scriptDir}/../html/header.html`;
  const footerPath = `${scriptDir}/../html/footer.html`;
  const fixedTagPath = `${scriptDir}/../html/fixedTag.html`;

  fetch(headerPath)
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      const script = document.createElement("script");
      script.src = `${scriptDir}/header.js`;
      document.body.appendChild(script);
    });

  // footer 불러오기
  fetch(footerPath)
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;

      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = `${scriptDir}/../css/footer.css`;
      document.head.appendChild(cssLink);

      const script = document.createElement("script");
      script.src = `${scriptDir}/footer.js`;
      document.body.appendChild(script);
    });
    
  // fixedTag 불러오기
  fetch(fixedTagPath)
    .then(res => res.text())
    .then(data => {
      document.getElementById("fixedTag").innerHTML = data;

      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = `${scriptDir}/../css/fixedTag.css`;
      cssLink.href = `${scriptDir}/../css/fixedTag.css`;
      document.head.appendChild(cssLink);

      const script = document.createElement("script");
      script.src = `${scriptDir}/fixedTag.js`;
      document.body.appendChild(script);
    });
});