var frame_bg_color = "#FFF4B5"

// prevent scrollbar of the iframe + sets the right color
function resizeIframe(obj) {
        obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
        obj.style.background = frame_bg_color;
        obj.contentWindow.document.body.style.backgroundColor = frame_bg_color;
}


// open only one tab at a time
function openContent(evt, contentPart) { // https://www.w3schools.com/howto/howto_js_tabs.asp
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(contentPart).style.display = "block";
  evt.currentTarget.className += " active";
 
  // resize iframe to avoid double scroll bar
  var iframeName = contentPart + "_iframe"
  var myIframe = document.getElementById(iframeName);
  resizeIframe(myIframe)

  // change iframe color
  var iframe = document.getElementById(iframeName);
  iframe.style.background = frame_bg_color;
  iframe.contentWindow.document.body.style.backgroundColor = frame_bg_color;
} 


// open a tab by default once the content has finished loading
window.addEventListener("DOMContentLoaded", function() { // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
  var default_button = document.getElementById("defaultOpen")
  default_button.click();
});



// build index dynamically
function buildIndex(index_name) {
  fetch("articles.json")
    .then((response) => {
      return response.json();
    })
    .then((page_name) => {
      const container = document.getElementById(index_name); // get the container you wish to access from your html page
      page_name.forEach((page) => {
        const tmpl = document.getElementById("index_template") // for each page, get the template
          .content.cloneNode(true); // clone the template
          
          if(page.categorization == index_name){ // if the section correspond to the categorization indicated in json, e.g. ingredients, core concepts...
            tmpl.querySelector(".article_title").innerText = page.article_name; // select which part from the template we want to fill, then select what key we want from the json
            tmpl.querySelector(".article_title").setAttribute("href", page.page_link); 
            tmpl.querySelector(".article_title").setAttribute("onclick", "return fetchArticle");

            // if there are children, i.e. nested articles, create a new entry and append it to the template
            // not directly part of the template so that there is no need to add a fixed number
            if (page.children.length > 0){
              page.children.forEach((sub_page) => {
              
              // create necessary elements  
              create_sub_page = document.createElement("a");
              create_line_break = document.createElement("br"); 

              // fill the new article info
              create_sub_page.innerText = sub_page.article_name;
              create_sub_page.className = "sub_article_title"; 
              create_sub_page.href  = sub_page.page_link;

              // append to template
              tmpl.appendChild(create_sub_page);
              tmpl.appendChild(create_line_break);
            
                }
              );
            }
        // append filled template to the "index" div of the page  
        container.appendChild(tmpl);        
          }
        }
      );
    }
  );
}

buildIndex("core concepts");
buildIndex("ingredients");

// when the page load, activate the sticky footer
window.addEventListener("load", activateStickyFooter);

function activateStickyFooter() {
  // need to adjust the footer top when the page just loads
  // because the footer may not be sticky
  adjustFooterCssTopToSticky();
  
  // whenever the window is resized, we need to re-adjust the
  // footer top to update its position
  window.addEventListener("resize", adjustFooterCssTopToSticky);
}



// OPEN RANDOM ARTICLE
var articles_urls = [];
window.addEventListener("DOMContentLoaded", function() {
  fetch("articles.json")
    .then((response) => {
      return response.json();
    })
    .then((page_url) => {
      page_url.forEach((url) => {
        articles_urls.push(url.page_link)
      })
    }
  )
}
);


window.addEventListener("DOMContentLoaded", function() {
  document.getElementById("random_article").addEventListener("click", function(){
    var random_artcl
    random_artcl = Math.floor(Math.random() * articles_urls.length);
    // alert(articles_urls[random_artcl])
    document.getElementById("link_button_random_artcl").setAttribute("href", articles_urls[random_artcl]);
  }
)}
);

