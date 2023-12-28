let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    if(doc.exists){
        console.log("Blog data:", doc.data());
        setupBlog(doc.data());
    } else {
        console.log("Blog not found");
        location.replace("/");
    }
});


const setupBlog = (data) => {
    console.log("Received data:", data);

    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    // Log elements to ensure they are found
    console.log("Banner element:", banner);
    console.log("Blog title element:", blogTitle);
    console.log("Title tag element:", titleTag);
    console.log("Publish element:", publish);

    // Update the banner
    banner.style.backgroundImage = `url(${data.bannerImage})`;

    // Update the title tag
    titleTag.innerHTML = data.tittle; // Correct the property name to 'tittle'

    // Update the blog title
    blogTitle.innerHTML = data.tittle; // Correct the property name to 'tittle'

    // Update the published information
    publish.innerHTML = data.publishedAt;

    // Add a log statement for verification
    console.log("Blog title updated to:", data.tittle);

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}



const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}