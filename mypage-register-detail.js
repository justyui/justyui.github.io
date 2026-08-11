const SUPABASE_URL = "https://zpluamwdkdcjtamnqyxz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbHVhbXdka2RjanRhbW5xeXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODkxOTcsImV4cCI6MjEwMTg2NTE5N30.-bm5cxlnIbKTK4eY6IAu9EL92ww-RQany_f5I_kU3o0";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function handleDetailSave() {
    const username = localStorage.getItem('loggedInUsername');
    const detailText = document.getElementById('my-info').value;
    if(!username){
        location.href = "mypage-register.html";
        return;
    }
    
    const{data,error} = await supabaseClient.from('users').update({detail_info:detailText}).eq('username',username).select();

    if(error){
        console.error("저징 실패");
        alert("회원가입 실패");
    } else if (!data||data.length==0){
        console.warn("입력된 행이 없습니다.")
        alert("입력된 행이 없습니다.")
    } else {
        alert("회원가입 완료");
        
        location.href = "mypage-iflog.html";
    }
}