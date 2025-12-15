import { copyFile, getFilesPath, mkdir } from "@/lib/files.js";
import path from "path";
import { Global } from "@/Global.js";

export default function buildCSS() {

    const files = getFilesPath(Global.src);

    for (const file of files) {
        if (!file.endsWith('.css')) {
            continue;
        }
        const dest = file.replace(Global.src, Global.dist);
        mkdir(path.dirname(dest));

        copyFile(file, dest);
    }
}

