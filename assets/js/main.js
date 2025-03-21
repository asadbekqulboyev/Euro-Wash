$(document).ready(function () {

// Dropdowns
$(".header__hamburger").click(function () {
    $(".header__hamburger-menu").toggleClass("active");
    if($(".header__hamburger-menu").hasClass("active")) {
        $(this).children("img").attr("src", "assets/images/menu_close.svg");
    } else {
        $(this).children("img").attr("src", "assets/images/hamburger-dots.svg");
    }
});

$(".menu-overlay").click(function () {
    $(".hamburger-menu").removeClass("active");
});

$('.header__catalog').click(function (e) {
    e.preventDefault(); 
    $('.catalog_icon').toggleClass('active');
    $('.catalog').toggleClass('active');
    if ($('.catalog').hasClass('active')) {
        $('.catalog').stop(true, true).slideDown(); // Animatsiyani tekislash
        $('.header__catalog_icon').attr('src', 'assets/images/Hamburger_close.svg');
    } else {
        $('.catalog').stop(true, true).slideUp();
        $('.header__catalog_icon').attr('src', 'assets/images/Hamburger.svg');
    }
    e.stopPropagation();
});

$(window).click(function (e) {
    if (!$(e.target).closest('.catalog, .header__catalog').length) { 
        $('.catalog').removeClass('active').slideUp();
        $('.header__catalog_icon').attr('src', 'assets/images/Hamburger.svg');
    }
});

  
  $('.catalog__menu-item a').click(function () {
    $('.catalog__menu-item a').removeClass('active')
        $('.catalog__menu-content').fadeOut(0)/
        $(this).addClass('active')
        $($(this).attr('href')).fadeIn()
  });
  const catalog_slider = new Swiper('.catalog_slider',{
    spaceBetween:40,
    slidesPerView:6,
    breakpoints: {
        0: {
            slidesPerView: 1.2,
        },
        768: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 6,
        },
    },
    navigation:{
        prevEl:'.slide_btn.prev',
        nextEl:'.slide_btn.next'
    }
  })
// Modals
$(".header__location").click(function () {
    $(".header__dropdown").toggleClass("is-active");
});

$("#open-search-modal").click(function () {
    $(".header__modal-overlay").css("display", "flex").hide().fadeIn();
});

$(document).on("click", ".close-modal, .header__modal-overlay", function (event) {
    if ($(event.target).hasClass(".header__modal-overlay") || $(event.target).hasClass("close-modal")) {
        $(".header__modal-overlay").fadeOut(function () {
            $(this).css("display", "none");
        });
    }
});

$("#search-form").submit(function (event) {
    event.preventDefault();
});

$("#search-city").on("input", function () {
    let searchValue = $(this).val().toLowerCase();
    $(".city-item").each(function () {
        $(this).toggle($(this).text().toLowerCase().includes(searchValue));
    });
});

$(document).on("click", ".city-item", function () {
    let selectedCity = $(this).text();
    $(".row__location span").text(selectedCity);
    $("..header__modal-overlay").fadeOut(function () {
        $(this).css("display", "none");
    });
});

// Tabs

let defaultSwiper = $(".brands__tabs--tab_contents .content.active .swiper");
if (defaultSwiper.length > 0) {
    new Swiper(defaultSwiper[0], {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        grid: {
            rows: 2,
            fill: "row",
        },
        breakpoints: {
            980: {
                slidesPerView: 2,
            },
            480 :{
                grid: {
                    rows: 1
                }
            }

        },
    });
}

$(".brands__tabs--buttons .button").click(function () {
    let target = $(this).data("tab");

    $(".brands__tabs--buttons .button").removeClass("active");
    $(this).addClass("active");

    $(".brands__tabs--tab_contents .content").css("opacity", 0);
    setTimeout(() => {
        $(".brands__tabs--tab_contents .content").removeClass("active");
        $("#" + target).addClass("active").css("opacity", 1);

        let tabsSwiper = $("#" + target).find(".swiper");
        if (tabsSwiper.length > 0) {
            new Swiper(tabsSwiper[0], {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                grid: {
                    rows: 2,
                    fill: "row",
                },
                breakpoints: {
                    980: {
                        slidesPerView: 2,
                    },
                    480 :{
                        grid: {
                            rows: 1
                        }
                    }
                },
            });
        }
    }, 300);
});



// Swipers 
    // main swiper

    var buttonsSwiper = new Swiper(".buttonSwiper", {
        loop: true, 
        spaceBetween: 10, 
        slidesPerView: 3,
        navigation: {
            nextEl: ".main-swiper-next",
            prevEl: ".main-swiper-prev",
        },
        pagination: {
            el: ".main-swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            980: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        }
    });

    var swiper = new Swiper(".mainSwiper", {
        loop: true, 
        spaceBetween: 20, 
        slidesPerView: 1,
        navigation: {
            nextEl: ".main-swiper-next",
            prevEl: ".main-swiper-prev",
        },
        pagination: {
            el: ".main-swiper-pagination",
            clickable: true,
        },
    });
    var swiper = new Swiper(".productDay", {
        loop: true, 
        spaceBetween: 20, 
        slidesPerView: 1,
        navigation: {
            nextEl: ".product-next",
            prevEl: ".product-prev",
        },
        pagination: {
            el: ".product-pagination",
            clickable: true,
        },
        breakpoints:{
            1024: {
                slidesPerView : 1
            },
            768: {
                slidesPerView: 2,
            }
        },
    });
    var onsaleSwiper = new Swiper(".onsaleSwiper", {
        loop: true, 
        spaceBetween: 10, 
        slidesPerView: 1.2,
        navigation: {
            nextEl: ".onsale-next",
           
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            768:{
                slidesPerView: 2,
                spaceBetween: 24, 
            },
        },
    });

    var onsaleSwiper = new Swiper(".imageSwiper", {
        loop: true, 
        slidesPerView: 1,
        pagination: {
            el: ".image-swiper-pagination",
            clickable: true,
        },
        nested: true,
    });

    var onsaleSwiper = new Swiper(".bestSellerSwiper", {
        loop: true, 
        slidesPerView: 1.2,
        spaceBetween:10,
        pagination: {
            el: ".image-swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".bestSeller-next",
            prevEl: ".bestSeller-prev"
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            980: {
                slidesPerView: 3
            },
            768:{
                slidesPerView: 2,
                spaceBetween:24,
            },
        },
        nested: true,
    });

    

    // Toglle image
    $(".swiper-slide__saving").click(function(event) {
        event.preventDefault()
        // Toggle icons
        $(this).find(".basket-icon").toggle();
        $(this).find(".check-icon").toggle();
    
    });
});