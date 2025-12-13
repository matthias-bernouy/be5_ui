import Navbar from "@foo/components/Navbar.js";
import { menu } from "./dataMenu.js";
import Container from "@foo/components/Common/Layout/Container.js";
import ArticleView from "@foo/components/Common/Main/ArticleView.js";

export type ArticleLayoutProps = {
    children: React.ReactNode;
    title: string;
}

export default function ArticleLayout(props: ArticleLayoutProps) {
    const { children, title } = props;
    return (
        <html lang="fr">
            <head>
                <title>{title}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Portfolio" />
                <link rel="icon" href="/assets/img/favicon.ico" />
                <link rel="canonical" href="https://matthiasbernouy.fr" />

                <link rel="stylesheet" href="/assets/css/default/variables.css" />
                <link rel="stylesheet" href="/assets/css/default/index.css" />
                <link rel="stylesheet" href="/assets/css/components/navbar.css" />
                <link rel="stylesheet" href="/assets/css/default/container.css" />
                <link rel="stylesheet" href="/assets/css/default/align.css" />
                <link rel="stylesheet" href="/assets/css/default/ArticleView.css" />
            </head>
            <body>
                <Container row_start={1000} components={[
                    {
                        node: <Navbar menu={menu} footer="Réalisé avec passion - 2025" />,
                        row_variant: "desktop",
                        column_variant: "mobile"
                    },
                    {
                        node: <ArticleView>{children}</ArticleView>
                    }
                ]}>
                </Container>


            </body>
        </html>
    );
}

