//- - - - - - - - - - -  ⭐️문서가 로드되면 실행 - - - - - - - - - - - //
document.addEventListener("DOMContentLoaded", () => {
  let date = new Date(); // 현재 날짜 가져오기
  let currYear = date.getFullYear(); // 현재 년도 가져오기
  let currMonth = date.getMonth(); // 현재 월 가져오기

  const daysTag = document.querySelector(".days"); // 날짜 요소 선택
  const currentDate = document.querySelector(".current-date"); // 현재 날짜 요소 선택
  const prevBtn = document.getElementById("prev"); // 이전 버튼 선택
  const nextBtn = document.getElementById("next"); // 다음 버튼 선택
  const todoInput = document.getElementById("todoInput"); // 할일 입력 필드 선택
  const categorySelect = document.getElementById("categorySelect"); // 카테고리 선택 필드 선택
  const addBtn = document.getElementById("addBtn"); // 추가 버튼 선택
  const todoList = document.getElementById("todoList"); // 할일 목록 선택

  let todosByDate = JSON.parse(localStorage.getItem("todosByDate")) || {}; // 로컬 스토리지에서 할일 객체 저장
  let selectedDate = null; // 선택된 날짜 변수 초기화

  // h1 태그에 선택된 날짜를 표시하기 위한 요소 가져오기
  const titleElement = document.querySelector("h1"); // 제목 요소 선택

  const dateText = document.querySelector(".date-text"); // 날짜 텍스트 요소 선택
  const weekdayText = document.querySelector(".weekday"); // 요일 텍스트 요소 선택

  // 요일 배열
  const weekdays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  // ⭐️날짜별 제목을 저장할 객체
  let titlesByDate = JSON.parse(localStorage.getItem("titlesByDate")) || {}; // 로컬 스토리지에서 제목 객체 저장

  // ⭐️제목 저장 함수
  function saveTitle(date, title) {
    titlesByDate[date] = title; // 날짜별 제목 저장
    localStorage.setItem("titlesByDate", JSON.stringify(titlesByDate)); // 로컬 스토리지에 제목 객체 저장
  }

  // 제목 불러오기 함수
  function loadTitle(date) {
    return titlesByDate[date] || "제목 없음";
  }

  // 날짜 선택 시 제목 업데이트
  function updateTitleForDate(dateString) {
    const titleInput = document.querySelector(".title-input");
    titleInput.value = loadTitle(dateString);
  }

  // 날짜 포맷 함수
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];

    return {
      formatted: `${year}년 ${month}월 ${day}일`,
      weekday: weekday,
    };
  }

  // 날짜 표시 업데이트 함수
  function updateSelectedDate(dateString) {
    const { formatted, weekday } = formatDate(dateString);
    dateText.textContent = formatted;
    weekdayText.textContent = weekday;
  }

  // 날짜 클릭 이벤트 추가 함수
  function addDateClickEvent() {
    // 비활성화되지 않은 모든 날짜 요소 선택
    const dayElements = document.querySelectorAll(".days li:not(.inactive)");
    dayElements.forEach((day) => {
      day.addEventListener("click", () => {
        // 이전에 선택된 날짜의 선택 상태 제거
        document.querySelectorAll(".days li.selected").forEach((el) => {
          el.classList.remove("selected");
        });
        // 클릭된 날짜에 선택 상태 추가
        day.classList.add("selected");
        // 선택된 날짜 저장
        selectedDate = day.getAttribute("data-date");

        // 선택된 날짜의 제목과 날짜 표시 업데이트
        updateTitleForDate(selectedDate);
        updateSelectedDate(selectedDate);

        // 할일 목록 다시 렌더링
        renderTodos();
      });
    });
  }

  // 할일 목록 렌더링 함수
  function renderTodos() {
    todoList.innerHTML = "";
    // 선택된 날짜가 없거나 할일이 없는 경우
    if (
      !selectedDate ||
      !todosByDate[selectedDate] ||
      todosByDate[selectedDate].length === 0
    ) {
      todoList.innerHTML = '<li class="empty">할 일이 없습니다</li>';
      return;
    }

    // 선택된 날짜의 모든 할일 렌더링
    todosByDate[selectedDate].forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      if (todo.completed) li.classList.add("completed");

      // 체크박스 생성
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      // 할일 텍스트 생성
      const span = document.createElement("span");
      span.textContent = todo.text;

      // 카테고리 표시 생성
      const categorySpan = document.createElement("span");
      categorySpan.className = "category";
      categorySpan.textContent = todo.category;

      // 삭제 버튼 생성
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";

      // 체크박스 상태 변경 이벤트
      checkbox.addEventListener("change", () => {
        todosByDate[selectedDate][index].completed = checkbox.checked;
        if (checkbox.checked) {
          li.classList.add("completed");
        } else {
          li.classList.remove("completed");
        }
        saveTodos();
        renderCalendar();
      });

      // 삭제 버튼 클릭 이벤트
      deleteBtn.addEventListener("click", () => {
        todosByDate[selectedDate].splice(index, 1);
        if (todosByDate[selectedDate].length === 0) {
          delete todosByDate[selectedDate];
        }
        saveTodos();
        renderTodos();
        renderCalendar();
      });

      // 요소들을 리스트 아이템에 추가
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(categorySpan);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  // 할일 저장 함수
  function saveTodos() {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }

  function renderCalendar() {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(
      currYear,
      currMonth,
      lastDateOfMonth
    ).getDay();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    // 이전 달 날짜들
    for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    // 현재 달 날짜들
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const dateKey = `${currYear}-${String(currMonth + 1).padStart(
        2,
        "0"
      )}-${String(i).padStart(2, "0")}`;
      const today = new Date();
      const isToday =
        i === today.getDate() &&
        currMonth === today.getMonth() &&
        currYear === today.getFullYear();
      const isSelected = dateKey === selectedDate;
      const hasTitle =
        titlesByDate[dateKey] && titlesByDate[dateKey] !== "제목 없음";

      // 완료 상태 확인
      const allCompleted =
        todosByDate[dateKey] &&
        todosByDate[dateKey].length > 0 &&
        todosByDate[dateKey].every((todo) => todo.completed);

      let classes = [];
      if (isToday) classes.push("active");
      if (isSelected) classes.push("selected");
      if (hasTitle) classes.push("has-title");
      if (allCompleted) classes.push("completed");

      // 제목과 완료 표시 추가
      const titleDot = hasTitle ? '<span class="title-dot"></span>' : "";
      const completeMark = allCompleted
        ? '<span class="complete-mark">✓</span>'
        : "";

      liTag += `
            <li class="${classes.join(" ")}" data-date="${dateKey}">
                <span class="date-number">${i}</span>
                ${titleDot}
                ${completeMark}
            </li>`;
    }

    // 다음 달 날짜들 (7일 단위로 맞추기)
    const remainingDays = 7 - ((firstDayOfMonth + lastDateOfMonth) % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        liTag += `<li class="inactive">${i}</li>`;
      }
    }

    currentDate.innerText = `${currYear}년 ${currMonth + 1}월`;
    daysTag.innerHTML = liTag;

    addDateClickEvent();
  }

  // 이전 달 버튼 클릭 이벤트
  prevBtn.addEventListener("click", () => {
    currMonth--;
    if (currMonth < 0) {
      currMonth = 11;
      currYear--;
    }
    renderCalendar();
  });

  // 다음 달 버튼 클릭 이벤트
  nextBtn.addEventListener("click", () => {
    currMonth++;
    if (currMonth > 11) {
      currMonth = 0;
      currYear++;
    }
    renderCalendar();
  });

  // 할일 추가 버튼 클릭 이벤트
  addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    const category = categorySelect.value;

    if (text) {
      // 선택된 날짜가 없으면 현재 날짜 사용
      const dateKey =
        selectedDate ||
        `${currYear}-${String(currMonth + 1).padStart(2, "0")}-${String(
          date.getDate()
        ).padStart(2, "0")}`;
      if (!todosByDate[dateKey]) {
        // 선택된 날짜가 없으면 현재 날짜 사용
        todosByDate[dateKey] = []; // 할일 목록 초기화
      }

      // 새 할일 추가
      todosByDate[dateKey].push({ text, category, completed: false });
      saveTodos();
      todoInput.value = "";
      renderTodos();
      renderCalendar();
    }
  });

  // 할일 입력 필드 엔터키 이벤트
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const text = todoInput.value.trim();
      const category = categorySelect.value;

      if (text) {
        const dateKey =
          selectedDate ||
          `${currYear}-${String(currMonth + 1).padStart(2, "0")}-${String(
            date.getDate()
          ).padStart(2, "0")}`;
        if (!todosByDate[dateKey]) {
          todosByDate[dateKey] = [];
        }

        todosByDate[dateKey].push({ text, category, completed: false });
        saveTodos();
        todoInput.value = "";
        renderTodos();
        renderCalendar();
      }
    }
  });

  // 제목 입력 필드 이벤트
  const titleInput = document.querySelector(".title-input");
  titleInput.addEventListener("input", (e) => {
    if (selectedDate) {
      saveTitle(selectedDate, e.target.value);
      renderCalendar(); // 달력 업데이트하여 제목 표시 점 갱신
    }
  });

  // 초기 날짜 설정 및 렌더링
  const today = new Date();
  const initialDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  selectedDate = initialDate;
  updateSelectedDate(initialDate);
  updateTitleForDate(initialDate);
  renderCalendar();

  // 제목 입력 시 자동 크기 조절
  titleInput.addEventListener("input", function () {
    this.style.height = "auto"; // 초기 높이 재설정
    this.style.height = this.scrollHeight + "px"; // 스크롤 높이에 맞춤
  });

  // 할 일 상태 변경 시 달력 업데이트
  function updateTodoStatus(date, completed) {
    if (todosByDate[date]) {
      // 할일이 있으면
      renderCalendar(); // 달력 업데이트
    }
  }

  // 할 일 체크박스 이벤트 리스너 수정
  function addTodoCheckboxListener(checkbox, date) {
    checkbox.addEventListener("change", () => {
      // ... 기존 체크박스 이벤트 처리 ...
      updateTodoStatus(date, checkbox.checked); // 할일 상태 업데이트
    });
  }
});
