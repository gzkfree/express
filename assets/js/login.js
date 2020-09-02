$(function () {
    $('#login').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/admin/login',
            data: {
                email: $('#email').val(),
                password: $('#password').val(),
            },
            dataType: 'json',
            success: function (result) {
                if(result.code=='201'){
                    $('.alert-danger').css('display','block')
                    $('#tip').text(result.msg)
                }else{
                    location.href='/admin'
                }
            }
        })
    })
})