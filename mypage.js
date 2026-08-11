const SUPABASE_URL = "https://zpluamwdkdcjtamnqyxz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbHVhbXdka2RjanRhbW5xeXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODkxOTcsImV4cCI6MjEwMTg2NTE5N30.-bm5cxlnIbKTK4eY6IAu9EL92ww-RQany_f5I_kU3o0";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loggedInUser = localStorage.getItem('loggedInUsername');

if(loggedInUser){
    location.href = "mypage-iflog.html";
}

async function handleLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username) {
        alert("아이디를 입력해 주세요.");
        return;
    } else if (!password) {
        alert("비밀번호를 입력해 주세요.");
        return;
    }

    const {data,error} = await supabaseClient.from('users').select('*').eq('username',username).eq('password',password).maybeSingle();

    if(error){
        console.error("로그인 오류.");
        alert("로그인 중 문제가 발생했습니다. 다시 로그인 해 주십시오.");
        return;
    }

    if(!data){
        alert("! 아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
    }

    alert("로그인에 성공하였습니다.")
    localStorage.setItem('loggedInUsername', data.username);
    location.href = "mypage-iflog.html";
}