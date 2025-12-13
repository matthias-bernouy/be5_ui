import { launchPage } from "@/lib/browser.js";
import { writeFileSync } from "@/domain/build/Files.js";
import Global from "@/domain/build/Global.js";

export default async function getIMGs(url: string) {

    const browser = await launchPage();
    await browser.goto(url);
    await browser.scrollToEnd();

    const imageIds = await browser.runScript(() => {
        const srcs: { id: string, src: string }[] = [];
        document.querySelectorAll("img").forEach((img) => {
            const id = "img-" + window.crypto.getRandomValues(new Uint8Array(32)).join("-");
            img.classList.add(id);
            srcs.push({ id, src: img.src });
        });
        return srcs;
    });

    writeFileSync(Global.dist + url.replace(Global.server, ""), await browser.content());

    return imageIds
}