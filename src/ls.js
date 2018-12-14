class LocalStorage {
 // Get posts from local storage 
 get() {
  let posts;
  if (localStorage.getItem('posts') === null) {
   posts = [];
  } else {
   posts = JSON.parse(localStorage.getItem('posts'));
  }
  return posts;
 }

 // Store post in local storage
 post(post) {
  let ID;
  let posts;
  // Check if any items in LS
  if (localStorage.getItem('posts') === null) {
   posts = [];
   ID = 0;
   post = {
    ...post,
    id: ID.toString()
   };
   // Push new item
   posts.push(post);
   // Set LS
   localStorage.setItem('posts', JSON.stringify(posts));
  } else {
   posts = JSON.parse(localStorage.getItem('posts'));
   ID = posts[posts.length - 1].id + 1;
   post = {
    ...post,
    id: ID.toString()
   };
   posts.push(post);
   localStorage.setItem('posts', JSON.stringify(posts));
  }
 }

 // Update post
 put(updatePost) {
  let posts = JSON.parse(localStorage.getItem('posts'));

  posts.forEach((post, index) => {
   if (updatePost.id === post.id) {
    posts.splice(index, 1, updatePost);
   }
  });
  localStorage.setItem('posts', JSON.stringify(posts));
 }

// Delte post from local storage
 delete(id) {
  let posts = JSON.parse(localStorage.getItem('posts'));
  
  posts.forEach((post, index) => {
   if (id === post.id) {
    posts.splice(index, 1);
   }
  });
  localStorage.setItem('posts', JSON.stringify(posts));
 }

}

export const ls = new LocalStorage();