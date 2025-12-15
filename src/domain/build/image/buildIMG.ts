import { copyFile, getFilesPath, mkdir } from "@/lib/files.js";
import path from "path";
import { Global } from "@/Global.js";
import { incrementDataReporting } from "@/domain/build/reporting/dataReporting.js";

export default function buildIMG() {

    const files = getFilesPath(Global.src);

    for (const file of files) {
        if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg') && !file.endsWith('.gif') && !file.endsWith('.webp') && !file.endsWith('.svg')) {
            continue;
        }
        const dest = file.replace(Global.src, Global.dist);
        mkdir(path.dirname(dest));
        copyFile(file, dest);

        incrementDataReporting("imgCopied");
    }

}
