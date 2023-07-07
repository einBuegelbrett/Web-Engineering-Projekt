// script.js

function getToken() {
  const token = document.getElementById('password').value;

  fetch('https://api.github.com/user/repos', {
    headers: {
      'Authorization': 'Bearer ' + token 
  }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } 
  })

    .then(data => {
      displayRepositories(data);
      document.getElementById('message').textContent = 'Success';
    })
    .catch(error => {
      document.getElementById('message').textContent = error.message;
    });
}

function displayRepositories(repositories) {
  const reposList = document.getElementById('repos-list');
  reposList.innerHTML = '';

  repositories.forEach(repo => {
    const listItem = document.createElement('li');
    listItem.textContent = repo.full_name;
    reposList.appendChild(listItem);
  });
}

addEventListener('submit', getToken());


