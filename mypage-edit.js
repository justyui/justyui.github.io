const SUPABASE_URL = "https://zpluamwdkdcjtamnqyxz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbHVhbXdka2RjanRhbW5xeXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODkxOTcsImV4cCI6MjEwMTg2NTE5N30.-bm5cxlnIbKTK4eY6IAu9EL92ww-RQany_f5I_kU3o0";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener(
    "DOMContentLoaded", async () => {
        const username = localStorage.getItem('loggedInUsername');
        
        if(!username){
            alert("로그인을 해주세요.");
            location.href = "mypage.html";
            return;
        }

        const {data,error} = await supabaseClient.from('users').select('detail_info').eq('username',username).single();

        if(error){
            console.error("기존 정보 불러오기 실패");
        } else if (data && data.detail_info){
            document.getElementById('my-info').value = data.detail_info;
        }

    }
);

async function handleEditDone() {
    const username = localStorage.getItem('loggedInUsername');
    const detailUpdateText = document.getElementById('my-info').value;

    const {data,error} = await supabaseClient.from('users').update({detail_info:detailUpdateText}).eq('username',username).select();

    if(error){
        console.error("정보 수정 실패");
        alert("! 정보 수정에 실패했습니다. 다시 시도해 주세요.");

    } else {
        alert("정보가 수정되었습니다.");
        location.href = "mypage.html";
    }
}