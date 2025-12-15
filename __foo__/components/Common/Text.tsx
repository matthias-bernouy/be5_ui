import React from "react";

export type TextProps = {
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "m" | "s";
    children: string;
    className?: string;
    animated?: boolean;
}

export default function Text(props: TextProps) {
    let { type, size, children, className, animated } = props;
    if (!type) {
        type = "p";
    }
    
    if (!className) {
        className = "";
    }
    return React.createElement(type, { className: className + (animated ? " animation_opacity" : "") + (size ? ` text_${size}` : ""), children });
}