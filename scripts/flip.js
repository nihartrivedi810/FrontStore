 $('.content-box__course-box').click(function(){
        $(this).find('.content-box__course-box__course-content').addClass('flipped').mouseleave(function(){
            $(this).removeClass('flipped');
        });
        return false;
    });