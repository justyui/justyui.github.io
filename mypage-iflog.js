const SUPABASE_URL = "https://zpluamwdkdcjtamnqyxz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbHVhbXdka2RjanRhbW5xeXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODkxOTcsImV4cCI6MjEwMTg2NTE5N30.-bm5cxlnIbKTK4eY6IAu9EL92ww-RQany_f5I_kU3o0";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener(
    "DOMContentLoaded", async () => {
        const username = localStorage.getItem('loggedInUsername');

        if (!username) {
            alert('로그인이 필요합니다.')
            location.href = "mypage.html";
            return;
        }

        const {data,error} = await supabaseClient.from('users').select('*').eq('username',username).single();

        if(error) {
            console.error("내 정보 불러오기 실패");
            alert("정보 불러오기 실패");
            return;
        }

        document.getElementById('info-username').innerText = data.username;
        document.getElementById('info-name').innerText = data.name;
        document.getElementById('info-birth').innerText = data.birth_date;
        document.getElementById('info-school').innerText = data.school_name;
        document.getElementById('info-major').innerText = data.major;
        document.getElementById('info-detail').innerText = data.detail_info;
    }
)

async function handleLogout() {
    localStorage.removeItem('loggedInUsername');
    location.href = "mypage.html";
}