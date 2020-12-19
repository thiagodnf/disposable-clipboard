$(function(){

    $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });

    $('#form-create').validate({
        errorElement: 'p',
        errorClass: 'text-pink mt-2',
        rules: {
            content: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            expirationTime: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            }
        }
    });
})
