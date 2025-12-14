type ImageProps = {
    src: string;
    alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function Image(props: ImageProps) {
    const { src, alt } = props;

    return <img
        {...props}
        loading={props.loading || "lazy"}
        sizes={props.sizes}
        src={src}
        alt={alt}
    />;
}