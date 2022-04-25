const url = "https://api.github.com/users";
const buttonSearch = document.querySelector("#button-src")
let fieldValue = document.querySelector("#field-src")


function getUser(userName){
    axios.get(`${url}/${userName}`)
    .then(response => {
        const data = response.data
        if( data.avatar_url != null || ""){
            userAvatar.src = data.avatar_url
        }  
        userLogin.textContent = data.login
        userID.textContent = data.id
        userType.textContent = data.type
        if(userCompany.textContent = data.company == null){
            userCompany.textContent = "N/A"
        } else {
            userCompany.textContent = data.company
        }
        userUrl.href = data.html_url
        repoTotal.textContent = `Repositórios públicos encontrados: ${data.public_repos}`
    })
    .catch(error => console.error(error))
}

async function FetchRepos(userName){

    try{
    await axios.get(`${url}/${userName}/repos`)
    .then(response => {
        const repos = response.data
        repos.forEach(repo => {
            const Form = {
                name: repo.name,
                description: repo.description,
                language: repo.language,
                link: repo.html_url
            } 
            const fixedHTML = {
                clearLanguage(){
                    if(Form.language == null){
                        Form.language = "N/A"
                    } else{
                        Form.language = repo.language
                    }
                    return Form.language
                },
                clearDescription(){
                    if(Form.description == null){
                        Form.description = "No description"
                    } else{
                        Form.description = repo.description
                    }
                    return Form.description
                }
            }  
            const HTML = `
            <div class="card-repo">
                <ul id="card-info">
                <li><p class="repoLinkName" id="repoLinkName">${Form.name}</p></li>
                <li><p class="repoDescript" id="repoDescript">${fixedHTML.clearDescription()}</p></li>
                <li><p class="repoTech" id="repoLinkName">${fixedHTML.clearLanguage()}</p></li>
                <li><a href="${Form.link}" id="repoLink" target="_blank" rel="noopener noreferrer"><p class="repoLink">view on <strong>GitHub</strong></p></a></li>
                </ul>
            </div>
            `
            const divrepos = document.querySelector(".cards")
            const ul = document.createElement("ul")
            ul.innerHTML = HTML
            divrepos.appendChild(ul)
        })     
    });
    }catch(error){
        console.log(error)
    }
 }

function getValue(event){
    if(fieldValue.value.length > 0){
        event.preventDefault()
        clearHTML()
        getUser(fieldValue.value)
        FetchRepos(fieldValue.value)
    }else {
        alert("Please enter a value")
    }
}

function clearHTML(){
    const htmlRepos = document.querySelector(".cards")
    htmlRepos.innerHTML = ""
}