function save_bookmark() {
    let id = "kyungyeon";

    if (confirm_bookmark()) {
        return;
    }
    let url = $('#url').val()
    let category = $('#category').val()
    let comment = $('#comment').val();
    let data = {
        "id": id,
        "url": url,
        "category": category,
        "comment": comment
    };

    // dict to json
    json_data = JSON.stringify(data)
    $.ajax({
        type: "POST",
        url: "/save_bookmark",
        data: {"data_give": json_data},
        success: function(response) {
            alert(response["msg"]);
        },
    });
}

function confirm_bookmark() {
    if ($('#url').val().length == 0) {
        alert('url을 입력해주세요.');
        return true;
    }
    if ($('#category').val().length == 0) {
        alert('category를 입력해주세요.');
        return true;
    }

    return false;
}