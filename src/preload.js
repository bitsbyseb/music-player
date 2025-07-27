const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('player',{
    songs:() => ipcRenderer.invoke('songs'),
    getSong:(songName) => ipcRenderer.invoke('get_song',songName),
    getCover:(songName) => ipcRenderer.invoke('get_cover',songName)
});