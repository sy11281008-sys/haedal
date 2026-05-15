// --- 버킷리스트 기능 ---
const goalInput = document.querySelector("#goalInput");
const addGoalBtn = document.querySelector("#addGoalBtn");
const goalList = document.querySelector("#goalList");
const errorMessage = document.querySelector("#errorMessage");
const goalCount = document.querySelector("#goalCount");

// HTML에 미리 적혀있는 기본 목표 4개를 카운트
let goalTotal = 4; 

function updateGoalCount() {
	goalCount.textContent = `현재 목표 ${goalTotal}개`;
}

// 기존에 하드코딩된 리스트에도 삭제/완료 이벤트 달아주기
const existingItems = document.querySelectorAll('.goal-item');
existingItems.forEach(item => {
    const textSpan = item.querySelector('.goal-text');
    const delBtn = item.querySelector('.delete-btn');
    
    textSpan.addEventListener("click", () => textSpan.classList.toggle("done"));
    delBtn.addEventListener("click", () => {
        item.remove();
        goalTotal--;
        updateGoalCount();
    });
});

addGoalBtn.addEventListener("click", function () {
	const goalText = goalInput.value.trim();

	if (goalText === "") {
		errorMessage.textContent = "목표를 입력해주세요.";
		return;
    }

	errorMessage.textContent = "";

	const li = document.createElement("li");
	li.classList.add("goal-item");

    const span = document.createElement("span");
    span.textContent = goalText;
    span.classList.add("goal-text");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete-btn");

    span.addEventListener("click", function () {
	    span.classList.toggle("done");
    });

    deleteBtn.addEventListener("click", function () {
	    li.remove();
        goalTotal--;
		updateGoalCount();
    });

    li.appendChild(span);
	li.appendChild(deleteBtn);
	goalList.appendChild(li);

    goalTotal++;
	updateGoalCount();
	goalInput.value = "";
});

// --- 방명록 기능 ---
const serverMsg = document.querySelector('#server-msg');
const myMsg = document.querySelector('#my-msg');
const nameInput = document.querySelector('#guest-name');
const msgInput = document.querySelector('#guest-msg');
const submitBtn = document.querySelector('#submit-btn');

function getMessageData() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve("익명: 웹 기초 파이팅입니다!"); 
    }, 1500);
  });
}

async function initGuestbook() {
  const data = await getMessageData();
  serverMsg.textContent = data; 
}

let isFirst = true;

submitBtn.addEventListener('click', function() {
  const name = nameInput.value.trim();
  const msg = msgInput.value.trim();

  if (name === '' || msg === '') {
    alert("이름과 메시지를 모두 입력해주세요.");
    return;
  }

  const result = `<strong>${name}</strong>: ${msg}<br>`;

  if (isFirst) {
    myMsg.innerHTML = result; // 처음엔 안내 문구를 덮어씌움
    isFirst = false;
  } else {
    myMsg.innerHTML += result; // 두 번째부터는 뒤에 이어붙임
  }

  nameInput.value = '';
  msgInput.value = '';
});

initGuestbook();