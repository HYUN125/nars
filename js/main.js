// jQuery
$(document).ready(function(){
    const mySwiper = new Swiper(".mySwiper", {
        autoplay : {
            delay: 4000,
        },
        speed: 2000,
        loop: true,
        effect: 'fade',
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },

        on: {
           slideChange: function (){
                if($('.swiper-slide.banner-2').hasClass('swiper-slide-active')){
                    $('nav .main>li').find('a').css('color','white')
                    $('nav .sub li a').css('color','white')
                }else {
                    $('nav .main>li').find('a').css('color','black')
                    $('nav .sub li a').css('color','white')
                }
            },
        }
      });

      var swiper = new Swiper('.edition-swiper',{
        loop: true,
        autoplay : true,
        allowTouchMove: false,
        speed : 1000,
      })
      var swiper = new Swiper('.edit-bottom', {
        loop: true,
        autoplay : true,
        speed : 1000,
        allowTouchMove: false,
      })
      var swiper = new Swiper('.edit-img-swiper',{
        effect: 'fade',
        loop: true,
        autoplay : true,
        speed : 1000,
        allowTouchMove: false,
      })
      var swiper = new Swiper('.foun-item-swiper',{
        loop: true,
        autoplay : {
            reverseDirection : true,
            disableOnInteraction: false,
        },
        speed : 1000,
        allowTouchMove: false,
      })
      var swiper = new Swiper('.foun-img-swiper',{
        loop: true,
        autoplay : {
            disableOnInteraction: false,
        },
        speed : 1000,
        pagination : {
            el : '.foun-pagination',
        },
        allowTouchMove: false,
      })
      var swiper = new Swiper(".lipSwiper", {
        autoplay : true,
        loop: true,
        navigation: {
          prevEl: ".lip-prev",
          nextEl: ".lip-next",
        },
        slidesPerView : 2,
        breakpoints : {
            700 : {slidesPerView: 2},
            850 : {slidesPerView: 3},
            1400 : {slidesPerView: 4}
            
        },
        spaceBetween: 30,
      });
    
    
    //   메인배너 키프레임
      const introText = document.querySelectorAll(".mb-nars-al");
      window.onload = () => {
        let timer = 50;
        introText.forEach((item) => {
          item.style.animation = `fade 1000ms ${(timer += 200)}ms forwards`;
        });
      };
    
    
    AOS.init({
        duration: 1200,
      })


    const section = $('.wrap > section')
    const footer = $('.footer')
    let sectionSpeed = 500;
    let sectionPos = [];
    let sectionIndex = 0; //초기값

    // 연속 휠 막기
    let scrolling = false;
    let wheeling = true;
    const sectionMenu = $('.section-menu')


    function wheelCheckFn(){
        let windowWidth = window.innerWidth;
        // console.log(windowWidth)
        if(windowWidth <=1100){
            wheeling = false;
            sectionMenu.hide();
        }else{
            wheeling = true;
            sectionMenu.show();
        }
    }
    function resetSection(){
        sectionPos=[];
        $.each(section,function(index,item){
            let tempY = $(this).offset().top;
            tempY=Math.ceil(tempY)
            // 높이 정수처리(올림)
            sectionPos[index] = tempY;
        })
        sectionPos[sectionPos.length]=Math.ceil(footer.offset().top)
    }

    resetSection(); //새로고침

    // 총 section이 몇 개인지 확인 = footer까지 총 7개
    let sectionTotal = sectionPos.length;
    // console.log(sectionTotal)

    // resize 될때 너비 찾는 function
    $(window).resize(function(){
        wheelCheckFn();
        resetSection();
        if(wheeling){
            gsap.to($('html'),sectionSpeed/1100,{
                scrollTop:sectionPos[sectionIndex],
                // scrollTop=scrollTo
                onComplete: function(){
                    // onComplete = 마우스가 다 올라가면
                    scrolling = false;
                    // scrollong:false와 똑같다
                }
            })
        }
    })


    let resizeTimer;
    $(window).bind('resize', function(){
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(resizeFunction,500)
    })
    // function 함수 만든다
    function resizeFunction(){
        // 리사이즈 실행할 코드
        wheelCheckFn();
        resetSection();
        if(wheeling){
            // gsap.to($(요소명),durationTime,{설정})
            gsap.to($('html'),sectionSpeed/1100,{
                scrollTop:sectionPos[sectionIndex],
                // scrollTop=scrollTo
                onComplete: function(){
                    // onComplete = 마우스가 다 올라가면
                    scrolling = false;
                    // scrollong:false와 똑같다
                }
            })
        }
    }


    // 마우스 휠 체크 및 섹션 이동
    $(window).bind('mousewheel DOMMousescroll', function(event){
        let distance = event.originalEvent.wheelDelta;
        if (distance == null) {
            distance = event.originalEvent.detail * -1;
        }
        if (wheeling != true) {
            return;
        }
        if (scrolling) {
            // 초기값 false
            return;
        }
        scrolling=true;
        if(distance < 0){
            // 0보다 작다 - 스크롤 아래로
            sectionIndex++;
            // 휠이 아래로 내려가면 index값은 증가해야한다
            if(sectionIndex >=sectionTotal){
                // sectionTotal - 위에서 선언. 총 섹션개수 = 7
                sectionIndex = sectionTotal-1;
                // 인덱스가 6에서 멈추게 한다
            }
            // console.log(sectionIndex)
        }else{
            // 마우스스크롤이 위로 = 양수이면 섹션 index가 줄어들어야함
            sectionIndex--;
            if(sectionIndex <=0){
                sectionIndex=0;
            }
        }
        // console.log(sectionIndex)
        gsap.to($('html'),sectionSpeed / 1000,{
            scrollTop: sectionPos[sectionIndex],
            onComplete:function(){
                scrolling=false
            }
        })
    })

    //섹션 메뉴 클릭시 섹션 이동 - tab메뉴와 같은 원리
    const sectionLink = $('.section-menu a')
    // console.log(sectionLink)
    
    $.each(sectionLink,function(index, item){
        $(this).click(function(e){
            e.preventDefault();
            moveSection(index);
            sectionColor();
        })
    })

    function moveSection(_index){
        sectionIndex = _index;
        gsap.to($('html'), sectionSpeed/1000,{
            scrollTo: sectionPos[sectionIndex],
            onComplete: function(){
                scrolling=false;
            }
        })
    }
    // sticky gnb click
    $('.st-main li a').click(function(e){
        e.preventDefault();
        $(this).next().slideToggle().parent().siblings().children(sticky_sub).slideUp();
        $(this).parent().siblings().children().slideUp();
    })

    // bestseller-tab
    const tabAnchor = $('.hover-tab .box4 > a'),
    tabPanel = $('.tab')
    tabAnchor.mouseenter(function(e){
        e.preventDefault();
        tabAnchor.removeClass('active');
        $(this).addClass("active")
        tabPanel.hide(); // = display:none효과
        let target = $(this).attr('href')
        $(target).show();
        tabAnchor.mouseleave(function(){
            tabPanel.hide();
        })
    })

    // 모바일메뉴
    const mobileMenu = $('.mobile-menu'),
        mobileBt = $('.m-btn'),
        mMenu = $('.m-menu'),
        mMenuLi = $('.m-menu > li'),
        mMainMenu = $('.m-mainmenu'),
        mSubMenu = $('.m-submenu');
    
    $(window).resize(function(){
        let wSize = $(window).width();
        if(wSize > 1200){
            mobileMenu.removeClass('mobile-menu-active')
        }
    })
    mobileBt.click(function(e){
        e.preventDefault();
        let windowWidth = window.innerWidth;
        // 윈도우 너비 구하는 함수
        mMainMenu.removeClass('m-mainmenu-active')
        mSubMenu.hide();
        mobileMenu.toggleClass('mobile-menu-active')
        mobileBt.toggleClass('m-btn-open')
    })
    $.each(mMenuLi, function(index, item){
        let depth1 = $(this).find('.m-mainmenu')
        depth1.click(function(event){
            event.preventDefault()
            let temp = $(this).hasClass('m-mainmenu-active')
            if(temp){
                $(this).removeClass('m-mainmenu-active')
                $(this).next().stop().slideUp();
            }else {
                mMainMenu.removeClass('m-mainmenu-active')

                $(this).addClass('m-mainmenu-active')
                mSubMenu.stop().slideUp();
                $(this).next().stop().slideDown();
            }
        })
        })
});