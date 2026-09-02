
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


function shortenUrl(url) {
    fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    .then((resp) => {
        if(!resp.ok) {
            throw Error('Failed to fetch!');
        }
        return resp.text();
    })
    .then((urlText) => {
      console.log(urlText) 
       

    })
    .catch((err) => {
         console.warn(err.message);
    })
}

shortenUrl('https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame');
document.querySelector('.js-shorten-button').addEventListener('click', () => {
    document.querySelector('.js-form').addEventListener('submit', (event) => {
      event.preventDefault()



    });

});

const urls = [

];





