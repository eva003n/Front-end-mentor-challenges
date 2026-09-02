const shareButton = document.querySelectorAll(".js-share");
const socials = document.querySelector(".js-socials");

shareButton.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    if (socials.classList.contains("appear")) {
      socials.classList.remove("appear"); //close share option
      socials.classList.add("disappear");
    } else {
      socials.classList.remove("disappear"); //open share option
      socials.classList.add("appear");
    }
  });
});

