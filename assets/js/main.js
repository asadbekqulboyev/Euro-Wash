$(document).ready(function () {

function header_menu () {
    $(".header__hamburger").click(function () {
        $(".header__mobile_menu").toggleClass("active");
        if($(".header__mobile_menu").hasClass("active")) {
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
}
header_menu()
function header_bottom (){
    if(innerWidth < 456){   
    let clickedOnce = false; 
    $('.header__bottom_form-button').prop('disabled', false);
    $('.header__bottom_form-button').click(function (e) {
        e.preventDefault(); 
        if (!clickedOnce) {
            $('.header__bottom_form').addClass('is-active'); 
            $('.header__bottom .container').css({
                'justify-content': 'flex-end',
            });
            $('.header__bottom_form-button').css({
                'left': 'auto',
                'margin-right': '48px'
            });
            $('.header__bottom_form__close').css({
                'display': 'block'
            });
    
            clickedOnce = true; 
        } else {
            $('.header__bottom_form').submit(); 
        }
    });
    $('.header__bottom_form__close').click(function () { 
        $('.header__bottom_form').removeClass('is-active'); // Formani yopamiz
    
        $(this).css({
            'display': 'none'
        });
    
        $('.header__bottom_form-button').css({
            'left': '0',
            'margin-right': '0'
        });
    
        $('.header__bottom .container').css({
            'justify-content': 'space-between',
        });
    
        clickedOnce = false; // Holatni yana boshlang‘ich holatga qaytaramiz
    });
    }
    let searchInput = $(".header__bottom_form__input");
    let searchResults = $(".search__results");

    // Inputga fokus bo'lsa natijalarni ko'rsatish
    searchInput.on("focus", function() {
        searchResults.fadeIn();
    });
    searchInput.on("focusout", function() {
        searchResults.fadeOut();
    });
}
header_bottom()
function initCatalog() {
    $(window).click(function (e) {
        if (!$(e.target).closest('.catalog, .header__catalog').length) { 
            $('.catalog').removeClass('active').slideUp();
            $('.header__catalog_icon').attr('src', 'assets/images/Hamburger.svg');
        }
    });

    $('.catalog__menu-item a').click(function () {
        $('.catalog .container').addClass('is-open');
        $('.catalog__menu-item a').removeClass('active');
        $('.catalog__menu-content').fadeOut(0);
        $(this).addClass('active');
        $($(this).attr('href')).fadeIn();
    });

    $('.catalog__content_top').click(function(){
        $('.catalog .container').removeClass('is-open');
    });

    const catalog_slider = new Swiper('.catalog_slider', {
        spaceBetween: 40,
        slidesPerView: 6,
        breakpoints: {
            0: {
                slidesPerView: 3,
            },
            556: {
                slidesPerView: 2.5,
            },
            768: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 6,
            },
        },
        navigation: {
            prevEl: '.slide_btn.prev',
            nextEl: '.slide_btn.next'
        }
    });
}
initCatalog();

function header_location() {
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
    })
}
header_location();
// function brands() { 

//     let defaultSwiper = $(".brands__tabs--tab_contents .content.active .swiper");
//     if (defaultSwiper.length > 0) {
//         new Swiper(defaultSwiper[0], {
//             slidesPerView: 1,
//             spaceBetween: 24,
//             loop: true,
//             grid: {
//                 rows: 2,
//                 fill: "row",
//             },
//             breakpoints: {
//                 980: {
//                     slidesPerView: 2,
//                 },
//                 480 :{
//                     grid: {
//                         rows: 3
//                     }
//                 }
    
//             },
//         });
//     }
//     $(".brands__tabs--buttons .button").click(function () {
//         let target = $(this).data("tab");
    
//         $(".brands__tabs--buttons .button").removeClass("active");
//         $(this).addClass("active");
//         $(".brands__tabs--tab_contents .content").css("opacity", 0);
//         setTimeout(() => {
//             $(".brands__tabs--tab_contents .content").removeClass("active");
//             $("#" + target).addClass("active").css("opacity", 1);
//             let tabsSwiper = $("#" + target).find(".swiper");
//             if (tabsSwiper.length > 0) {
//                 new Swiper(tabsSwiper[0], {
//                     slidesPerView: 1.5,
//                     spaceBetween: 24,
//                     loop: true,
//                     grid: {
//                         rows: 2,
//                         fill: "row",
//                     },
//                     breakpoints: {
//                         0: {
//                             slidesPerView: 1.2,
//                             grid:{
//                                 rows: 1
//                             },
//                         },
//                         980: {
//                             slidesPerView: 2,
//                         },
                        
//                     },
//                 });
//             }
//         }, 0);
//     });
//     var buttonsSwiper = new Swiper(".buttonSwiper", {
//             loop: true, 
//             spaceBetween: 10, 
//             slidesPerView: 2.9,
//             navigation: {
//                 nextEl: ".main-swiper-next",
//                 prevEl: ".main-swiper-prev",
//             },
//             pagination: {
//                 el: ".main-swiper-pagination",
//                 clickable: true,
//             },
//             breakpoints: {
               
//                 980: {
//                     slidesPerView: 5,
//                     spaceBetween: 20,
//                 },
//             }
//     });
//     if (innerWidth < 980) {
//         defaultSwiper[0].swiper = new Swiper(defaultSwiper[0] ,{
//             breakpoints: {
//                 spaceBetween:24,
//                 0: {
//                     grid: {
//                         rows: 1,
//                         fill: "row",
//                         spaceBetween: 0
//                     },
//                 }
//             }
//         })
        
//     }
  
// }
//  brands()

function brands() { 

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
                0: { // 980px dan kichik ekranda 1ta qatorda 1.2 slide bo‘lib harakatlanadi
                    slidesPerView: 1.2,
                    spaceBetween: 10,
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
                    slidesPerView: 1.5,
                    spaceBetween: 24,
                    loop: true,
                    grid: {
                        rows: 2,
                        fill: "row",
                    },
                    breakpoints: {
                        0: { // 980px dan kichik ekranda 1.2 slayd
                            slidesPerView: 1.2,
                            spaceBetween: 10,
                            grid: {
                                rows: 1
                            }
                        },
                        980: {
                            slidesPerView: 2,
                        },
                    },
                });
            }
        }, 0);
    });

    var buttonsSwiper = new Swiper(".buttonSwiper", {
        loop: true, 
        spaceBetween: 10, 
        slidesPerView: 2.9,
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
}

brands();


function sliders() {
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
                1440: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 2.4,
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
    $(".swiper-slide__saving").click(function(event) {
            event.preventDefault()
            $(this).find(".basket-icon").toggle();
            $(this).find(".check-icon").toggle();
        
    });
}
sliders()
function modals() { 
    $("[data-fancybox]").fancybox({
        touch: false,
        autoFocus: false,
        animationEffect: "fade",
        transitionEffect: "slide",
        buttons: ["close"],
        smallBtn: false, 
        clickOutside: true, // Fonga bosilganda yopish
    });

    // Yopish tugmasi bosilganda modalni yopish
    $(".modal_close").on("click", function() {
        $.fancybox.close();
    });

    // FON (overlay) bosilganda modalni yopish
    $(".modal__overlay").on("click", function () {
        $.fancybox.close(); // Fancybox modalni yopish
    });
}

modals();

});
console.warn = function() {};