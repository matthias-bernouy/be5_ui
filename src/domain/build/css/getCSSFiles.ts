import { getFilesPath } from "@/domain/build/Files.js";
import { Global } from "@/domain/build/Global.js";

export function getCSSFiles() {
    const pageFiles = getFilesPath(Global.dist);
    const cssFiles = pageFiles.filter((file) => file.endsWith('.css'));
    return cssFiles;
}
