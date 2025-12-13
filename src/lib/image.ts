import sharp from "sharp";

export async function getImageMetadata(src: string) {
    const sha = sharp(src);
    const metadata = sha.metadata();
    return metadata;
}

export async function toWebp(src: string, dest: string) {
    const sha = sharp(src).webp({
        quality: 80
    });
    return sha.toFile(dest);
}

export async function resize(src: string, width: number) {
    const metadataOrigin = await getImageMetadata(src);
    if (metadataOrigin.width < width) {
        return;
    }
    const sha = sharp(src).resize({
        width: width
    });
    await sha.toFile(src.replace(".webp", "." + width + ".webp"));
    return src.replace(".webp", "." + width + ".webp");
}

export async function resizeWithDest(src: string, width: number, dest: string) {
    const metadataOrigin = await getImageMetadata(src);
    if (metadataOrigin.width < width) {
        return;
    }
    const sha = sharp(src).resize({
        width: width
    });
    return await sha.toFile(dest);
}
