import { MenuType } from "../components/Navbar.js";


export const menu: MenuType[] = [
    {
        href: "/",
        label: "A propos",
    },
    {
        label: "Projets",
        subMenu: [
            {
                title: "Projets professionnels",
                items: [
                    {
                        href: "/projects/aelf1er-lehavre",
                        label: "Blog pour une association - 2021",
                    },
                    {
                        href: "/projects/sewlau",
                        label: "FullStack pour Sewlau - 2024",
                    },
                ]
            },
            {
                title: "Projets personnels",
                items: [
                    {
                        href: "/projects/cdn",
                        label: "CDN - OpenSource",
                    },
                    {
                        href: "/projects/convert",
                        label: "Outils de conversion et de compression",
                    },
                    {
                        href: "/projects/cms",
                        label: "CMS statique - OpenSource",
                    },
                ]
            }
        ]
    },
    {
        href: "/skills",
        label: "Compétences",
    },
    {
        href: "/contact",
        label: "Contact",
    },
];