let elList = document.querySelector(".container")
let elUsers = document.querySelector(".users")
let elPosts = document.querySelector(".posts")
let elComments = document.querySelector(".comments")
let elementUsersTemplate = document.querySelector(".users__template").content
let elPostsTemplate = document.querySelector(".posts__template").content;
const templateComments = document.querySelector( ".comments__template").content;
const lodirImg = document.querySelector(".img");
let elementFrag = document.createDocumentFragment()

const Posts = []; 

function renderTodo(arr,node){
  
  lodirImg.style.display = "none";
  arr.forEach(e =>{
    Posts.push(e.id)
    
    let alTemplate = elementUsersTemplate.cloneNode(true)
    alTemplate.querySelector(".users__id").textContent = e.id
    alTemplate.querySelector(".users__subname").textContent = e.username
    alTemplate.querySelector(".users__name").textContent = e.name
    alTemplate.querySelector(".users__street").textContent = e.address.street
    alTemplate.querySelector(".users__suite").textContent = e.address.suite
    alTemplate.querySelector(".users__city").textContent = e.address.city
    alTemplate.querySelector(".users__zipcode").textContent = e.address.zipcode
    alTemplate.querySelector(".users__company-name").textContent = e.company.name
    alTemplate.querySelector(".users__company-catchphrase").textContent = e.company.catchPhrase
    alTemplate.querySelector(".users__company-bs").textContent = e.company.bs
    alTemplate.querySelector(".users__phone").textContent = e.phone
    alTemplate.querySelector(".users__phone").href = `tel:${e.phone}`
    alTemplate.querySelector(".users__lat").textContent = "@geo"
    alTemplate.querySelector(".users__lat").href = `https://www.google.com/maps/place/${e.address.geo.lat},${e.address.geo.lng}`
    alTemplate.querySelector(".users__lng").textContent = "@website"
    alTemplate.querySelector(".users__lng").href = `https://${e.website}`
    alTemplate.querySelector(".users__email").textContent = e.email
    alTemplate.querySelector(".users__email").href = `mailto:${e.email}`
    alTemplate.querySelector(".users__item").dataset.id = e.id;
    
    elementFrag.appendChild(alTemplate)
  })
  node.appendChild(elementFrag)
}

const renderPosts = function(arr, node){
  node.innerHTML = "";
  
  const fragPosts = document.createDocumentFragment();
  lodirImg.style.display = "none"
  arr.forEach((elemen) => {
    Posts.push(elemen.id);
    const templatePosts = elPostsTemplate.cloneNode(true);
    templatePosts.querySelector(".posts__title").textContent = elemen.title;
    templatePosts.querySelector(".posts__text").textContent = elemen.body;
    templatePosts.querySelector(".posts__item").dataset.id = elemen.id;
    
    fragPosts.appendChild(templatePosts);
  }); 
  node.appendChild(fragPosts);
};

const renderComments = (arr, e) => {
  e.innerHTML = "";
  const fragComments = document.createDocumentFragment();
  if (arr.length > 0) {
    lodirImg.style.display = "none";
    
    arr.forEach((e) => {
      const newTemplateComments = templateComments.cloneNode(true);
      newTemplateComments.querySelector(".comments__title").textContent = e.name;
      newTemplateComments.querySelector(".comments__link").textContent = e.email;
      newTemplateComments.querySelector(".comments__text").textContent = e.body;
      newTemplateComments.querySelector(".comments__link").href = `mailto:${e.email}`;
      
      fragComments.appendChild(newTemplateComments);
    });
  }
  e.appendChild(fragComments);
};

async function getUsers(){
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const data = await res.json()
  renderTodo(data,elUsers)
}
getUsers()

async function getPosts(usersId){
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usersId}`)
  const data = await res.json();
  renderPosts(data, elPosts);
}

async function getComments(postId){
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const data = await res.json();
    renderComments(data, elComments);
  };
  
  elUsers.addEventListener("click", (evt) => {
    elComments.innerHTML = ""
    if (evt.target.matches(".users__item")) {
      lodirImg.style.display = "block"
      const postsListItemId = evt.target.dataset.id - 0;
      Posts.forEach((postId) => {
        if (postsListItemId === postId) {
          getPosts(postId);
        }
      });
    }
  });
  
  
  elPosts.addEventListener("click", (evt) => {
    if (evt.target.matches(".posts__item")) {
      lodirImg.style.display = "flex";
      const postsListItemId = evt.target.dataset.id - 0;
      Posts.forEach((postId) => {
        if (postsListItemId === postId) {
          getComments(postId);
        }
      });
    }
  });