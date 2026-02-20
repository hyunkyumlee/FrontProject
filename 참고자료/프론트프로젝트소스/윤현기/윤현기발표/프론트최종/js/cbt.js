//퀴즈 객체
const quizs = [
  {
    title:
      "1. HTML5 표준에 따라 HTML 페이지에 반드시 있어야 하는 태그가 아닌 것은?",
    select_1: "head",
    select_2: "img",
    select_3: "body",
    select_4: "!doctype html",
    correct: "2",
  },
  {
    title: "2. 다음 중 블록형 태그가 아닌 것은?",
    select_1: "div",
    select_2: "p",
    select_3: "h1",
    select_4: "img",
    correct: "4",
  },
  {
    title:
      "3. input 태그에 type 속성 중 여러 개의 옵션 중 한 가지만 선택이 가능한 버튼 속성은?",
    select_1: "text",
    select_2: "checkbox",
    select_3: "range",
    select_4: "radio",
    correct: "4",
  },
  {
    title: "4. CSS에 표준 단위 중 픽셀 수를 나타내는 단위는?",
    select_1: "em",
    select_2: "cm",
    select_3: "px",
    select_4: "deg",
    correct: "3",
  },
  {
    title: "5. position 프로퍼티에서 요소를 화면에 고정시키는 것은?",
    select_1: "fixed",
    select_2: "relative",
    select_3: "absolute",
    select_4: "static",
    correct: "1",
  },
  {
    title: "6. 박스의 바깥 여백을 제어하는 프로퍼티는?",
    select_1: "width",
    select_2: "height",
    select_3: "margin",
    select_4: "padding",
    correct: "3",
  },
  {
    title: "7. 자바스크립트 언어의 구문이 아닌 것은?",
    select_1: "if",
    select_2: "loop",
    select_3: "switch",
    select_4: "continue",
    correct: "2",
  },
  {
    title:
      "8. const arr = ['월', '화', '수', '목', '금', '토', '일']에서 arr[4]의 값은?",
    select_1: "수",
    select_2: "목",
    select_3: "금",
    select_4: "토",
    correct: "3",
  },
  {
    title: "9. class 속성으로 DOM 객체를 찾는 메서드는?",
    select_1: "getElementsByClassName()",
    select_2: "getElementById()",
    select_3: "getElementsByName()",
    select_4: "getElementByTagName()",
    correct: "1",
  },
  {
    title: "10. 산술 연산자가 아닌 것은?",
    select_1: "+",
    select_2: "/",
    select_3: "%",
    select_4: "=",
    correct: "4",
  },
];

const successImg = document.querySelector(".successImg"); // 축하 이미지 지정

const btnDiv = document.querySelector(".btnDiv"); //버튼 구간 지정
const explainDiv = document.querySelector(".explainWrap"); //설명 구간 지정
const timerDiv = document.querySelector(".timerDiv"); //타이머 구간 지정
const quizDiv = document.querySelector(".quizDiv"); //퀴즈 구간 지정
const wrongNoteDiv = document.querySelector(".wrongNoteDiv"); //결과 화면 지정
const returnBtn = document.querySelector(".returnBtn"); //재시험 버튼 지정

const wrongNote = []; //오답 노트
const wrongSelect = []; //틀린 문제 답

let quizIndex = 0; //퀴즈 인덱스
let currectNum = 0; //맞춘 횟수
let timer; //타이머

const alarm = new Audio("./audio/alarm.mp3"); //타이머 알람 오디오 객체 생성

/*퀴즈 표시 함수*/
function showQuiz() {
  quizDiv.innerHTML = `
          <h3>${quizs[quizIndex].title}</h3>
          <form>
              <label for="check1"><input name="select" type="radio" value="1" id="check1" /> ${quizs[quizIndex].select_1}</label><br />
              <label for="check2"><input name="select" type="radio" value="2" id="check2" /> ${quizs[quizIndex].select_2}</label><br />
              <label for="check3"><input name="select" type="radio" value="3" id="check3" /> ${quizs[quizIndex].select_3}</label><br />
              <label for="check4"><input name="select" type="radio" value="4" id="check4" /> ${quizs[quizIndex].select_4}</label><br />
              <button type="button" onclick="check()">다음</button>
          </form>
      `;
}

