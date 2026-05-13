const goalInput = document.querySelector("#goalInput");
const addGoalBtn = document.querySelector("#addGoalBtn");
const goalList = document.querySelector("#goalList");
const errorMessage = document.querySelector("#errorMessage");
const goalCount = document.querySelector("#goalCount");

let goalTotal=0;

function updateGoalCount() {
	goalCount.textContent=`현재 목표 ${goalTotal}개`;
}

addGoalBtn.addEventListener("click",function () {
	const goalText = goalInput.value.trim();

	if (goalText === "") {
		errorMessage.textContent = "목표를 입력해주세요.";
		return;
    }

	errorMessage.textContent = "";

	const li=document.createElement("li");
	li.classList.add("goal-item");

    const span=document.createElement("span");
    span.textContent=goalText;
    span.classList.add("goal-text");

    const deleteBtn=document.createElement("button");
    deleteBtn.textContent="삭제";
    deleteBtn.classList.add("delete-btn");

    span.addEventListener("click", function () {
	    span.classList.toggle("done");
    });

    deleteBtn.addEventListener("click", function () {
	    li.remove();
        goalTotal=goalTotal-1;
		updateGoalCount();
    });

    li.appendChild(span);
	li.appendChild(deleteBtn);
	goalList.appendChild(li);

    goalTotal=goalTotal+1;
	updateGoalCount();

	goalInput.value = "";
});

// 1. 제어할 태그들 전부 가져오기
const serverMsg = document.querySelector('#server-msg');
const myMsg = document.querySelector('#my-msg');
const nameInput = document.querySelector('#guest-name');
const msgInput = document.querySelector('#guest-msg');
const submitBtn = document.querySelector('#submit-btn');

// 2. 1.5초 뒤에 문자열 하나를 주는 함수
function getMessageData() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      // 1.5초 뒤에 이 글자를 전달함
      resolve("익명: 웹 기초 파이팅입니다!"); 
    }, 1500);
  });
}

// 3. 기다렸다가 화면 글자 바꾸기
async function initGuestbook() {
  // getMessageData가 끝날 때까지 1.5초 대기! (await)
  const data = await getMessageData();
  
  // 1.5초 뒤 데이터가 도착하면, 저번 시간에 배운 textContent로 글자 바꾸기
  serverMsg.textContent = data; 
}

let isFirst = true;
// 4. 버튼 눌러서 새 방명록 띄우기
submitBtn.addEventListener('click', function() {
  const name = nameInput.value;
  const msg = msgInput.value;

  // 빈칸이면 멈춤
  if (name === '' || msg === '') {
    alert("이름과 메시지를 모두 입력해주세요.");
    return;
  }


  // 저번 시간에 배운 textContent로 화면의 글자를 내가 쓴 걸로 덮어씌움

  const result = name + ": " + msg + "<br>";
  myMsg.innerHTML = myMsg.innerHTML;

  if (isFirst === true) {
    // 1. 기존 안내 문구를 아예 무시하고, 내 방명록으로 싹 덮어씌워버림
    myMsg.innerHTML = result;
    isFirst = false;
  } 
  else {
    // 두 번째 글부터는 스위치가 꺼져있으니까, 여기로 넘어와서 계속 누적됨
    myMsg.innerHTML = myMsg.innerHTML + result;
  }
  

  // 입력칸 빈칸으로 초기화
  nameInput.value = '';
  msgInput.value = '';
});

// 페이지 열리면 함수 실행
initGuestbook();