const API_URL = "https://api.github.com/users/";

const form = document.querySelector("#form");
const search = document.querySelector("#search");
const main = document.querySelector("#main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    // console.log(data);
    createUserCard(data);
    getRepos;
  } catch (err) {
    // console.log(err);
    createErrorCard("User not found");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.innerHTML = "";
  }
});

function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : " ";
  const cardHTML = `
    <div class="card">
        <img
          src="${user.avatar_url}"
          alt="${user.name}"
          class="user-image"
        
        />
        <div class="user-info">
          <div class="user-name">
            <h2>${userName}</h2>
            <small>@${user.login}</small>
          </div>
        </div>
        <p>
        ${userBio}
          
        </p>
        <ul>
          <li>
            <i class="fa-solid fa-user-group"></i>${user.followers} <strong> Followers</strong>
          </li>
          <li>${user.following} <strong> Following</strong></li>
          <li>
            <i class="fa-solid last fa-bookmark"></i>${user.public_repos}
            <strong> Repositories</strong>
          </li>
        </ul>

        <div class="repos" id="repos">
    
        </div>
      </div>
    
    
    `;
  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardErrorHTML = `
     <div class="card">
       <h2>${msg}</h2>

     </div>

    `;

  main.innerHTML = cardErrorHTML;
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
