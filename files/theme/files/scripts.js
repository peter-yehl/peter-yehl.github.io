document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.querySelector('.hamburger');
    var navWrap = document.querySelector('.nav-wrap');

    hamburger.addEventListener('click', function (event) {
        event.preventDefault();
        navWrap.classList.toggle('show');
    });
});
