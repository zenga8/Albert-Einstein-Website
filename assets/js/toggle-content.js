$(document).ready(function() {
    $('#toggle-button').click(function() {
        const content = $('#did-you-know-content');
        content.toggle();

        // Update button text based on content visibility
        if (content.is(':visible')) {
            $('#toggle-button').text('Show Less');
        } else {
            $('#toggle-button').text('Show More');
        }
    });
});
