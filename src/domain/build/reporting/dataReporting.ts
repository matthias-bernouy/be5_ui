import Semaphore from "@/domain/semaphore/Semaphore.js";

export const DATA_REPORTING = new Semaphore(1);

const dataReporting = {

    totalCssFiles: 15,
    totalImgFiles: 15,
    totalHtmlFiles: 15,
    totalHtmlFilesDynamically: 0,
    totalImgFilesOptimized: 0,

    cssCopied: 0,
    imgCopied: 0,
    htmlGenerated: 0,
    htmlGeneratedDynamically: 0,
    imgOptimized: 0,
}

export const incrementDataReporting = async (key: keyof typeof dataReporting) => {
    await DATA_REPORTING.acquire();
    dataReporting[key]++;
    DATA_REPORTING.release();
}

export const getDataReporting = () => {
    return dataReporting;
}