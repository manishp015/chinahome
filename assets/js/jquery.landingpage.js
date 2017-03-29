var i = 0;
function onLeaveSection(index, nextIndex, direction) {
    applyLeaveAnimation(index, nextIndex, direction);
}

function applyLeaveAnimation(index, nextIndex, direction) {

    console.log("NextIndex: " + nextIndex);
    if (nextIndex <= 1) {
        fadeOutSection(index);
        slideOutSectionBox(index);
        fadeInSection(nextIndex);
    }

    if (nextIndex <= 1) {
        $('.learn-more').animate({right: "0px"});
    } else {
        $('.learn-more').animate({right: "-240px"});
    }
    
    if (nextIndex <= 1) {
        $('.contact-signup').animate({right: "0px"});
    } else {
        $('.contact-signup').animate({right: "-240px"});
    }
    
    
}

function onAfterLoad(anchorLink, index) {
    slideInSectionBox(index);
}
var data1;
var data2;
function SetDefault(data1) {

    var data2 = document.getElementById("photoIntervalMaxTime").value;
    if (data1 != null && data2 != null && data2 - data1 < 90)
        document.getElementById("rangevalidationmin").style.display = "block";
    else
    {
        document.getElementById("rangevalidationmin").style.display = "none";
        document.getElementById("rangevalidationmax").style.display = "none";

    }
}

function SetDefault1(data2) {

    var data1 = document.getElementById("photoIntervalMinTime").value;
    if (data1 != null && data2 != null && data2 - data1 < 90)
        document.getElementById("rangevalidationmax").style.display = "block";
    else
    {
        document.getElementById("rangevalidationmax").style.display = "none";
        document.getElementById("rangevalidationmin").style.display = "none";
    }
}

function fadeInSection(index) {
    var $bg = $('.section-bg-' + index);
    var $elems = $('.section-' + index).find('.animate');
    $bg.stop().addClass('active').fadeIn(1500, function () {
    });
    $elems.removeClass('anim-hide').addClass('anim-show');
}

function slideInSectionBox(index) {
    var $box = $('.section-' + index).find('.section-box');
    if ($box.hasClass('left-box')) {
        $box.stop().animate({marginLeft: "2%", marginBottom: "0.5%"}, 1500, "easeOutCubic");
    } else if ($box.hasClass('right-box')) {
        $box.stop().animate({marginLeft: "2%", marginBottom: "0.5%"}, 500, "easeOutCubic");
    }
}

function slideOutSectionBox(index) {
    var $box = $('.section-' + index).find('.section-box');
    if ($box.hasClass('left-box')) {
        $box.stop().animate({marginLeft: "2%", marginBottom: "-10%"}, 5, "easeInCubic");
    } else if ($box.hasClass('right-box')) {
        $box.stop().animate({marginLeft: "2%", marginBottom: "-10%"}, 5, "easeInCubic");
    }
}

