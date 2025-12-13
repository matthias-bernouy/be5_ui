import { exec } from 'child_process';
import browserSync from 'browser-sync';
import { watch } from 'chokidar';
import path from 'path';
import fs from 'fs';

const DIST_DIR = path.resolve('.dist');

function cleanUrlMiddleware(req: any, res: any, next: any) {
    let url = req.url;

    if (url.endsWith('/')) {
        return next();
    }

    if (url !== '/' && url.indexOf('.') === -1) {

        const potentialHtmlFile = path.join(DIST_DIR, url + '.html');
        if (fs.existsSync(potentialHtmlFile)) {
            req.url += '.html';
        }
    }
    next();
}

browserSync.init({
    server: {
        baseDir: ".dist",
        middleware: [cleanUrlMiddleware]
    },
    open: true,
    notify: false,
    port: 8080
});

const watcher = watch('src/**/*', {
    ignored: /node_modules/,
    ignoreInitial: true
});

async function handleFileChange(filePath: string) {
    try {
        exec('npm run build');
        browserSync.reload();
    } catch (error) {
        console.error('Erreur lors de la compilation:', error);
    }
}

watcher.on('add', handleFileChange);
watcher.on('change', handleFileChange);
watcher.on('unlink', handleFileChange);

