
// from https://petrapixel.neocities.org/coding/layout-base-code
// initLayout() is called once the DOM (the HTML content of your website) has been loaded.
document.addEventListener("DOMContentLoaded", function () {
  
  // var testID = document.getElementById("test");

  // The layout will be loaded on all pages that do NOT have the "no-layout" class in the <body> element.
  if (!document.body.classList.contains("no-layout")) {
    // Inserting your header and footer:
    document.body.insertAdjacentHTML("afterbegin", headerEl);
    document.body.insertAdjacentHTML("beforeend", footerEl);
    document.head.insertAdjacentHTML("afterbegin", basic_info);
    document.head.insertAdjacentHTML("afterbegin", css_links);

    // Inserting sidebars:
    const wrapperElement = document.querySelector("main"); // you might have to change this selector to something like .my-wrapper
    if (wrapperElement) {
      wrapperElement.insertAdjacentHTML("afterbegin", sidebarEl1);
      wrapperElement.insertAdjacentHTML("beforeend", sidebarEl2);
    }

    initActiveLinks();
  }

  // add your own javascript code here...
});



/* ********************************* */

/**
 *  F U N C T I O N S
 */

function initActiveLinks() {
  // This function adds the class "active" to any link that links to the current page.
  // This is helpful for styling the active menu item.

  const pathname = window.location.pathname;
  [...document.querySelectorAll("a")].forEach((el) => {
    const elHref = el
      .getAttribute("href")
      .replace(".html", "")
      .replace("/public", "");

    if (pathname == "/") {
      // homepage
      if (elHref == "/" || elHref == "/home.html") el.classList.add("active");
    } else {
      // other pages
      if (window.location.href.includes(elHref)) el.classList.add("active");
    }
  });
}



// NESTING
function getNestingString() {
  // This function prepares the "nesting" variable for your header and footer (see below).
  // Only change this function if you know what you're doing.
  const currentUrl = window.location.href
    .replace("http://", "")
    .replace("https://", "")
    .replace("/public/", "/");
  const numberOfSlahes = currentUrl.split("/").length - 1;
  if (numberOfSlahes == 1) return ".";
  if (numberOfSlahes == 2) return "..";
  return ".." + "/..".repeat(numberOfSlahes - 2);
}

/* ********************************* */

/**
 *  H T M L
 */

const nesting = getNestingString();

/**
  Use ${nesting} to output a . or .. or ../.. etc according to the current page's folder depth.
  Example:
    <img src="${nesting}/images/example.jpg" />
  will output
  	 <img src="./images/example.jpg" /> on a page that isn't in any folder.
    <img src="../images/example.jpg" /> on a page that is in a folder.
    <img src="../../images/example.jpg" /> on a page that is in a sub-folder.
    etc.
 */


// elements to add
const headerEl = `
        <div class = "topbar">
            <div class = "logo" id="logo">
                <a href="${nesting}/index.html"><img src="${nesting}/images/logo.png" alt="cookery made easy logo" style="width:70px;height:70px;"></a>
            </div>

            <div class="name" id="name">
                <h1>Cookery Made Easy</h1>
            </div>
            
            <div class="navbar">
                <ul> 
                    <li class="main_tabs" id="home_button"><a href="${nesting}/index.html">Home</a></li>
                    <li class="main_tabs" id="articles_button"><a href="${nesting}/all_articles.html">Articles</a></li>
                    <li class="main_tabs" id="about_button"><a href="${nesting}/about.html">About</a></li>
                </ul>
            </div>    

            <div class="searchbar" id="searchbar"> <!-- pagefind (search bar) https://pagefind.app/docs/ -->
                <pagefind-modal-trigger></pagefind-modal-trigger>
                <pagefind-modal></pagefind-modal>
            </div> 
          

        </div>
`;


// Insert your footer HTML inside these ``. You can use HTML as usual.
// Remove all the content inside the `` if you don't have a footer.
const footerEl = `
        <br>	
        <div class="footer">
        <footer>
        <br>
            
        </footer>
        </div>
`;

//<img src="${nesting}/images/watermelon.gif" class="img_footer">

// Insert your sidebar HTML inside these ``. You can use HTML as usual.
// Remove all the content inside the `` if you don't have a sidebar.
const sidebarEl1 = `	
`;

// Insert your sidebar HTML inside these ``. You can use HTML as usual.
// Remove all the content inside the `` if you don't have a sidebar.
const sidebarEl2 = `
`;

const basic_info = `
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width"/>

        <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png?v=20260629" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/my-favicon/favicon.svg?v=20260629" />
        <link rel="shortcut icon" href="/my-favicon/favicon.ico?v=20260629" />
        <link rel="apple-touch-icon" sizes="180x180" href="/my-favicon/apple-touch-icon.png?v=20260629" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/my-favicon/site.webmanifest?v=20260629" />
`;

// icons generated with https://realfavicongenerator.net/

const css_links = `                
              
        <link href="${nesting}/pagefind/pagefind-component-ui.css" rel="stylesheet">
`;

// <link rel="icon" href="${nesting}/images/logo.png"></link>