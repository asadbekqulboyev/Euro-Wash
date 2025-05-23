$(document).ready(function () {
  function header_menu() {
    $(".header__hamburger").click(function () {
      $("body").toggleClass("is-active");
      $(".header__mobile_menu").toggleClass("active");
      if ($(".header__mobile_menu").hasClass("active")) {
        $(this).children("img").attr("src", "assets/images/menu_close.svg");
      } else {
        $(this).children("img").attr("src", "assets/images/hamburger-dots.svg");
      }
    });
    $(".menu-overlay").click(function () {
      $(".hamburger-menu").removeClass("active");
    });
    $(".header__catalog").click(function (e) {
      e.preventDefault();
      $("body").toggleClass("is-active");
      $(".catalog_icon").toggleClass("active");
      $(".catalog").toggleClass("active");
      if ($(".catalog").hasClass("active")) {
        $(".catalog").stop(true, true).slideDown(); // Animatsiyani tekislash
        $(".header__catalog_icon").attr(
          "src",
          "assets/images/Hamburger_close.svg"
        );
      } else {
        $(".catalog").stop(true, true).slideUp();
        $(".header__catalog_icon").attr("src", "assets/images/Hamburger.svg");
      }
      e.stopPropagation();
    });
  }
  header_menu();
  function header_bottom() {
    if (innerWidth < 768) {
      let clickedOnce = false;
      $(".header__bottom_form-button").prop("disabled", false);
      $(".header__bottom_form-button").click(function (e) {
        e.preventDefault();
        if (!clickedOnce) {
          $(".header__bottom_form").addClass("is-active");
          $(".header__bottom .container").css({
            "justify-content": "flex-end",
          });
          $(".header__bottom_form-button").css({
            left: "auto",
            "margin-right": "48px",
          });
          $(".header__bottom_form__close").css({
            display: "block",
          });

          clickedOnce = true;
        } else {
          $(".header__bottom_form").submit();
        }
      });
      $(".header__bottom_form__close").click(function () {
        $(".header__bottom_form").removeClass("is-active"); // Formani yopamiz

        $(this).css({
          display: "none",
        });

        $(".header__bottom_form-button").css({
          left: "0",
          "margin-right": "0",
        });

        $(".header__bottom .container").css({
          "justify-content": "space-between",
        });

        clickedOnce = false; // Holatni yana boshlang‘ich holatga qaytaramiz
      });
    }
    let searchInput = $(".header__bottom_form__input");
    let searchResults = $(".search__results");

    // Inputga fokus bo'lsa natijalarni ko'rsatish
    searchInput.on("focus", function () {
      searchResults.fadeIn();
    });
    searchInput.on("focusout", function () {
      searchResults.fadeOut();
    });
  }
  header_bottom();
  function initCatalog() {
    $(window).click(function (e) {
      if (!$(e.target).closest(".catalog, .header__catalog").length) {
        $(".catalog").removeClass("active").slideUp();
        $(".header__catalog_icon").attr("src", "assets/images/Hamburger.svg");
      }
    });

    $(".catalog__menu-item a").click(function () {
      $(".catalog .container").addClass("is-open");
      $(".catalog__menu-item a").removeClass("active");
      $(".catalog__menu-content").fadeOut(0);
      $(this).addClass("active");
      $($(this).attr("href")).fadeIn();
    });

    $(".catalog__content_top").click(function () {
      $(".catalog .container").removeClass("is-open");
    });

    const catalog_slider = new Swiper(".catalog_slider", {
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
        prevEl: ".slide_btn.prev",
        nextEl: ".slide_btn.next",
      },
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
    $(document).on(
      "click",
      ".close-modal, .header__modal-overlay",
      function (event) {
        if (
          $(event.target).hasClass(".header__modal-overlay") ||
          $(event.target).hasClass("close-modal")
        ) {
          $(".header__modal-overlay").fadeOut(function () {
            $(this).css("display", "none");
          });
        }
      }
    );
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
  }
  header_location();

  function brands() {
    let defaultSwiper = $(
      ".brands__tabs--tab_contents .content.active .swiper"
    );
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
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
            grid: {
              rows: 1,
            },
          },
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
        $("#" + target)
          .addClass("active")
          .css("opacity", 1);

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
              0: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                grid: {
                  rows: 1,
                },
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
      },
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
      breakpoints: {
        1024: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
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
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
      },
    });

    var onsaleSwiperse = [];
    $(".imageSwiper").each(function (index) {
      var swiperis = new Swiper(this, {
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: ".image-swiper-pagination",
          clickable: true,
        },
        nested: true,
        freeMode: true,
        allowTouchMove: true,
      });

      // Har bir Swiper'ni massivga saqlaymiz
      onsaleSwiperse.push({
        swiper: swiperis, // Swiper obyektini saqlaymiz
        container: $(this).closest(".swiper-slide__image"), // Uning konteynerini saqlaymiz
      });
    });

    $(".custom-dot").on("mouseenter", function () {
      var index = $(this).data("index");
      var parentSwiperContainer = $(this).closest(".swiper-slide__image");
      var targetSwiper = onsaleSwiperse.find((item) =>
        item.container.is(parentSwiperContainer)
      );

      // Agar Swiper topilgan bo‘lsa, faqat o‘sha Swiper harakatlanadi
      if (targetSwiper) {
        targetSwiper.swiper.slideTo(index);
      }

      // Faqat shu konteyner ichidagi `.custom-dot` larni yangilaymiz
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
    });
    $(document).ready(function () {
      $(".bestSellerSwiper").each(function (index) {
        var $this = $(this); // Joriy slider
        var swiper = new Swiper(this, {
          loop: true,
          slidesPerView: 1.12,
          spaceBetween: 10,
          pagination: {
            el: $this.siblings(".image-swiper-pagination").get(0), // Paginationni o‘z slideriga bog‘lash
            clickable: true,
          },
          navigation: {
            nextEl: $this.siblings(".bestSeller-next").get(0), // Faqat shu slider uchun Next
            prevEl: $this.siblings(".bestSeller-prev").get(0), // Faqat shu slider uchun Prev
          },
          breakpoints: {
            1400: { slidesPerView: 4 },
            1300: { slidesPerView: 3.2 },
            1200: { slidesPerView: 3.2 },
            980: { slidesPerView: 3 },
            768: { slidesPerView: 2, spaceBetween: 24 },
          },
          nested: true,
        });
      });
    });

    $(".swiper-slide__saving").click(function (event) {
      event.preventDefault();
      $(this).find(".basket-icon").toggle();
      $(this).find(".check-icon").toggle();
    });
  }
  sliders();
  function modals() {
    $("[data-fancybox]:not(.favorites__shop_filterlists)").fancybox({
      touch: false,
      autoFocus: false,
      animationEffect: "fade",
      transitionEffect: "slide",
      buttons: ["close"],
      smallBtn: false,
      clickOutside: true, // Fonga bosilganda yopish
    });

    // Yopish tugmasi bosilganda modalni yopish
    $(".modal_close").on("click", function () {
      $.fancybox.close();
    });

    // FON (overlay) bosilganda modalni yopish
    $(".modal__overlay").on("click", function () {
      $.fancybox.close(); // Fancybox modalni yopish
    });
  }
  modals();
  $(".filter_open").click(function (e) {
    e.preventDefault();
    $('#filter').fadeIn();
    $('body').addClass('is-active');
  });
  $('.filter_mobile_close').click(function (e) {
    e.preventDefault();
    $('#filter').fadeOut();
    $('body').removeClass('is-active');
  });
  $("#filter").click(function(e){
    if(e.target.id == "filter"){
      $(this).fadeOut();
      $('body').removeClass('is-active');
    }
  })

  $(".content_btn").click(function () {
    $(this).fadeOut();
    $(".content__item").fadeIn().css({ display: "flex" });
  });

  function dropdown() {
    $(".favorites_btn").click(function () {
      $(".favorites_btn-content").slideToggle(200);
    });
    $(document).click(function (event) {
      if (!$(event.target).closest(".favorites__bottom-btn").length) {
        $(".favorites_btn-content").slideUp(200);
      }
    });
  }
  dropdown();
  function CountProduct() {
    $(".cart__btn--plus").click(function () {
      let input = $(this).siblings(".cart__input");
      let value = parseInt(input.val());
      input.val(value + 1);
    });

    $(".cart__btn--minus").click(function () {
      let input = $(this).siblings(".cart__input");
      let value = parseInt(input.val());
      if (value > 1) {
        input.val(value - 1);
      }
    });

    $(".cart__remove").click(function () {
      $(this).closest(".cart__item").remove();
    });
  }
  CountProduct();
  function commentTab() {
    $(".product__tabs__content__products__item").hide();
    $("#product_tab1").show();

    $(".product__tabs__content__links__item a").on("click", function (e) {
      e.preventDefault();
      let target = $(this).attr("href");

      if (!$(this).hasClass("active")) {
        $(".product__tabs__content__links__item a").removeClass("active");
        $(this).addClass("active");

        $(".product__tabs__content__products__item:visible")
          .stop(true, true)
          .fadeOut(200, function () {
            $(target).stop(true, true).fadeIn(200);
          });
      }
    });
  }
  commentTab();
  function thumbSliders() {
    var thumbsSlider = new Swiper(".thumbs-slider", {
      spaceBetween: 8,
      slidesPerView: 5,
      // Thumbnaillarni vertikal qilish
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        0: {
          slidesPerView: 4.2,
          direction: "horizontal",
        },
        769: {
          slidesPerView: 5,
          direction: "vertical",
        },
      },
    });

    var mainSlider = new Swiper(".main-slider", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".button_slider.next",
        prevEl: ".button_slider.prev",
      },
      thumbs: {
        swiper: thumbsSlider,
      },
    });
  }
  thumbSliders();
  // product radio color size ...
  function Radios() {
    new Swiper(".swiper-color", {
      slidesPerView: 3.4,
      spaceBetween: 17,
      navigation: {
        nextEl: ".color .slide_btn.next",
        prevEl: ".color .slide_btn.prev",
      },
    });

    new Swiper(".swiper-bowl", {
      slidesPerView: 3.4,
      spaceBetween: 17,
      navigation: {
        nextEl: ".bowl .slide_btn.next",
        prevEl: ".bowl .slide_btn.prev",
      },
    });

    new Swiper(".swiper-btn", {
      slidesPerView: 2.6,
      spaceBetween: 17,
      navigation: {
        nextEl: ".btn .slide_btn.next",
        prevEl: ".btn .slide_btn.prev",
      },
    });
    // Input radio bosilganda active qilish
    $('.swiper-slide input[type="radio"]').change(function () {
      let name = $(this).attr("name"); // Qaysi radio guruhi ekanini olish
      $(`input[name="${name}"]`).parent().removeClass("active"); // Boshqa elementlardan active olib tashlash
      $(this).parent().addClass("active"); // Tanlangan elementga active qo'shish
    });
  }
  Radios();
  $(".comparison__item-header").click(function () {
    $(this).toggleClass("is-active");
    if ($(this).hasClass("is-active")) {
      $(this).next().slideDown();
    } else {
      $(this).next().slideUp();
    }
  });
  function initRangeSlider(
    sliderId,
    inputMinId,
    inputMaxId,
    minValue,
    maxValue,
    startMin,
    startMax
  ) {
    const slider = document.getElementById(sliderId);
    const inputMin = document.getElementById(inputMinId);
    const inputMax = document.getElementById(inputMaxId);

    if (!slider || !inputMin || !inputMax) return;

    noUiSlider.create(slider, {
      start: [startMin, startMax],
      connect: true,
      range: {
        min: minValue,
        max: maxValue,
      },
      format: {
        to: (value) => Math.round(value),
        from: (value) => Number(value),
      },
    });

    slider.noUiSlider.on("update", (values, handle) => {
      if (handle === 0) {
        inputMin.value = values[0];
      } else {
        inputMax.value = values[1];
      }
    });

    inputMin.addEventListener("change", () => {
      slider.noUiSlider.set([inputMin.value, null]);
    });

    inputMax.addEventListener("change", () => {
      slider.noUiSlider.set([null, inputMax.value]);
    });
  }

  // 👇 Foydalanish:
  initRangeSlider(
    "slider",
    "input-min",
    "input-max",
    10000,
    1100000,
    10560,
    1056000
  );
  $(".favorites__shop_item-header").on("click", function () {
    $(this).toggleClass("is-active");
    $(this).next(".favorites__shop_content").slideToggle();
  });
  function initSortDropdown(selector) {
    $(selector).each(function () {
      const $dropdown = $(this);
      const $inputWrapper = $dropdown.find(".sort_input_wrapper"); // input + icon ni o'rab turuvchi div
      const $input = $dropdown.find(".sort_input");
      const $arrow_icon = $dropdown.find(".arrow_icon");
      const $options = $dropdown.find(".sort_options");
      const $items = $options.find("li");

      $inputWrapper.on("click", function () {
        $options.slideToggle(150).toggleClass("active");
        $arrow_icon.toggleClass("active");
      });

      $items.on("click", function () {
        const selectedText = $(this).text();
        $input.val(selectedText);
        $items.removeClass("active");
        $(this).addClass("active");
        $options.slideUp(150);
        $arrow_icon.removeClass("active");
        const sortType = $(this).data("sort");
        console.log("Saralash turi:", sortType);
        // Agar kerak bo‘lsa, bu yerga custom callback qo‘shish mumkin
      });

      $(document).on("click", function (e) {
        if (!$(e.target).closest($dropdown).length) {
          $options.slideUp(150);
          $arrow_icon.removeClass("active");
        }
      });
    });
  }
  initSortDropdown(".sort_dropdown");

  $(".position_btn").click(function () {
    $(".position_btn").removeClass("is-active");
    $(this).addClass("is-active");
    if ($(".position_btn:eq(1)").hasClass("is-active")) {
      $(".position_btn").removeClass("active");
      $(".favorites__content").addClass("is-active");
    } else {
      $(".position_btn").removeClass("active");
      $(".favorites__content").removeClass("is-active");
    }
  });
  function PhoneMask (){
    if($('input[type="tel"]').length){
      $('input[type="tel"]').inputmask({
        mask: "+998 (99) 999-99-99",
        placeholder: "_",
        showMaskOnHover: false,
        showMaskOnFocus: true
      });
    }
  }
  PhoneMask()
  function Opens_lists() {
    function bindDesktopClicks() {
      $('.form_left_price-item').off('click').on('click', function () {
        if ($(window).width() > 768) {
          $(this).toggleClass('is-active');
          $(this).children('.open__products_lists').slideToggle();
        }
      });
    }
  
    function bindMobileClicks() {
      $('.form_left_price-item .button.open_products').off('click').on('click', function (e) {
        if ($(window).width() <= 768) {
          e.preventDefault(); // <--- Shu yerga qo‘shildi
          e.stopPropagation();
  
          const list = $(this).closest('.form_left_price-item').children('.open__products_lists');
          $(this).closest('.form_left_price-item').toggleClass('is-active');
          list.slideToggle();
        }
      });
    }
  
    function bindEventsBasedOnScreen() {
      bindDesktopClicks();
      bindMobileClicks();
    }
  
    bindEventsBasedOnScreen();
  
    $(window).resize(function () {
      bindEventsBasedOnScreen();
    });
  }
  
  Opens_lists();
  
  
});
console.warn = function () {};
