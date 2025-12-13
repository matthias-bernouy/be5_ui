import Global from "@/domain/build/Global.js";
import getImgIDs from "@/domain/build/image/optimizeImage/getIMGs.js";
import getImageWidthForEachDevices from "@/domain/build/image/optimizeImage/getImageWidthForEachDevices.js";
import getOptimalRules from "@/domain/build/image/optimizeImage/getOptimalRules.js";
import createWebpVariants from "@/domain/build/image/optimizeImage/createWebpVariants.js";
import createNewHtml from "./createNewHtml.js";
import { getImageMetadata } from "@/lib/image.js";
import { mkdir } from "@/domain/build/Files.js";
import path from "path";

export default async function optimizeImage(url: string) {

    mkdir(path.dirname(Global.dist + "/.cache/a.jpg"));
    mkdir(path.dirname(Global.dist + "/.assets/a.jpg"));

    // Étape 1 : donner un identifiant à chaque image
    const imgIds = await getImgIDs(Global.server + url);
    if (imgIds.length === 0) return;

    // Étape 2 : get la width des images sur tous les devices (300px to 2600px)
    const widths: number[] = [];
    for (let i = 300; i <= 2600; i += 1) {
        widths.push(i);
    }
    const imageWidth = await getImageWidthForEachDevices(Global.server + url, widths, imgIds.map((imgId) => imgId.id));



    // Étape 3 : Trouver les media queries à appliquer et les tailles d'images
    const rules: Record<string, { deviceWidth: number, ratio?: number, fixedWidth?: number }[]> = {};

    for (const imgId of imgIds) {
        rules[imgId.id] = getOptimalRules(imageWidth[imgId.id]);
    }
    console.log(rules);

    // Étape 4 : Optimiser les images
    const variants: Record<string, { src: string, width: number }[]> = {};
    const widthsToGenerate = new Set<number>();
    for (const img of imgIds) {
        variants[img.id] = [];
        widthsToGenerate.add(128);
        widthsToGenerate.add(256);
        widthsToGenerate.add(384);
        widthsToGenerate.add(512);
        for (const rule of rules[img.id]) {
            const width = rule.fixedWidth;
            if (!width) continue;
            widthsToGenerate.add(width);
        }
        variants[img.id].push(...await createWebpVariants(img.src.replace(Global.server, Global.dist), Array.from(widthsToGenerate)));
    }

    // Étape 5 : Get les metadata des images
    const metadata: Record<string, { width: number, height: number }> = {};
    for (const imgId of imgIds) {
        metadata[imgId.id] = await getImageMetadata(imgId.src.replace(Global.server, Global.dist));
    }

    // Étape 6 : Remplacer les images dans le HTML
    await createNewHtml(imgIds.map((imgId) => imgId.id), metadata, rules, variants, Global.server + url);
}