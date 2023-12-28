const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get()
    .then((blogs) => {
        blogs.forEach(blog => {
            if (blog.id != decodeURI(location.pathname.split("/").pop())) {
                createBlog(blog);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching blogs:', error);
    });

    const createBlog = (blog) => {
        let data = blog.data();
    
        // Check if data is defined
        if (data) {
            console.log("Blog data:", data);
    
            blogSection.innerHTML += `
                <div class="blog-card">
                    <img src="${data.bannerImage}" class="blog-image" alt="">
                    <h1 class="blog-title">${data.tittle ? data.tittle.substring(0, 100) + '...' : 'No title'}</h1>
                    <p class="blog-overview">${data.article ? data.article.substring(0, 200) + '...' : 'No article'}</p>
                    <a href="/${blog.id}" class="btn dark">read</a>
                </div>
            `;
        } else {
            console.error('Data is undefined for blog:', blog.id);
        }
    }

    