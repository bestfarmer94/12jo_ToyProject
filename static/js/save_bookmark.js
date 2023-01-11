//save_bookmark.js

//POST
// function save_bookmark() {
//     let id = 'kyungyeon';

//     if (confirm_bookmark()) {
//         return;
//     }
//     let url = $('#url').val();
//     let category = $('#category').val();
//     let comment = $('#comment').val();
//     let data = {
//         id: id,
//         url: url,
//         category: category,
//         comment: comment,
//     };

//     // dict to json
//     json_data = JSON.stringify(data);
//     $.ajax({
//         type: 'POST',
//         url: '/save_bookmark',
//         data: { data_give: json_data },
//         success: function (response) {
//             alert(response['msg']);
//         },
//     });
// }

// function confirm_bookmark() {
//     if ($('#url').val().length == 0) {
//         alert('url을 입력해주세요.');
//         return true;
//     }
//     if ($('#category').val().length == 0) {
//         alert('category를 입력해주세요.');
//         return true;
//     }

//     return false;
// }

//GET
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
