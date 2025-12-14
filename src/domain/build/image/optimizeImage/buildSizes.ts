export const buildSizes = (imgID: string, rules: Record<string, { deviceWidth: number, ratio?: number, fixedWidth?: number }[]>) => {
    const sizes = rules[imgID].map((rule) => {
        if (rule.fixedWidth) {
            return `(max-width: ${rule.deviceWidth}px) ${rule.fixedWidth}px`;
        } else {
            return `(max-width: ${rule.deviceWidth}px) ${rule.ratio}vw`;
        }
    });
    return sizes.join(', ') + ', 100vw';
}