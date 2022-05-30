const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("sioanaseres");
async function getUser(username) {
  const response = await fetch(APIURL + username);
  const responseData = await response.json();

  createUserCard(responseData);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}
function createUserCard(user) {
  const cardHTML = `
  <div class="card">
    <div class="image-container">
     <img src="${user.avatar_url}" alt="${user.name}" class="avatar"/>
    </div>
    <div class="user-info" >
        <h2> ${user.name}</h2>
        <p> ${user.bio}</p>
        <ul class="info"> 
            <li> <img src="./eye-svgrepo-com.svg" width="20" height="20" />${user.followers}</li>
            <li> <img src="./star-svgrepo-com.svg" width="20" height="20" />${user.following}</li>
            <li> <img src="./message-svgrepo-com.svg" width="20" height="20" />${user.public_repos}</li>
        </ul>

        <div class="repos" id="repos"> 
        <h4>Repos: </h4>   </div>
    </div>
  </div>
    `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
