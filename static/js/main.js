let inputElm = document.querySelector('input[name=tags]'),
    whitelist = ['치킨', '피자'];

let tagify = new Tagify(inputElm, {
    enforceWhitelist: false,
    whitelist: whitelist,
    maxTags: 10,
    dropdown: {
        maxItems: 20, // 드롭다운 메뉴에서 몇개 정도 항목을 보여줄지
        classname: 'tags-look', // 드롭다운 메뉴 엘리먼트 클래스 이름. 이걸로 css 선택자로 쓰면 된다.
        enabled: 0, // 단어 몇글자 입력했을떄 추천 드롭다운 메뉴가 나타날지
        closeOnSelect: false, // 드롭다운 메뉴에서 태그 선택하면 자동으로 꺼지는지 안꺼지는지
    },
});

tagify.on('add', onAddTag); //

function onAddTag(e) {
    console.log('onAddTag: ', e.detail);
    tagify.off('add', onAddTag);
}

//=====================포스팅 팝업=========================

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

$('#close__postPop').click(function () {
    $(this).closest('#postPop').removeClass('reveal').fadeOut(200);
    $('body').removeClass('has-search');
});

//====================북마크 레이아웃========================
const bookmarkBtn = document.querySelector('.bookmark-btn');

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

function show_bookmark(id) {
    const bookmark_list = getBookMark(id)['bookmark_list'];

    bookmark_list.forEach((list) => {
        let id = list['id'];
        let image = list['image'];
        let title = list['title'];
        let tag = list['tag'];
        let category = list['category'];
        let url = list['url'];

        let tempHTML = `
        <div class="col cards-box">
                            <div class="cards-box__container logo">
                                <div class="cards-box__category"><span>${category}</span><button class="cards-box__closeBtn"></button></div>
                                <div class="cards-box__card" style="width: 18rem">
                                    <a href="${url}">
                                        <img src="${image}" class="cards-box__img" alt="bookimage" />

                                        <p class="cards-box__body-title">${title}</p>
                                    </a>
                                    <p class="cards-box__body-tag">${tag}</p>
                                </div>
                            </div>
                        </div>     
        `;
        $('#cards-box').append(tempHTML);
    });
}

show_bookmark();
