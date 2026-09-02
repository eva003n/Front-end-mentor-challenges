const navbarToggle = document.querySelectorAll(".js-navbar-toogle");
const navbar = document.querySelector(".js-navbar");

navbarToggle.forEach((button) => {
    button.addEventListener("click", () => {

        if(navbar.classList.contains("slide-in")) {
            // already open
            navbar.classList.remove("slide-in")
            navbar.classList.add("slide-out")
        
        

        }else {
            //cloaed
            navbar.classList.remove("slide-out")
            navbar.classList.add("slide-in")
          

        }
    });
});