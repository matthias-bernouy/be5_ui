import { resizeWithDest, toWebp } from "@/lib/image.js"
import { v4 as uuidv4 } from 'uuid';
import Global from "@/domain/build/Global.js";
import fs from 'fs';

export default async function createWebpVariants(originalImage: string, widthRequired: number[]) {

    const ret: { src: string, width: number }[] = [];

    const originalWebp = Global.dist + "/.cache/" + uuidv4() + ".webp";
    await toWebp(originalImage, originalWebp);

    for (const width of widthRequired) {
        const dest = Global.dist + "/" + Global.assets + "/" + uuidv4() + ".webp";
        await resizeWithDest(originalWebp, width, dest);
        ret.push({ src: dest.replace(Global.dist, ""), width });
    }

    fs.unlinkSync(originalWebp);

    return ret;
}