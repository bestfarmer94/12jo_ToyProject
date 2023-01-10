// navbar toggle
$('#nav-toggle').click(function () {
    $(this).toggleClass('is-active');
    $('ul.nav').toggleClass('show');
});

// navbar scroll
$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $('.custom-navbar').addClass('scroll');
    } else {
        $('.custom-navbar').removeClass('scroll');
    }
});
