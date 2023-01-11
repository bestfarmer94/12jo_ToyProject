const bookmarkBtn = document.querySelector('.bookmark-btn');

bookmarkBtn.addEventListener('click', () => {
    show_bookmark();
});

function getBookMark(id = 'kyungyeon') {
    let bookmark_list = {};
    $('#cards-box').empty();
    $.ajax({
        type: 'POST',
        url: '/show_bookmark',
        data: { id_give: id },
        async: false,
        success: function (response) {
            bookmark_list = response;
        },
    });

    return bookmark_list;
}

function show_bookmark() {
    const bookmark_list = getBookMark()['bookmark_list'];

    bookmark_list.forEach((list) => {
        let id = list['id'];
        let image = list['image'];
        let title = list['title'];
        let comment = list['comment'];
        let category = list['category'];
        let url = list['url'];

        let tempHTML = `
                <div class="col">
                  <a class="logo" href="${url}">
                        <div class="card h-100">
                          <img src="${image}"
                            class="card-img-top">
                          <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${category}</p>
                            <p>$</p>
                            <p class="mycomment">${comment}</p>
                        </div>
                    </div>
                  </a>
                </div>
        `;
        $('#cards-box').append(tempHTML);
    });
}
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
