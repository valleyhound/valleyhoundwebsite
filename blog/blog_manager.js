var blogPostData = [];
var blogPostLines = 0;

function LoadBlog() {
    var url = "https://valleyhound.games/blog/blog_posts.txt";
    

    var textFile = new XMLHttpRequest();
    textFile.open("GET",url,true);
    textFile.send();

    textFile.onreadystatechange = function() {
        if (textFile.readyState== 4 && textFile.status == 200) {
            blogPostData = textFile.responseText.split("\n");
            blogPostLines = blogPostData.length;
            WriteOutBlog();
        }
    }
}

function WriteOutBlog(){
    var blog_area = document.getElementById("blog_area");
    var isWriting = false;
    var newEntry = ``;
    blogPostData.forEach(currentLine => {
        if (currentLine.includes("[newblog(")){
            isWriting = true;
            var blogMetaData = currentLine.split("(")[1].split(")")[0];
            var blogData = blogMetaData.split(",");
            var blogDate = blogData[0];
            var blogTime = blogData[1];
            var blogName = blogData[2];            
            newEntry = ``;
            newEntry += 
            `<div class="blog_post">
            <h3>${blogName} <span class="blog_date">${blogDate} - ${blogTime}</span></h3><hr>
            `;
            return;
        }

        if(currentLine.includes("[/newblog]")){
            isWriting = false;
            newEntry += `
            <br></div><br>`;
            blog_area.innerHTML += newEntry;
        }

        if(isWriting){
            newEntry += `<p>${currentLine}</p>`;
        }
    });
}

LoadBlog();