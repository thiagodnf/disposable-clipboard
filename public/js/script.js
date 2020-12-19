$(function () {

    $(".countdown").each(function (event) {

        const $this = $(this);

        const method = $this.data("method");
        const target = $this.data("target");

        if (method == "manual") {
            $this.parent().text("Expired");
        } else {

            const interval = setInterval(function () {

                const time = countdown(new Date(target)).toString();

                if (!time) {

                    $this.parent().text("Expired");

                    window.clearInterval(interval);
                }else{
                    $this.text(time);
                }

            }, 1000);
        }
    });

    console.log(countdown(new Date(2000, 0, 1), new Date(2000, 0, 1)).toString());

    new ClipboardJS('.btn');

    $('.navbar-nav>li>a').on('click', function () {
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
