const {ipcRenderer} = require('electron')
const dialog = require('electron').remote.dialog

document.addEventListener('DOMContentLoaded', function() {

    var button = document.getElementById('new-window');
    if (button) {
        button.addEventListener('click', () => {
            // open GitHub in a new Window
            window.open("https://www.github.com", "github", "resizable,scrollbars,status");
        });
    }


    var button2 = document.getElementById('relaunch');
    if (button2) {
        button2.addEventListener('click', () => {
            dialog.showMessageBox({type: 'question', buttons: ['ok', 'not now'], title: 'restart application', message: 'Do you want to restart the application now?'},
                response => {
                    if(response === 0) {
                        ipcRenderer.send('relaunch-message', '')
                    }
                }
            );
        });
    }

    var button3 = document.getElementById('quit');
    if (button3) {
        button3.addEventListener('click', () => {
            ipcRenderer.send('quit-message', '')
        });
    }

    var button4 = document.getElementById('border-window');
    if (button4) {
        button4.addEventListener('click', () => {
            ipcRenderer.send('border-message', '')
        });
    }

});

