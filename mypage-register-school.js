const API_KEY = "";
const url = 'https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=fd444dde5cc10fff652eba858b329041&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list'
fetch(url)
    .then(Response => Response.json())
    .then(data => {
        console.log("받아온 데이터:", data);
        const schoolList = data.dataSearch.content;
        const ul = document.getElementById("school-list");

        schoolList.forEach(school => {
            const li = document.createElement("li")
            li.textContent = `${school.schoolName} (${school.adres})`;
            ul.appendChild(li);
        });
    })