/*정답 확인*/
function check() {
  // 라디오 버튼 값 가져오기
  const selectRadio = document.getElementsByName("select");
  let radioValue = null;

  // 체크된 라디오 버튼의 값만 확인
  selectRadio.forEach((node) => {
    if (node.checked) {
      radioValue = node.value;
    }
  });

  // 선택한 값이 없을 경우 (라디오 박스 미선택)
  if (radioValue === null) {
    wrongNote.push(quizs[quizIndex]); // 틀린 문제를 오답노트 배열에 저장
    wrongSelect.push("X"); // 찍은 답이 없음을 표시
  } else if (radioValue === quizs[quizIndex].correct) {
    // 정답인 경우
    currectNum++; // 맞춘 횟수 증가
  } else {
    // 오답인 경우
    wrongNote.push(quizs[quizIndex]); // 틀린 문제를 오답노트 배열에 저장
    wrongSelect.push(parseInt(radioValue)); // 틀린 문제의 선택된 답 저장
  }

  quizIndex++; // 다음 문제로 이동

  // 문제 갯수만큼 실행
  if (quizIndex < quizs.length) {
    showQuiz();
  } else {
    //문제를 다 풀었을 경우
    if (currectNum !== 10) {
      //오답이 있을 경우
      wrongNoteDiv.style.display = "block"; //오답노트 구역 화면에 표시
    } else if (currectNum === 10) {
      //모두 정답일 경우
      successImg.style.display = "block"; //축하 이미지 표시
      setTimeout(() => {
        successImg.style.display = "none"; // 1초 후 다시 none으로 변경
      }, 2500);
    }

    timerDiv.style.display = "none"; //타이머 구역 none
    returnBtn.style.display = "block"; //다시보기 버튼 화면에 표시

    quizDiv.innerHTML = `<p>당신의 점수는 <span>${
      currectNum * 10
    }</span>점입니다.</p>`; //점수 표시

    if (wrongNote.length === 0) {
      quizDiv.style.marginTop = "150px";
    }

    clearInterval(timer); //타이머 멈추기
    showResult(); //퀴즈 결과 보여주기 함수 실행
  }
}

/*퀴즈 결과 보여주기 함수*/
function showResult() {
  for (let i = 0; i < wrongNote.length; i++) {
    wrongNoteDiv.innerHTML += `
        <h3>${wrongNote[i].title}</h3>
        <ul>
            <li style="color:${wrongSelect[i] === 1 ? "red" : "black"}">
              1. ${wrongNote[i].select_1}
            </li>
            <li style="color:${wrongSelect[i] === 2 ? "red" : "black"}">
              2. ${wrongNote[i].select_2}
            </li>
            <li style="color:${wrongSelect[i] === 3 ? "red" : "black"}">
              3. ${wrongNote[i].select_3}
            </li>
            <li style="color:${wrongSelect[i] === 4 ? "red" : "black"}">
              4. ${wrongNote[i].select_4}
            </li>
        </ul>
        <p>
          정답 : [${wrongNote[i].correct}] / 당신이 고른 답 : [${
      wrongSelect[i]
    }]
        </p>
    `;
  }
}

/*타이머 함수(시간, 타이머 줄어드는 속도, 남은 시간 표시)*/
function execTimer(countNum, widthNum, remainNum) {
  btnDiv.style.display = "none"; //버튼 구역 none;
  explainDiv.style.display = "none"; //설명 구역 none
  quizDiv.style.display = "block"; //퀴즈 구역 화면에 표시
  timerDiv.style.display = "block"; //타이머 구역 화면에 표시

  let timerCount = countNum; //타이머 시간 지정

  //타이머 작동
  timer = setInterval(() => {
    timerCount--; //타이머 1씩 감소
    timerDiv.style.width = `${widthNum * timerCount}px`; //타이머 바 줄이기

    //일정 시간이 지나면 타이머 구역 배경색 바꿈
    if (timerCount === remainNum) timerDiv.style.backgroundColor = "orange";
    if (timerCount === 10) timerDiv.style.backgroundColor = "red";

    //타이머 종료
    if (timerCount <= 0) {
      clearInterval(timer); //타이머 멈추기
      alarm.play(); //알람 재생

      //미처 풀지 못한 문제들을 모두 오답노트에 저장
      for (let i = quizIndex; i <= quizs.length; i++) {
        wrongNote.push(quizs[i]);
        wrongSelect.push("X");
      }

      timerDiv.style.display = "none"; //타이머 구역 none
      wrongNoteDiv.style.display = "block"; //결과 화면 block
      returnBtn.style.display = "block";

      quizDiv.innerHTML = `<p>당신의 점수는 <span>${
        currectNum * 10
      }</span>점입니다.</p>`; //점수 표시

      showResult(); //퀴즈 결과 보여주기 함수 실행
    }
  }, 1000);
}

/*재시험 버튼*/
function returnExam() {
  window.location.reload(); //페이지 새로 고침
  window.scrollTo({ top: 0 }); //화면 맨 위로 이동
}
