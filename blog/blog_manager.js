blog_preformat = `
<div>
<a href="https://store.steampowered.com/app/2214170/Wyoming_Winter/" target="_blank"> <img src="../assets/images/wyomingwinter.jpg" style="cursor: pointer;"> </a>
</div>
<h3>Wyoming Winter - Steam Publication</h3>
<p>Published in 2022 to itch.io before being made accessible on Steam December 9th the same year, Wyoming Winter is our current flagship in-house development and represents more than two years of refinement in workflow processes for VH Games.</p>
<br>
<br>
<hr>
`;

function LoadBlog() {
    var url = "http://valleyhound.games/blog/blog_posts.txt";
    var blogPostData = "";

    var textFile = new XMLHttpRequest();
    textFile.open("GET",url,true);
    textFile.send();

    textFile.onreadystatechange = function() {
        if (jsonFile.readyState== 4 && jsonFile.status == 200) {
            blogPostData = jsonFile.responseText;
        }
     }


    var blog_area = document.getElementById("blog_area");
    var hiddenFrame = document.getElementById("blog_posts");
    var blogPostLines = blogPostData.split("\n");
    var isWriting = false;

    for (var i = 0; i < blogPostLines.length; i++)
    {
        var currentLine = blogPostLines[i];
        if (currentLine.includes("[newblog(")){
            isWriting = true;
            var blogMetaData = currentLine.split("(")[1].split(")")[0];
            var blogData = blogMetaData.split(",");
            var blogDate = blogData[0];
            var blogTime = blogData[1];
            var blogName = blogData[2];            

            blog_area.innerHTML += 
            `
            <!--<a href="https://store.steampowered.com/app/2214170/Wyoming_Winter/" target="_blank"> <img src="../assets/images/wyomingwinter.jpg" style="cursor: pointer;"> </a>-->
            <h3>${blogName} <span class="blog_date">${blogDate} - ${blogTime}</span></h3>
            `;
        }

        if(currentLine.includes("[/newblog]")){
            isWriting = false;
            blog_area.innerHTML += `<br>
            <br>
            <hr>`;
        }

        if(isWriting){
            blog_area.innerHTML += `<p>${currentLine}</p>`;
        }
    }
}