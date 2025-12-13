import React from "react";

type ContainerProps = {
    row_start: number; // En pixels, par exemple à partir de 500px, mettre en row
    components: {
        node: React.ReactNode;
        row_variant?: string;
        column_variant?: string;
    }[];
    gap_column?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    gap_row?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
}

export default function Container(props: ContainerProps) {
    const { components, gap_column, gap_row, row_start } = props;

    if (!components) return null;

    return (
        <>

            <style dangerouslySetInnerHTML={{
                __html: `
        /* Correction : @container et & */
        @container container (width < ${row_start}px) {
            & .container_ {
                flex-direction: column;

                            ${components.map((component, index) => {
                    if (component.column_variant) {
                        return `
                        &:nth-child(${index + 1}) {
                            --component-state: ${component.column_variant};
                        }
                    `;
                    }
                    return '';
                }).join('')}
            }


        }

        @container container (width >= ${row_start}px) {
            & .container_ {
                ${components.map((component, index) => {
                    if (component.row_variant) {
                        return `
                            &:nth-child(${index + 1}) {
                                --component-state: ${component.row_variant};
                            }
                        `;
                    }
                    return '';
                }).join('')}
            }
        }
    `
            }} />
            <div className="container">
                <div className={`container_`}>

                    {components.map((component) => (
                        component.node
                    ))}
                </div>
            </div>
        </>
    );
}