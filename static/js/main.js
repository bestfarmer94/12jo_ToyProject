/*==========포스팅 팝업*/
$(document).ready(function () {
    var target = $('#postPop');
    $(document).on('click', '.nav__posting', function (e) {
        target
            .fadeIn(300, function () {
                $('#postPop__url').focus();
            })
            .addClass('reveal');
        $('body').addClass('has-url');
    });

    $(document).mouseup(function (e) {
        if (target.has(e.target).length == 0) {
            target
                .fadeOut(300, function () {
                    $('body').removeClass('has-url');
                })
                .removeClass('reveal');
        }
    });
});
