import { getContent, replaceContent } from "./files";
import { minify } from "html-minifier-terser";

export async function minifyHTMLFile(sourcePath: string): Promise<void> {
    let res = await minify(getContent(sourcePath), {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: false
    });

    replaceContent(sourcePath, res);
}