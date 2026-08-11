const API_KEY = "fd444dde5cc10fff652eba858b329041";
function seturl(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("받아온 데이터:", data);
            const schoolList = data.dataSearch.content;
            const ul = document.getElementById("school-list");

            ul.innerHTML = "";

            schoolList.forEach(school => {
                const li = document.createElement("li")
                li.textContent = `${school.schoolName} (${school.adres})`;

                li.onclick = function() {
                    sendSchulNm(school);
                }

                ul.appendChild(li);
            });
        })
}

function sendSchulNm(schoolData) {
    window.opener.receiveSchoolData(schoolData);
    window.close();
}

function doSearch() {
    const schoolSearch = document.getElementById("search-text").value;
    const searchUrl = `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${API_KEY}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&searchSchulNm=${schoolSearch}`
    seturl(searchUrl);
}

seturl(`https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${API_KEY}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list`)






