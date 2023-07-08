function displayRepositories(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
    repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.textContent = repo.name;
        reposList.appendChild(listItem);
    });
}

const token = document.getElementById('password').value;


function useToken() {

    fetch('https://api.github.com/user/repos', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Fehler: ' + response.status);
        }
    })
    .then(data => {
        displayRepositories(data);
        document.getElementById('message').textContent = 'Alle verfügbaren Repositories wurden angezeigt.';
    })
    .catch(error => {
        if (token !== '') {
            document.getElementById('message').textContent = 'Es ist leider ein Fehler aufgetreten: ' + error;
        } else {
            document.getElementById('message').textContent = '';
        }
    });
}

document.getElementById('submit-button').addEventListener('click', useToken);
