const tagName = window.location.href.split('github.com/')[1].split('/')[1];
const endpoint = `https://api.stackexchange.com/2.3/search/advanced?pagesize=5&order=desc&sort=votes&accepted=True&tagged=${tagName}&site=stackoverflow`;

let contentBox = document.createElement('div');

fetch(endpoint)
    .then(res => res.json())
    .then(json => {
        contentBox.className = 'faqsidebar';
        for (let i = 0; i < json.items.length; i++){
            subContent = document.createElement('div');
            titleContent = document.createElement('div');
            linkContent = document.createElement('div');
            scoreContent = document.createElement('div');
            titleContent.textContent += json.items[i].title;
            linkContent.textContent += json.items[i].link;
            scoreContent.textContent += json.items[i].score;
            subContent.appendChild(titleContent);
            subContent.appendChild(linkContent);
            subContent.appendChild(scoreContent);
            contentBox.appendChild(subContent);
        }
});

document.body.appendChild(contentBox);