import Image from "@foo/components/Common/Image.js";
import ArticleLayout from "@foo/layouts/ArticleLayout.js";

export default function Home() {

    return (
        <ArticleLayout title="Home">

            <Image loading="lazy" src="/assets/images/image1.jpeg" alt="Un paysage avec un lac" />

        </ArticleLayout>
    );
}   