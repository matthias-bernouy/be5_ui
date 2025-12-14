import { buildSizes } from "@/domain/build/image/optimizeImage/buildSizes";
import { describe, expect, test } from "@jest/globals";

describe("buildSizes", () => {

    test("buildSizes", () => {
        const rules = {
            "img1": [
                { deviceWidth: 600, ratio: 100 },
                { deviceWidth: 1200, ratio: 50 },
                { deviceWidth: 1800, fixedWidth: 800 }
            ],
            "img2": [
                { deviceWidth: 500, ratio: 80 },
                { deviceWidth: 1000, fixedWidth: 400 }
            ]
        };

        const sizes1 = buildSizes("img1", rules);
        expect(sizes1).toBe("(max-width: 600px) 100vw, (max-width: 1200px) 50vw, (max-width: 1800px) 800px, 100vw");

        const sizes2 = buildSizes("img2", rules);
        expect(sizes2).toBe("(max-width: 500px) 80vw, (max-width: 1000px) 400px, 100vw");
    });
});