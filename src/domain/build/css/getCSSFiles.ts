import { getFilesPath } from "@/lib/files.js";
import { Global } from "@/Global.js";

export function getCSSFiles() {
    const pageFiles = getFilesPath(Global.dist);
    const cssFiles = pageFiles.filter((file) => file.endsWith('.css'));
    return cssFiles;
}
