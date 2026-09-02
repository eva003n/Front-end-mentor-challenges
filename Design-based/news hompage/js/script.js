const menu = document.querySelector(".nav__navbar");
const overlay = document.querySelector(".overlay");
const Toggle = document.querySelectorAll(".toggle-sidebar");
let menuToggle;
console.log(Toggle);
Toggle.forEach((Toggle) =>
  Toggle.addEventListener("click", () => {
    // menuToggle = e.target.class;
    if (menu.classList.contains("opened-sidebar")) {
      //close menu
      menu.classList.remove("opened-sidebar");
      menu.classList.add("closed-sidebar");
      overlay.classList.remove("appear");
      overlay.classList.add("disappear");
    } else {
      menu.classList.add("opened-sidebar"); //open menubar
      menu.classList.remove("closed-sidebar");
      overlay.classList.add("appear");
      overlay.classList.remove("disappear");
    }
  })
);
overlay.addEventListener("click", () => {
  overlay.classList.add("disappear");
  menu.classList.remove("opened-sidebar"); //close sidebar
  menu.classList.add("closed-sidebar");
});
