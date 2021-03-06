// Node Libs
const path = require('path');
const url = require('url');

// Electron Libs
const {BrowserWindow} = require('electron').remote;

// Custom Libs
const sounds = require('../../libs/sounds.js');

function showModalWindow(dialogOptions, returnChannel = '', ...rest) {
  let modalWin = new BrowserWindow({
    width: 450,
    height: 220,
    backgroundColor: '#282828',
    frame: false,
    show: false,
  });
  modalWin.loadURL(
    url.format({
      pathname: path.resolve(__dirname, '../modal/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  modalWin.on('close', () => (modalWin = null));
  modalWin.webContents.on('did-finish-load', function() {
    modalWin.webContents.send(
      'update-modal',
      dialogOptions,
      returnChannel,
      ...rest
    );
  });
  modalWin.on('ready-to-show', () => {
    modalWin.show();
    modalWin.focus();
    sounds.play('DIALOG');
  });
}

module.exports = showModalWindow;
