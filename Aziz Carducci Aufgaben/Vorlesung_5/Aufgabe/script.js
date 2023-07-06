const reposlist = document.getElementById('repos-list');
const loginform = document.getElementById('login-form');

function getToken() {
    fetch('https://api.github.com/user/repos' , {
        headers: {
        'Authorization': 'Bearer' + loginform.innerText
        }
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
}

