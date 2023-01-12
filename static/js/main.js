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
});

$('#close__postPop').click(function () {
    $(this).closest('#postPop').removeClass('reveal').fadeOut(200);
    $('body').removeClass('has-url');
});

$('#bookmark-post').click(function () {
    const postURL = $('#postPop__url').val();
    const catagoryData = $('#category').val();

    const tagArray = tagify.value.map((tag) => tag['value']);

    const bookmarkData = {
        id: 'kyungyeon',
        url: postURL,
        category: catagoryData,
        hash: tagArray,
    };

    // console.log(postURL, catagory, JSON.stringify(tagArray));

    saveBookMark('/save_bookmark', {
        data_give: JSON.stringify(bookmarkData),
    });

    window.location.reload();
});

//==============카테고리 팝업=================
// const tagCloudTags = document.querySelectorAll('.tag-cloud__tags');

function addCategoryPopUp() {
    const parse_hash = bookmark_list
        .map((list) => list['hash'])
        .join(',')
        .split(',');

    let inputElm = document.querySelector('input[name=tags]'),
        whitelist = parse_hash;

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

    $('.tag-cloud__list *').empty();
    let parse_category = bookmark_list.map((list) => list['category']);

    parse_category = new Set(parse_category);

    parse_category.forEach((category) => {
        const tag_html = `
          <span class="tag-cloud__tags">
                <i class="fad fa-tags tags-i"></i> ${category}
          </span>
          `;

        $('.tag-cloud__list').append(tag_html);
    });
}

//====================북마크 레이아웃========================
let bookmark_list = {};

document.addEventListener('click', (e) => {
    const targetName = e.target.className;
    if (targetName === 'cards-box__closeBtn') {
        const number = e.target.parentNode.parentNode.dataset.number;
        deleteBookMark('/delete', { number_give: Number(number) });

        window.location.reload();
    }
});

function ajaxBookMark(url, data) {
    bookmark_list = {};
    $('#cards-box').empty();
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        async: false,
        success: function (response) {
            if (response['msg']) {
                alert(response['msg']);
            }
            bookmark_list = response;
        },
        error: function () {
            // alert('url을 확인해 주세요');
        },
    });

    return bookmark_list;
}

function showBookMark(id) {
    bookmark_list = ajaxBookMark(
        '/show_bookmark', //
        { id_give: 'kyungyeon' } //
    )['bookmark_list'];

    bookmark_list.forEach((list) => {
        const id = list['id'];
        const number = list['number'];
        const image = list['image'];
        const title = list['title'];
        const category = list['category'];
        const url = list['url'];
        let hash = list['hash'];

        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

        hash = hash.map((tag) => `#${tag.replace(reg, '')}`).join(' ');

        const tempHTML = `
                        <div class="col cards-box" data-aos="fade-up" data-aos-delay="200" data-aos-easing="ease-in-out" data-aos-once="false">
                        <div class="cards-box__container logo" data-number="${number}">
                            <div class="cards-box__category"><span>${category}</span><button class="cards-box__closeBtn"></button></div>
                            <div class="cards-box__card" style="width: 18rem">
                                <a href="${url}">
                                    <img src="${image}" class="cards-box__img" alt="bookimage" />

                                    <p class="cards-box__body-title">${title}</p>
                                </a>
                                <p class="cards-box__body-tag">${hash}</p>
                            </div>
                        </div>
                    </div>
        `;

        $('#cards-box').append(tempHTML);
    });

    addCategoryPopUp();
}

function saveBookMark(url, data) {
    return ajaxBookMark(url, data);
}

function deleteBookMark(url, data) {
    return ajaxBookMark(url, data);
}

// ================ 실행 함수 ===============

showBookMark();
