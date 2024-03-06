const body = document.querySelector("body"),
      sidebar = document.querySelector(".sidebar"),
      toggle = document.querySelector(".toggle"),
      search = document.querySelector(".search-box"),
      modeSwitch = document.querySelector(".toggle-switch"),
      modeText = document.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

search.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        modeText.innerText = "Light Mode"
    }else{
        modeText.innerText = "Dark Mode"
    }
})