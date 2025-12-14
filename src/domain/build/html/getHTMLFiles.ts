import { getFilesPath } from "@/lib/files.js";
import { Global } from "@/Global.js";

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
