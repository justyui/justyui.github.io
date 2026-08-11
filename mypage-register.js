function goSchulpage() {
    window.open("mypage-register-school.html", "_blank", "width=400, height=600, resizable=no, top=50%, left=50%");
}

function receiveSchoolData(schoolData) {
    document.getElementById("school").value = `${schoolData.schoolName}`;
}

const SUPABASE_URL = "https://zpluamwdkdcjtamnqyxz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbHVhbXdka2RjanRhbW5xeXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODkxOTcsImV4cCI6MjEwMTg2NTE5N30.-bm5cxlnIbKTK4eY6IAu9EL92ww-RQany_f5I_kU3o0";
const supabaseClient = window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

async function handleRegister() {
    const name = document.getElementById('name').value;
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value.padStart(2, '0'); // '5' -> '05'
    const day = document.getElementById('day').value.padStart(2, '0');     // '7' -> '07'
    const school = document.getElementById('school').value;
    const major = document.getElementById('major').value;
    const email = document.getElementById('user-email').value;
    const username = document.getElementById('user-id').value;
    const password = document.getElementById('user-password').value;

    if (!username || !password || !name || !email || !school){
        alert("입력란을 모두 채워주세요.");
        return;
    }

    const userData = {
        username: username,
        password: password,
        name: name,
        birth_date: `${year}-${month}-${day}`,
        school_name: school,
        major: major,
        email: email
    };

    const {data,error} = await supabaseClient.from('users').insert([userData]);

    if (error){
        console.error("데이터베이스 저장 실패", error);
        alert("회원가입 실패");
    }
    else{
        alert("정보 입력 완료")
        localStorage.setItem('loggedInUsername', username);
        location.href = "mypage-register-detail.html";
    }
}
