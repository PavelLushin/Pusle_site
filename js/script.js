$(document).ready(function(){
    $('.carousel_inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [
            {
            breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }]
      });

      $('ul.catalog_tabs').on('click', 'li:not(catalog_tab_active)', function() {
        $(this)
          .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
                $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
            })
        });
    };

    toggleSlide('.catalog_item_link');
    toggleSlide('.catalog_item_back');

    //---------------------------------------Modal windows scripts-----------------------------------------//
    
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow')
    });

    $('.modal_close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
    });

    $('.button_buy').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal_descr').text($('.catalog_item_subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow')
        })
    });


    function valideForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7(999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // pageup script---------------------------------------------------

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});

