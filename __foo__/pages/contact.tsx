import ArticleLayout from "@foo/layouts/ArticleLayout.js";

export default function Contact() {

    return (
        <ArticleLayout title="Contact">
            <h1>Contact</h1>
            <p>Vous pouvez me contacter par email à <a href="mailto:matthias@matthias.io">matthias@matthias.io</a></p>
        </ArticleLayout>
    );
}