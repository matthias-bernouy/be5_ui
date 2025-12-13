import * as zlib from 'node:zlib';
import * as fs from 'node:fs';
import { getHTMLFiles } from '../html/getHTMLFiles.js';
import { getCSSFiles } from '../css/getCSSFiles.js';

export default function runCompression() {

    const htmlFiles = getHTMLFiles();
    const cssFiles = getCSSFiles();

    for (const htmlFile of htmlFiles) {
        const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
        const gzip = zlib.gzipSync(htmlContent);
        fs.writeFileSync(htmlFile + '.gz', gzip);
        const brotli = zlib.brotliCompressSync(htmlContent);
        fs.writeFileSync(htmlFile + '.br', brotli);
    }

    for (const cssFile of cssFiles) {
        const cssContent = fs.readFileSync(cssFile, 'utf-8');
        const gzip = zlib.gzipSync(cssContent);
        fs.writeFileSync(cssFile + '.gz', gzip);
        const brotli = zlib.brotliCompressSync(cssContent);
        fs.writeFileSync(cssFile + '.br', brotli);
    }
}