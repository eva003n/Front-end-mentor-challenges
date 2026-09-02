const themeSwitcherBtn = document.querySelector(".js-theme-toggler");

//get theme from storage and apply it
const theme = localStorage.getItem("theme") || "light";

if(theme !== "light") {
    themeSwitcherBtn.classList.add("active"); 

}


const htmlElement = document.querySelector("html");
htmlElement.setAttribute("data-theme", theme);

themeSwitcherBtn.addEventListener("click", () => {
    if(themeSwitcherBtn.classList.contains("active")) {
        //light-mode
        htmlElement.dataset.theme="light";
         saveThemeToStorage(htmlElement.dataset.theme);
        themeSwitcherBtn.classList.remove("active");
        themeSwitcherBtn.classList.add("disabled");
      
   
    }else {
        //dark-mode
        htmlElement.dataset.theme="dark";
        //save theme to local storage
        saveThemeToStorage(htmlElement.dataset.theme);
        themeSwitcherBtn.classList.add("active"); 
        themeSwitcherBtn.classList.remove("disabled"); 

    }
});
//save to storage
function saveThemeToStorage(theme) {
    localStorage.setItem("theme", theme);
}
