type AlignProps = {
    children: React.ReactNode;
    vertical?: "center" | "top" | "bottom";
    horizontal?: "center" | "left" | "right";
}

export default function Align(props: AlignProps) {
    const { children, vertical, horizontal } = props;
    return (
        <div className={`align vertical-${vertical} horizontal-${horizontal}`}>
            {children}
        </div>
    );
}