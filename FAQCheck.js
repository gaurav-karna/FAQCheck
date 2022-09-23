const tagName = window.location.href.split('github.com/')[1].split('/')[1];
const endpoint = `https://api.stackexchange.com/2.3/search/advanced?pagesize=5&order=desc&sort=votes&accepted=True&tagged=${tagName}&site=stackoverflow`;

let badge = document.createElement('div');
badge.id = 'faqcheckbadge'
document.body.prepend(badge);

var elemdiv = document.createElement('div');
elemdiv.id = 'imagediv';
var elem = document.createElement("img");
elem.id = 'imgelem';
elem.src = chrome.extension.getURL('nasapod128x128.png');
elem.onclick = showContentBox;

document.getElementById("faqcheckbadge").appendChild(elemdiv);
document.getElementById("imagediv").appendChild(elem);

var clickToMoveElem = document.createElement("div");
clickToMoveElem.id = 'faqcheckbadgeheader';
clickToMoveElem.innerHTML += "Click here to move"

document.getElementById("faqcheckbadge").appendChild(clickToMoveElem);

function showContentBox() {
    contentBox.style.top = document.getElementById("faqcheckbadge").style.top;
    document.body.prepend(contentBox);
    document.body.removeChild(badge);
}

function hideContentBox() {
    document.body.removeChild(contentBox);
    document.body.prepend(badge);
}

let contentBox = document.createElement('div');

fetch(endpoint)
    .then(res => res.json())
    .then(json => {
        contentBox.className = 'faqsidebar';
        contentBox.onclick = hideContentBox;
        titleArea = document.createElement('div');
        titleContent = document.createElement('h2');
        titleContent.textContent = `StackOverflow Threads for ${tagName}`;
        titleArea.appendChild(titleContent);
        contentBox.appendChild(titleArea);
        for (let i = 0; i < json.items.length; i++) {
            subContent = document.createElement('div');
            titleContent = document.createElement('div');
            linkContent = document.createElement('div');
            //scoreContent = document.createElement('div');
            titleValue = document.createElement('h5');
            titleValue.textContent = json.items[i].title;
            titleValue.textContent += ` - Score: ${json.items[i].score}`;

            titleContent.appendChild(titleValue);
            
            linkValue = document.createElement('a');
            linkValue.href = json.items[i].link;
            linkValue.textContent = 'View on StackOverflow.com';
            linkValue.target = '_blank';
            linkContent.appendChild(linkValue);
            
            //scoreContent.textContent = json.items[i].score;
            
            subContent.appendChild(titleContent);
            subContent.appendChild(linkContent);
            //subContent.appendChild(scoreContent);
            contentBox.appendChild(subContent);
        }
    });

dragElement(document.getElementById("faqcheckbadge"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        //elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}