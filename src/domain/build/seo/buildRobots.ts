import fs from 'fs';
import { Global } from "@/domain/build/Global.js";

export default function buildRobots() {
    const robotsContent = `
User-agent: *
Allow: /

Sitemap: ${Global.siteUrl}/sitemap.xml
`;

    fs.writeFileSync(`${Global.dist}/robots.txt`, robotsContent);
}
