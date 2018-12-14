import {
 http
} from './http';
import {
 ui
} from './ui';
import {
 ls
} from './ls';

/** This app works if two ways:
 * 1) If you have API end points, you can assign them to api object;
 * 2) If you don't, the app will use browser localStorage to persist data.
 */
// Check if there are API end points
const api = {
 get: null,  /** Example: 'http://localhost:3000/posts' */
 post: null,  /** Example: 'http://localhost:3000/posts' */
 put: null,  /** Example: 'http://localhost:3000/posts/' */
 delete: null  /** Example: 'http://localhost:3000/posts/' */
};

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get Posts
function getPosts() {
 if (api.get) {
  http.get(api.get)
   .then(data => ui.showPosts(data))
   .catch(err => console.log(err));
 } else {
  const data = ls.get();
  ui.showPosts(data);
 }
}

// Submit Post
function submitPost() {
 const title = document.querySelector('#title').value;
 const body = document.querySelector('#body').value;
 const id = document.querySelector('#id').value;

 const data = {
  title,
  body
 }

 // Validate input
 if (title === '' || body === '') {
  ui.showAlert('Please fill in all fields', 'alert alert-danger');
 } else {
  // Check for ID
  if (id === '') {
   // Create post
   if (api.post) {
    http.post(api.post, data)
     .then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
     })
     .catch(err => console.log(err));
   } else {
    ls.post(data);
    ui.showAlert('Post added', 'alert alert-success');
    ui.clearFields();
    getPosts();
   }
  } else {
   // Update Post
   if (api.put) {
    http.put(`${api.put}${id}`, data)
     .then(data => {
      ui.showAlert('Post updated', 'alert alert-success');
      ui.changeFormState('add');
      getPosts();
     })
     .catch(err => console.log(err));
   } else {
    ls.put(data);
    ui.showAlert('Post updated', 'alert alert-success');
    ui.changeFormState('add');
    getPosts();
   }
  }
 }
}

// Delete Post
function deletePost(e) {
 e.preventDefault();
 if (e.target.parentElement.classList.contains('delete')) {
  const id = e.target.parentElement.dataset.id;
  if (confirm('Are you sure?')) {
   if (api.delete) {
    http.delete(`${api.delete}${id}`)
     .then(data => {
      ui.showAlert('Post Removed', 'alert alert-success');
      getPosts();
     })
     .catch(err => console.log(err));
   } else {
    ls.delete(id);
    ui.showAlert('Post Removed', 'alert alert-success');
    getPosts();
   }
  }
 }
}

// Enable Edit State
function enableEdit(e) {
 if (e.target.parentElement.classList.contains('edit')) {
  const id = e.target.parentElement.dataset.id;
  const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
  const body = e.target.parentElement.previousElementSibling.textContent;

  const data = {
   id,
   title,
   body
  }

  // Fill form with current post
  ui.fillForm(data);
 }

 e.preventDefault();
}

function cancelEdit(e) {
 if (e.target.classList.contains('post-cancel')) {
  ui.changeFormState('add');
 }
 e.preventDefault();
}






















// const greeting = 'Hello World';
// console.log(greeting);

// const getData = async (url) => {
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);
// };

// getData('https://jsonplaceholder.typicode.com/posts');