import { getDataReporting } from "./dataReporting.js";

const clear = () => process.stdout.write('\u001b[0J');
const moveCursorUp = (count: number = 1) => process.stdout.write(`\u001b[${count}A`);

let isFirst = true;
const start = Date.now();

export default function viewReporting() {

    if (isFirst) {
        isFirst = false;
    } else {
        moveCursorUp(26);
        clear();
    }

    const dataReporting = getDataReporting();

    console.log("\n\n");
    writeInConsole("\n=============================================", Color.NONE);
    writeInConsole(`✨ BUILD EN COURS...   ${(Date.now() - start) / 1000} s`, Color.BLUE);
    writeInConsole("=============================================\n", Color.NONE);

    writeInConsole("\nPHASE 1 : Génération et copie", Color.BLUE);
    console.log("=============================================\n");
    console.log(" - " + dataReporting.cssCopied + "/15 fichiers CSS copiés");
    console.log(" - " + dataReporting.imgCopied + "/15 images copiées");
    console.log(" - " + dataReporting.htmlGenerated + "/15 pages statiques générées");
    console.log(" - " + dataReporting.htmlGeneratedDynamically + "/0 pages statiques dynamiquement générées");

    writeInConsole("\n\nPHASE 2 : Optimisations", Color.BLUE);
    console.log("=============================================\n");
    console.log(" - " + dataReporting.imgOptimized + "/0 images optimisées");

    console.log("\n\n\n")

}


enum Color {
    RED = "RED",
    GREEN = "GREEN",
    YELLOW = "YELLOW",
    BLUE = "BLUE",
    NONE = "NONE"
}

const writeInConsole = (text: string, color: Color) => {

    const colors = {
        RED: "\u001b[31m",
        GREEN: "\u001b[32m",
        YELLOW: "\u001b[33m",
        BLUE: "\u001b[34m",
        NONE: "\u001b[0m"
    }

    console.log(colors[color] + text + colors.NONE);
}