import { launchPage } from "@/lib/browser.js";

export default async function getImageWidthForEachDevices(url: string, devicesWidth: number[], imgIds: string[]) {

    const browser = await launchPage();
    await browser.goto(url);

    const imageWidth: Record<string, { deviceWidth: number, imageWidth: number }[]> = {};
    for (const width of devicesWidth) {
        await browser.setViewport(width, 1080);
        await browser.scrollToEnd();
        const res = await browser.runScript((imgIds: string[]) => {
            const ret: { id: string, width: number }[] = [];
            imgIds.forEach((imgId) => {
                const img = document.querySelector("." + imgId) as HTMLImageElement;
                if (!img) return;
                ret.push({ id: imgId, width: img.width });
            });
            return ret;
        }, [imgIds]);

        res.forEach((img) => {
            if (!imageWidth[img.id]) imageWidth[img.id] = [];
            imageWidth[img.id].push({ deviceWidth: width, imageWidth: img.width });
        });
    }

    return imageWidth;
}