import { getFilesPath } from "@/domain/build/Files.js";
import { Global } from "@/domain/build/Global.js";

export default function getHTMLPathsFromDist() {
    const pageFiles = getFilesPath(Global.dist);
    const htmlFiles = pageFiles.filter((file) => file.endsWith('.html')).map((file) => file.replace(Global.dist, ""));
    return htmlFiles;
}

export function getHTMLFiles() {
    const pageFiles = getFilesPath(Global.dist);
    const htmlFiles = pageFiles.filter((file) => file.endsWith('.html'));
    return htmlFiles;
}
