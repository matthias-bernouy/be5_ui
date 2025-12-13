export default function getOptimalRules(widths: { deviceWidth: number, imageWidth: number }[]) {

    // Définir les ratios
    const buildWithRatio: { deviceWidth: number, ratio: number, fixedWidth?: number }[] = [];
    for (let index = 0; index < widths.length; index++) {
        const ratio = widths[index].imageWidth / widths[index].deviceWidth;
        buildWithRatio.push({ deviceWidth: widths[index].deviceWidth, ratio: Math.floor(ratio * 100), fixedWidth: widths[index].imageWidth });
    }

    let ret: { deviceWidth: number, ratio: number, fixedWidth?: number }[] = [];
    ret.push(buildWithRatio[0]);

    for (let index = 1; index < buildWithRatio.length; index++) {
        let currentFixedWidth = buildWithRatio[index].fixedWidth;
        let lastFixedWidth = ret[ret.length - 1].fixedWidth;

        if (!currentFixedWidth || !lastFixedWidth) continue;


        // Cas du dernier
        if (index === buildWithRatio.length - 1) {
            ret.push(buildWithRatio[index]);
            continue;
        }

        // Cas d'un égal
        if (currentFixedWidth === lastFixedWidth) {
            ret.pop();
            ret.push(buildWithRatio[index]);
            continue;
        }

        // Cas d'une chute
        if (currentFixedWidth < lastFixedWidth) {
            ret.push(buildWithRatio[index]);
            ret.push(buildWithRatio[index - 1]);
            const filtered = ret.filter((item, index) => {
                return ret.findIndex((item2) => item2.deviceWidth === item.deviceWidth) === index;
            });

            filtered.sort((a, b) => a.deviceWidth - b.deviceWidth);
            ret = filtered;
            continue;
        }

        // Cas d'une montée
        if (currentFixedWidth > lastFixedWidth + 64) {
            ret.push(buildWithRatio[index]);
            continue;
        }
    }

    // Retirer quand il y a une chute (-1px)
    for (let index = 1; index < ret.length; index++) {
        if (ret[index].deviceWidth - ret[index - 1].deviceWidth === 1) {
            ret.splice(index, 1);
            index--;
        }
    }

    // Retirer les fixedWidth non nécessaire, si fixedWidth augmente et ratio baisse, ne pas retirer le fixedWidth
    ret[0].fixedWidth = undefined;
    for (let index = 1; index < ret.length; index++) {

        if (ret[index].ratio > ret[index - 1].ratio) {
            ret[index].fixedWidth = undefined;
        }

        if (ret[index].fixedWidth === undefined) continue;

        const prevFixedWidth = ret[index - 1].fixedWidth;
        const currentFixedWidth = ret[index].fixedWidth;
        if (ret[index].ratio < ret[index - 1].ratio && currentFixedWidth! < prevFixedWidth!) {
            ret[index].fixedWidth = undefined;
        }
    }


    return ret;
}
