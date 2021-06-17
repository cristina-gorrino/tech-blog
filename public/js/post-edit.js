const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // Redirect to dashboard after successful creation of post
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

const deletePostHandler = async (event) => {
    const response = await fetch('/api/posts', {
        method: 'DELETE'
      });
      if (response.ok) {
        // Redirect to dashboard after successful creation of post
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
};
  
  document
    .querySelector('.edit-post')
    .addEventListener('submit', editPostHandler);

    document.querySelector('#delete-post').addEventListener('click', deletePostHandler);