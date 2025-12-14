import { getFilesPath, mkdir, copyFile } from "@/lib/files.js";
import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";
import { renderToStaticMarkup } from "react-dom/server";
import { Global } from "@/Global.js";

export default async function buildHTML() {
    const pageFiles = getFilesPath(Global.pages);

    for (const file of pageFiles) {

        try {
            if (!file.endsWith('.tsx')) {
                continue;
            }
            const absoluteFileUrl = pathToFileURL(path.resolve(file)).toString();
            const module = await import(absoluteFileUrl + "?d=" + Date.now());
            const Composant = module.default;

            if (!Composant) {
                continue;
            }
            const elementReact = <Composant />;
            const htmlStatique = renderToStaticMarkup(elementReact);
            let dest = file.replace(Global.pages, ".dist");
            dest = dest.replace(".tsx", ".html");
            mkdir(path.dirname(dest));
            fs.writeFileSync(dest, htmlStatique);
        } catch (error) {
            console.log(error);
        }
    }
}