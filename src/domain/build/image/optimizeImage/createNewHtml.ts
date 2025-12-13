import { launchPage } from "@/lib/browser.js";
import Global from "@/domain/build/Global.js";
import fs from "fs";

export default async function createNewHtml(
    imgIDs: string[],
    metadata: Record<string, { width: number, height: number }>,
    rules: Record<string, { deviceWidth: number, ratio?: number, fixedWidth?: number }[]>,
    variants: Record<string, { src: string, width: number }[]>,
    url: string
) {

    const page = await launchPage();
    await page.goto(url);

    const srcFile = url.replace(Global.server, Global.dist);

    const buildSrcSet = (imgID: string) => {
        let srcSet = variants[imgID].map((item) => {
            return item.src + " " + item.width + "w";
        }).join(', ');
        return srcSet;
    }

    const buildSizes = (imgID: string) => {
        const sizes = rules[imgID].map((rule) => {
            if (rule.fixedWidth) {
                return `(max-width: ${rule.deviceWidth}px) ${rule.fixedWidth}px`;
            } else {
                return `(max-width: ${rule.deviceWidth}px) ${rule.ratio}vw`;
            }
        });
        return sizes.join(', ');
    }


    const metadataFinal = imgIDs.map((imgID) => {
        return {
            id: imgID,
            width: metadata[imgID].width,
            height: metadata[imgID].height,
            srcset: buildSrcSet(imgID),
            sizes: buildSizes(imgID)
        }
    });

    console.log(metadataFinal);

    await page.runScript((
        metadata: Record<string, { id: string, width: number, height: number, srcset: string, sizes: string }>
    ) => {
        Object.entries(metadata).forEach(([index, metadata]) => {
            const img = document.querySelector("." + metadata.id) as HTMLImageElement;
            if (!img) return;
            img.width = metadata.width;
            img.height = metadata.height;
            img.srcset = metadata.srcset;
            img.sizes = metadata.sizes;
            img.classList.remove(metadata.id);
        });

    }, [metadataFinal]);

    const content = await page.content();
    fs.writeFileSync(srcFile, content);

}