function fadeOutSection(index) {
    var $bg = $('.section-bg.active');
    var $elems = $('.section-' + index).find('.animate');
    $bg.stop().removeClass('active').fadeOut(1500, function () {
    });
    $elems.removeClass('anim-show').addClass('anim-hide');
    var $heads = $elems.filter('h2, h3');
}






    $('#fullpage').fullpage({
        verticalCentered: false,
        css3: true,
        scrollingSpeed: 1000,
        onLeave: function (index, nextIndex, direction) {
            slideOutSectionBox(index);
            onLeaveSection(index, nextIndex, direction);
            moveSection(nextIndex);
            $.fn.fullpage.moveTo(nextIndex, 0);
//            if (index > 2) {
            clearInterval(idInterval);
//            }

        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {

            slideInSectionBox(index);

        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {

            slideOutSectionBox(index);

        },
        afterLoad: function (anchorLink, index) {
            if (typeof (idInterval) != 'undefined')
            {
                clearInterval(idInterval);
            }
            if (index == 1) {
                idInterval = setInterval(function () {
                    $.fn.fullpage.moveSlideRight();
                }, 6000);
            }

            if (index == 2) {
                idInterval = setInterval(function () {
                    $.fn.fullpage.moveSlideRight();
                }, 8000);
            }
            //using index
//

            if (window.params.movesignup == "true")
            {
                window.params.movesignup = "false";
                goToSignup();
            }
            if (document.getElementsByClassName('fp-slidesNav').length > 0)
            {
                document.getElementsByClassName('fp-slidesNav')[1].style.display = "none";
                document.getElementsByClassName('fp-slidesNav')[0].style.marginLeft = "7%";
                document.getElementsByClassName('fp-slidesNav')[0].style.left = 0;
            }

            if (document.getElementsByClassName('right').length > 0)
                {
                    document.getElementsByClassName('right')[0].style.display = "none"
                }
            if (document.getElementsByClassName('fp-controlArrow fp-next').length > 0) {
                document.getElementsByClassName('fp-controlArrow fp-next')[0].style.display = "none";
                document.getElementsByClassName('fp-controlArrow fp-prev')[0].style.display = "none";
            }

            if (document.getElementsByClassName('fp-slidesNav bottom').length > 0)
            {
                document.getElementsByClassName('fp-slidesNav bottom')[0].childNodes[0].childNodes[0].childNodes[0].removeAttribute("href");
                document.getElementsByClassName('fp-slidesNav bottom')[0].childNodes[0].childNodes[1].childNodes[0].removeAttribute("href");
                document.getElementsByClassName('fp-slidesNav bottom')[0].childNodes[0].childNodes[2].childNodes[0].removeAttribute("href");
                document.getElementsByClassName('fp-slidesNav bottom')[0].childNodes[0].childNodes[3].childNodes[0].removeAttribute("href");

            }
            return onAfterLoad(anchorLink, index);
        },
        afterRender: function () {

        }
    });




//function showLandingPageInfograph() {
////    if (i > 0 )
//    if (typeof ($.fn.fullpage.destroy) != 'undefined')
//    {
//        $.fn.fullpage.destroy();
//    }
//
//
//    window.params = function () {
//        var params = {};
//        if (!(window.location.href.split('?')[1] === undefined)) {
//            var param_array = window.location.href.split('?')[1].split('&');
//            for (var i in param_array) {
//                x = param_array[i].split('=');
//                params[x[0]] = x[1];
//            }
//        }
//        return params;
//    }();
//
//
//    $('#fullpage5').fullpage({
//        fitToSection: false,
//        autoScrolling: false,
//        verticalCentered: false,
//        css3: true,
//        slidesNavigation: true,
//        navigation: false,
//        afterLoad: function (anchorLink, index) {
//
//
//
//            if (window.params.movesignup == "true")
//            {
//                window.params.movesignup = "false";
//                goToSignup();
//            }
//            if (document.getElementById('fp-nav') != null)
//            {
//                document.getElementById('fp-nav').style.display = 'none';
//
//            }
//            if (document.getElementsByClassName('fp-slidesNav').length > 0)
//            {
//                document.getElementsByClassName('fp-slidesNav')[0].style.marginLeft = "7%";
//                document.getElementsByClassName('fp-slidesNav')[0].style.left = 0;
//            }
//
//            if (document.getElementsByClassName('fp-controlArrow fp-next').length > 0) {
//                document.getElementsByClassName('fp-controlArrow fp-next')[0].style.display = "none";
//                document.getElementsByClassName('fp-controlArrow fp-prev')[0].style.display = "none";
//            }
//
//            if (document.getElementsByClassName('fp-slidesNav bottom').length > 0)
//            {
//                document.getElementsByClassName('fp-slidesNav bottom')[0].style.display = 'none'
////              document.getElementsByClassName('fp-slidesNav bottom')[1].style.display='none'
//
//            }
//            return onAfterLoad(anchorLink, index);
//        },
////        autoScrolling: true,
////        scrollBar:true
//        afterRender: function () {
//
//            setInterval(function () {
//                $.fn.fullpage.moveSlideRight();
//            }, 8000);
//        }
//    });
//
//    $.fn.fullpage.reBuild();
//}


function moveSection(index) {
    $.fn.fullpage.silentMoveTo(index);
}

function goToSignup() {
    $.fn.fullpage.moveTo(5, 0);
}
function goToSignupPricing() {
    window.location.href = "./?movesignup=true";


}



function    pauseVideo() {


}



function goToNextSection() {
    $.fn.fullpage.moveTo(9, 0);
    $.fn.fullpage.moveSectionDown();
}


$(document).ready(function () {
//    jQuery('.selectpicker').selectpicker();
    $('body').on('click', '#fp-nav a', function (e) {
        e.preventDefault();
    }).on('click', '.btn-signup, .link-signup', function (e) {
        e.preventDefault();
        goToSignup();
    }).on('click', '.btn-signup-pricing, .link-signup,.begin-now-first ,.trial-btn', function (e) {
        e.preventDefault();
        goToSignupPricing();
    }).on('click', '.scroll-icon', function () {
        goToNextSection();
    });




});
