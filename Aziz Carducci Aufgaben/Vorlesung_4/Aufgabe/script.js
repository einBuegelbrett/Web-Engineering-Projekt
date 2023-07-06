function getall() {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(console.log);
                
}
function getSingle() {
    fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
    .then(console.log);
}

function fDelete() {
    fetch('https://dummyjson.com/products/1', {
  method: 'DELETE',
})
.then(res => res.json())
.then(console.log);
}

function put() {
    fetch('https://dummyjson.com/products/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'iPhone Galaxy +1'
        })
      })
      .then(res => res.json())
      .then(console.log);
}

function post() {
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'BMW Pencil',
          description: 'A Pencil which is no different like any other pencil but is more expensive because it has the brand BMW',
          price:99
        })
      })
      .then(res => res.json())
      .then(console.log);
}