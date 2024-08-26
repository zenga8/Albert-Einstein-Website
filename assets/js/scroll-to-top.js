$(document).ready(function() {
    // Show or hide the scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });

    // Scroll to top when the button is clicked
    $('#scroll-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});
