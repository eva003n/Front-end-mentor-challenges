
const menuButton = document.querySelector('.js-menu-toggle');
const menu = document.querySelector('.js-menu');
menuButton.addEventListener('click', () => {
    if(menu.classList.contains('open')) {
        menu.classList.remove('open');
        menu.classList.add('closed');
        menuButton.classList.remove('open-toggle');
        

    }else {
        menu.classList.add('open');
        menu.classList.remove('closed');
        menuButton.classList.add('open-toggle');
    }

});

function copyToClipboard(text) {
navigator.clipboard.writeText(text)
.then((resp) => {

    console.log('copied to clipboard');
})
}
function extractUrlInput() {
    
    let urlInput = document.querySelector('.js-url-input');
    urlInput = urlInput.value;
    return urlInput;

}


// shortenUrl('https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame');
document.querySelector('.js-shorten-button').addEventListener('click', () => {
    document.querySelector('.js-form').addEventListener('submit', (event) => {
      event.preventDefault();
   
    const urlInput = extractUrlInput();

      if(urlInput !== '') {
        shortenUrl(urlInput.trim());
        document.querySelector('.js-url-input').value = '';
         document.querySelector('.js-url-input').classList.remove('input');
        document.querySelector('.js-empty-input').innerHTML = '';

        
            document.querySelector('.js-loader').classList.add('reveal-loader'); 
            
            // document.querySelector('.js-url-input').classList.remove('input');
            document.querySelector('.js-empty-input').classList.remove('error')
    
      }else {
        document.querySelector('.js-empty-input').classList.add('error')
        document.querySelector('.js-url-input').classList.add('input');
      }
    



    });

});
let urls;
 urls = JSON.parse(localStorage.getItem('urls')) || [

];
function saveUrlData(originalUrl, shortUrl) {
    let matchingUrl;
    urls.forEach((urlItem) => {
        if(urlItem.originalUrl === originalUrl) {
            matchingUrl = urlItem;

        }

    })
    if(!matchingUrl) {
        urls.push({
        
            originalUrl,
            shortUrl,
    });

    }
    saveToStorage();
    
}
let loaderTimeout;
function renderUrlResults() {
let urlHtml = '';
let urlId = 0;


    urls.forEach((urlItem) => {
        urlId++;
        urlHtml += `
         <li class=" url-container ">
            <a href="" class="original-url" >${urlItem.originalUrl}</a>
            <a href="${urlItem.shortUrl}" target="_blank" class="mini-url js-short-url-${urlId}">${urlItem.shortUrl}</a>
            <button class="button copy js-copy-button js-copy-${urlId}" data-url-id="${urlId}">Copy</button>
           </li>
        `


    });


 
document.querySelector('.js-url-results').innerHTML = urlHtml;
document.querySelectorAll('.js-copy-button').forEach((copyButton) => {
    copyButton.addEventListener('click', () => {
        const {urlId} = copyButton.dataset;
        let copyText = document.querySelector(`.js-short-url-${urlId}`);
        copyText = copyText.textContent;
        copyToClipboard(copyText);
        document.querySelector(`.js-copy-${urlId}`).innerHTML = 'copied';
        document.querySelector(`.js-copy-${urlId}`).classList.add('copied');

    });

});

}
function saveToStorage() {
    localStorage.setItem('urls', JSON.stringify(urls));
}

renderUrlResults();
function shortenUrl(url) {
    fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    .then((resp) => {
        if(!resp.ok) {
            throw Error('Failed to fetch!');
          
        }
        return resp.text();
    })
    .then((urlText) => {
        setTimeout(() => {
            document.querySelector('.js-loader').classList.remove('reveal-loader'); 
   
            saveUrlData(url, urlText);
          renderUrlResults();

        }, 2000)
       
       

    })
    .catch((err) => {
         console.warn(err.message);
    })
}

 document.querySelector('.js-url-input').addEventListener('keyDown', (e) => {
if(e.key === 'Enter') {
    const urlInput = extractUrlInput();
    shortenUrl(urlInput.trim());

}

 });




