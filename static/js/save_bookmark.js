$(document).ready(function () {
    save_bookmark();
});
//POST
function save_bookmark() {
    let id = 'kyungyeon';

    let url = $('#url').val();
    let category = $('#category').val();
    let comment = $('#comment').val();
    let data = {
        id: id,
        url: url,
        category: category,
        comment: comment,
    };

    // dict to json
    json_data = JSON.stringify(data);
    $.ajax({
        type: 'POST',
        url: '/save_bookmark',
        data: { data_give: json_data },
        success: function (response) {
            alert(response['msg']);
        },
    });
}

//GET
function show_bookmark() {
    let id = 'kyungyeon';
    $('#cards-box').empty();
    $.ajax({
        type: 'POST',
        url: '/show_bookmark',
        data: { id_give: id },
        success: function (response) {
            bookmark_list = response;
            let rows = response['bookmark_list'];
            for (let i = 0; i < rows.length; i++) {
                let id = rows[i]['id'];
                let image = rows[i]['image'];
                let title = rows[i]['title'];
                let comment = rows[i]['comment'];
                let category = rows[i]['category'];
                let url = rows[i]['url'];

                let tempHTML = `
                <div class="col">
                            <div class="card h-100">
                                <img src="${image}"
                                     class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${category}</p>
                                    <p>${url}</p>
                                    <p class="mycomment">${comment}</p>
                                </div>
                            </div>
                        </div>
                    `;
                $('#cards-box').append(tempHTML);

                console.log(tempHTML);
            }
        },
    });
}
