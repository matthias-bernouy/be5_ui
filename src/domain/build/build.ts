import fs from 'fs';
import buildCSS from "./css/buildCSS.js";
import buildIMG from "./image/buildIMG.js";
import buildHTML from "./html/buildHTML.js";
import staticServe, { closeServer } from '@/lib/server.js';
import optimizeImage from './image/optimizeImage/optimizeImage.js';
import getHTMLPathsFromDist from './html/getHTMLFiles.js';
import { closeBrowser } from '@/lib/browser.js';
import runCompression from './compression/runCompression.js';
import buildRobots from './seo/buildRobots.js';
import buildSitemap from './seo/buildSitemap.js';


export default async function Build() {

    console.warn = () => { };
    console.error = () => { };


    // (async () => {
    //     for (let i = 0; i < 5; i++) {
    //         viewReporting();
    //         await new Promise((resolve) => setTimeout(resolve, 1));
    //     }
    // })();

    // On clear le dossier.dist
    if (fs.existsSync(".dist")) {
        fs.rmSync(".dist", { recursive: true, force: true });
    }

    buildCSS();
    buildIMG();
    await buildHTML();
    buildRobots();
    buildSitemap();

    await staticServe();

    const htmlFiles = getHTMLPathsFromDist();


    await optimizeImage("/index.html");
    runCompression();
    // const promises = htmlFiles.map((htmlFile) => {
    //     optimizeImage(Global.server + htmlFile);
    // });
    // await Promise.all(promises);

    closeServer();
    closeBrowser();
}