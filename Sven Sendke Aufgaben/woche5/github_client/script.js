const token = '';

function fetchButton() {
    const input = document.getElementById('password').value;
    console.log(input);
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
        console.log(error);
        document.getElementById('message').textContent = 'Fehler: ' + error.message;
    });

    //.then(data => console.log(data))
    //.catch(error => console.log(error));
}

addEventListener('submit', fetchButton());