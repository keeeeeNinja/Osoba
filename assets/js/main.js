document.addEventListener("DOMContentLoaded", function(){
    var navToggle = document.getElementById("nav-toggle");
    var menuIcon = document.querySelector(".header__menu-icon");
    if(!navToggle || !menuIcon){
        return;
    }
    menuIcon.addEventListener("click", function(){
        navToggle.checked = !navToggle.checked;
    });
});


