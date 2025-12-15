import fs from 'fs';
import { Global } from "@/Global.js";
import getHTMLPathsFromDist from "@/domain/build/html/getHTMLFiles.js";

export default function buildSitemap() {
    const htmlFiles = getHTMLPathsFromDist();

    const urls = htmlFiles.map((file) => {
        let url = file;
        if (url.endsWith('/index.html')) {
            url = url.replace('/index.html', '/');
        } else if (url.endsWith('.html')) {
            url = url.replace('.html', '');
        }
        return `  <url>
    <loc>${Global.siteUrl}${url}</loc>
  </url>`;
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

    fs.writeFileSync(`${Global.dist}/sitemap.xml`, sitemapContent);
}
