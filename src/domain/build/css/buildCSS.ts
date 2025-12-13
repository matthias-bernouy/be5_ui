import { copyFile, getFilesPath, mkdir } from "@/domain/build/Files.js";
import path from "path";
import { Global } from "@/domain/build/Global.js";
import { incrementDataReporting } from "@/domain/build/reporting/dataReporting.js";

export default function buildCSS() {

    const files = getFilesPath(Global.src);

    for (const file of files) {
        if (!file.endsWith('.css')) {
            continue;
        }
        const dest = file.replace(Global.src, Global.dist);
        mkdir(path.dirname(dest));
        copyFile(file, dest);

        incrementDataReporting("cssCopied");
    }

    

}
