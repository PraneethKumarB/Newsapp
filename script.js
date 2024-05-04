const API_KEY = "75643927958d47e1a9e055f9e5f711ba";         //NEWSAPI.ORG
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);  // AFTER CREATING API URL U WILL GET JSON FORMAT 
    const data = await res.json();                               // JAVASCRIPT OBJECT NOTATION  CONSISTING KEY AND VALUES 
    bindData(data.articles);                                    //IN THIS U WILL GET ARTICLES ARRAY COSISTING ARTICLES  
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";                                          // TO LIMIT THE NO OF CARDS

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);//means every div inside this template wil be cloned
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);//all clones into the container
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");//id from html file
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;// to set the title
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",//to chang to local time 
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");// opens in new window
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);// above function which binds the data 
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");// when clicked on finanse colour from ipl removed
    curSelectedNav = navItem;//attaching new one
    curSelectedNav.classList.add("active");//giving it active class
}

const searchButton = document.getElementById("search-button");// from  html
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});