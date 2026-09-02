const menuBtn = document.querySelector('#js-hamburger');
const overlay = document.querySelector('.overlay');
const mobileMenu = document.querySelector('.menu_mob');
menuBtn.addEventListener('click', ()=>{
    if (menuBtn.classList.contains('open')){//close menubar
        menuBtn.classList.remove('open');
        overlay.classList.remove('appear');
        overlay.classList.add('disappear');
        mobileMenu.classList.remove('display');
        mobileMenu.classList.add('disappear');

       

    }else{
        menuBtn.classList.add('open');//open menubar
        overlay.classList.add('appear');
        overlay.classList.remove('disappear');
        mobileMenu.classList.add('display');
        mobileMenu.classList.remove('disappear');
    }


});
