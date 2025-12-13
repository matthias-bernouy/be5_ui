import Text from "../Text.js";
import Button from "../Button.js";

export default function ArticleView({ children }: { children: React.ReactNode }) {
    return (
        <main className="ArticleView">
            <div className="Content">
                {children}
            </div>
            <div className="Summary_Layout">
                <Text className="step1" type="p">Pourquoi ce Portfolio ?</Text>
                <Text className="step1" type="p">Comment est fait ce Portfolio ?</Text>
                <Text className="step2" type="p">Les fonctionnalités</Text>
                <Text className="step2" type="p">Le code</Text>
                <Text className="step2" type="p">Le design</Text>
                <Button className="Expand" aria-label="Button">Button</Button>
            </div>
        </main>
    );
}