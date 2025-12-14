type ButtonProps = {
    role?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
    return (
        <button
            role={props.role}
            aria-label={props["aria-label"]}
            {...props}
        />
    );
}