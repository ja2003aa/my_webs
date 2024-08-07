document.addEventListener('DOMContentLoaded', function () {
    var options = {
        strings: ["Machine Learning Engineer", "Developer", "Web Designer", "Data Scientits", "Script Writer"],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 2000,
        loop: true,
        showCursor: false // Disable Typed.js cursor, we'll use our own
    };

    var typed = new Typed("#typed-text", options);
});
