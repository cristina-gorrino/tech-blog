const createCommentHandler = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('#comment').value.trim();
  
    if (body) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({body}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // Redirect to dashboard after successful creation of post
        document.location.replace('/post/:id');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.create-comment')
    .addEventListener('submit', createCommentHandler);