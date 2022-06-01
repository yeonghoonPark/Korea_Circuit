/* 
 * 작성자, 박영훈
 *
 * koreacircuit 웹사이트 반응형 리뉴얼 js, jQuery 코드
 *
 * 마지막 업데이트, 2022년 06월 01일
*/

// javaScript
window.onload = function () {
    let circleLi = document.querySelectorAll('.circle>li');
    let navTri = document.getElementById('nav-trigger');
    let header = document.querySelector('.header');
    let navCon = document.querySelector('.nav-container');
    let subNav = document.querySelectorAll('.sub-nav');
    let navClo = document.querySelector('.nav-close');
    let langTri = document.getElementById('lang-trigger');
    let langTar = document.getElementById('lang-target');
    let slideBtn = document.querySelectorAll('.slide-btn');
    let slideVis = document.querySelectorAll('.slide-visual');
    let btnStop = document.querySelector('.stop');
    let btnPlay = document.querySelector('.play');
    let idx = 0;
    let btnFamily = document.querySelector('.btn-family');
    let ulFamily = document.querySelector('.ul-family');

    // SCROLL ACTIVE
    // 'scroll', => pageYOffset 조건에 따라 'circle-nav'의 li에 class="active"를 부여, li의 a에 background-position-y를 변경.
    addEventListener('scroll', () => {
        if (window.pageYOffset >= 0 && window.pageYOffset < 755) {
            circleClassRemove();
            circleLi[0].classList.add('active');
        } else if (window.pageYOffset >= 755 && window.pageYOffset < 1510) {
            circleClassRemove();
            circleLi[1].classList.add('active');
        } else if (window.pageYOffset >= 1510 && window.pageYOffset < 2265) {
            circleClassRemove();
            circleLi[2].classList.add('active');
        } else if (window.pageYOffset >= 2265 && window.pageYOffset < 2855) {
            circleClassRemove();
            circleLi[3].classList.add('active');
        } else {
            circleClassRemove();
            circleLi[4].classList.add('active');
        }
    });
    
    // CIRCLE NAV ACTIVE
    // 'click', => 'circle-nav'의 li에 class="active"를 부여, li의 a에 background-position-y를 변경.
    for (let idx = 0; idx < circleLi.length; idx++)
        circleLi[idx].addEventListener('click', () => {
            circleClassRemove();
            circleLi[idx].classList.add('active');
        })

    // NAV DISPLAY
    // 'mouseenter', 'mouseleave' => 'sub-nav'의 display를 조정, mouse의 enter, leave에 따라 block, none으로 변경.
    navTri.addEventListener('mouseenter', () => {
        navCon.style.display = 'block';
        for (idx = 0; idx < subNav.length; idx++) {
            subNav[idx].style.display = 'block';
        }
    })
    header.addEventListener('mouseleave', () => {
        navCon.style.display = 'none';
        for (idx = 0; idx < subNav.length; idx++) {
            subNav[idx].style.display = 'none';
        }
    })

    // NAV CLOSE BUTTON EVENT
    // 'click', => 'sub-nav'의 display를 none으로 변경.
    navClo.addEventListener('click', () => {
        navCon.style.display = 'none';
        for (idx = 0; idx < subNav.length; idx++) {
            subNav[idx].style.display = 'none';
        }
    })

    // LANGUIGE DISPLAY EVENT
    // 'click', => 'lang-target'의 class="active"를 토글하여 css로 display를 block, none으로 변환.
    langTri.addEventListener('click', () => {
        langTar.classList.toggle('active');
    })

    // SLIDE MOVE INTERVAL
    // 'setInterval', => 3초마다 'slide-visual', 'slide-btn'에 class="active" 부여하여 background가 변경.
    let slideMove = setInterval(function () {
        slideClassRemove();
        if (idx > 2) {
            idx = 0;
        }
        slideVis[idx].classList.add('active');
        slideBtn[idx++].classList.add('active');
    }, 3000);
    slideStop();
    slidePlay();
    slideBtnShow();

    // FAMILY DISPLAY EVENT
    // 'click', => 'btn-family', 'ul-family'에 class="active" 토글, css로 display를 block, none으로 변환.
    btnFamily.addEventListener('click', () => {
        btnFamily.classList.toggle('active');
        ulFamily.classList.toggle('active');
    })

    // FUNCTION
    function circleClassRemove() {
        for (let idx = 0; idx < circleLi.length; idx++) {
            circleLi[idx].classList.remove('active');
        }
    }

    function slideClassRemove() {
        for (let idx = 0; idx < slideVis.length; idx++) {
            slideVis[idx].classList.remove('active');
            slideBtn[idx].classList.remove('active');
        }
    }

    function slideClassToggle() {
        btnPlay.classList.toggle('active');
        btnStop.classList.toggle('active');
    }

    function slideStop() {
        btnStop.addEventListener('click', () => {
            clearInterval(slideMove);
            slideClassToggle();
        });
    }

    function slidePlay() {
        btnPlay.addEventListener('click', () => {
            slideMove = setInterval(function () {
                slideClassRemove();
                if (idx > 2) {
                    idx = 0;
                }
                slideVis[idx].classList.add('active');
                slideBtn[idx++].classList.add('active');
            }, 3000);
            slideClassToggle();
        });
    }

    function slideBtnShow() {
        for (let idx = 0; idx < slideBtn.length; idx++) {
            slideBtn[idx].addEventListener('click', () => {
                slideClassRemove();
                clearInterval(slideMove);
                btnPlay.classList.add('active');
                btnStop.classList.remove('active');
                slideVis[idx].classList.add('active');
                slideBtn[idx].classList.add('active');
            })
        }
    }
}

// jQuery
$(() => {
    let tmNavTri = $('.btn-nav');
    let tmNav = $('.tm-nav');
    let tmSubNavTri = $('.tm-nav-container>ul>li>a');
    let tmSubNav = $('.tm-sub-nav');

    // TM-NAV CALL
    // 'click', => 'tm-nav'의 class="active" 토글하여 css변환.
    $(tmNavTri).on({
        'click': () => {
            $(tmNav).toggleClass('active');
        }
    })

    // TM-NAV SLIDE
    // 'click', => 'tm-sub-nav'에 slideToggle메서드 이용, slideUp(Down)효과.
    $(function () {
        for (let idx = 0; idx < tmSubNavTri.length; idx++) {
            $(tmSubNavTri[idx]).on({
                'click': () => {
                    $(tmSubNav[idx]).slideToggle(200);
                }
            })
        }
    });
})