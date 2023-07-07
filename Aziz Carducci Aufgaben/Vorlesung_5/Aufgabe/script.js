// script.js
//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

function getToken() {
  //const token = document.getElementById('password').value;

  const input = document.getElementById('password').value;
    
    fetch('https://api.github.com/user/repos', {
        headers: {
            'Authorization': 'Bearer ' + input
        }
    })

  .then(response => {
    if (response.ok) {
      return response.json();
    } 
    else {
      throw new Error('hund');
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


