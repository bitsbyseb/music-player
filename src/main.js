import { app, BrowserWindow, ipcMain } from 'electron';
import { readdir,writeFile } from 'fs/promises';
import {parseFile} from 'music-metadata';
import { join, resolve } from 'node:path';

function createWindow() {
    const window = new BrowserWindow({
        width:300,
        height:570,
        resizable:false,
        autoHideMenuBar:true,
        webPreferences:{
            preload:join(import.meta.dirname,'preload.js'),
            contextIsolation:true,
            nodeIntegration:false
        },
        icon:'./ico.ico'
    });

    window.loadFile('./src/static/index.html')
}

ipcMain.handle('songs',async () => {
    const files = await readdir('./songs');
    return files;
});


ipcMain.handle('get_song',async (_,songName) => {
    const songs = await readdir('./songs');
    if (!songs.includes(songName)) {
        return undefined;
    }
    const absolutePath = resolve('./songs',songName);
    return absolutePath;
});

ipcMain.handle('get_cover',async (_,songName) => {
    const currentCovers = await readdir('./covers');
    const foundCover = currentCovers.find(x => x.includes(songName));

    if (typeof foundCover === 'string') {
        return resolve('./covers',foundCover);
    }

    const metadata = await parseFile(`./songs/${songName}`);
    const cover = metadata.common.picture?.[0];

    if (!cover) return undefined;

    await writeFile(cover.name,cover.data);
    return resolve('./covers',cover.name);
});

app.whenReady().then(() => createWindow())
