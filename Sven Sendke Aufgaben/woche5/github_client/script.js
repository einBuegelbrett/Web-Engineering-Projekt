const token = '';

function fetchButton() {
    const input = document.getElementById('password').value;
    
    fetch('https://api.github.com/user/repos', {
        headers: {
            'Authorization': 'Bearer ' + input
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Fehler :(');
        }
    })
    .then(data => {
        const reposList = document.getElementById('repos-list');
        reposList.innerHTML = '';
        data.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.textContent = repo.name;
            reposList.appendChild(listItem);
        });
        document.getElementById('message').textContent = 'Es hat geklappt :)';
    })
    .catch(error => {
        document.getElementById('message').textContent = error.message;
    });
}

addEventListener('submit', fetchButton());