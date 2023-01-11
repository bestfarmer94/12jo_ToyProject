function save_bookmark() {

    let id = "kyungyeon";

    let url = $('#postPop__url').val();
    let category = $('#category').val();
    let hash = $('#hash').val();
    let data = {
        'id': id,
        'url': url,
        'category': category,
        'hash': hash
    };

    // dict to json
    json_data = JSON.stringify(data);
    $.ajax({
        type: 'POST',
        url: '/save_bookmark',
        data: { 'data_give': json_data },
        success: function(response) {
            alert(response['msg']);
        },
    });
}
