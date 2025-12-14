import Button from "./Common/Button.js";
import GenId from "@/domain/build/GenId.js";
import Text from "./Common/Text.js";
const id = Math.random().toString(36).substring(2, 9);

export type MenuType = {
    href?: string;
    label: string; // Si pas de href, c'est un titre de menu
    subMenu?: SubMenuProps[]; // Uniquement un niveau de sous menu
}
type NavbarProps = {
    menu: MenuType[];
    footer?: string;
}

type SubMenuProps = {
    title: string;
    items: { href: string; label: string }[];
}

export default function Navbar(props: NavbarProps) {
    const { menu, footer } = props;

    if (!menu) return null;

    return (
        <header className="navbar">
            <Button
                className="burger__menu"
                aria-label="Open menu"
                role="button"
                popovertarget={id}
            >
                <span></span>
                <span></span>
                <span></span>
            </Button>
            <div className="navbar__overlay" popover="auto" id={id}></div>
            <nav>
                <ul className="menu">
                    {menu.map((item, index) => {
                        const id = GenId();
                        return (
                            <li key={index}>
                                {item.href && (
                                    <a href={item.href} className={"/" === item.href ? "selected" : ""}>
                                        {item.label}
                                    </a>
                                )}
                                {!item.href && (
                                    <Button
                                        aria-label={item.label}
                                        role="button"
                                        popovertarget={id}
                                    >
                                        {item.label}
                                    </Button>
                                )}

                                {item.subMenu && (
                                    <ul popover="auto" id={id} className="sub__menu debug">
                                        <Button
                                            className="close__button"
                                            aria-label="Close menu"
                                            role="button"
                                            popovertarget={id}
                                            popovertargetaction="hide"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </Button>
                                        {item.subMenu.map((subMenu, index) => (
                                            <li key={index} className="sub__menu__group">
                                                <span className="sub__menu__title">
                                                    <span>{subMenu.title}</span>
                                                    <span>•</span>
                                                </span>
                                                <ul>
                                                    {subMenu.items.map((subItem, index) => (
                                                        <li key={index}>
                                                            {subItem.href && (
                                                                <a href={subItem.href} className={"/" === subItem.href ? "selected" : ""}>
                                                                    {subItem.label}
                                                                </a>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </ul>
                {footer && (
                    <Text className="footer" type="span" size="s">{footer}</Text>
                )}
            </nav>
        </header>
    );
}