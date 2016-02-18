 $('.content-box__course-box').hover(function(){
        $(this).find('.content-box__course-box__course-content').addClass('flipped');
        
        //return false;
    });

$('.content-box__course-box').find('.content-box__course-box__course-content').removeClass('flipped');