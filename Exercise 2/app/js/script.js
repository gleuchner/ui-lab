
document.addEventListener('DOMContentLoaded', function() {

    var button = document.getElementById('new-window');
    if (button) {
        button.addEventListener('click', () => {
            // open GitHub in a new Window
            window.open("https://www.github.com", "github", "resizable,scrollbars,status");
        });
    }

});

