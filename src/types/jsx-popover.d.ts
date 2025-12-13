// jsx-popover.d.ts

import React from 'react';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        popover?: "auto" | "manual";
        popovertarget?: string;
        popovertargetaction?: "hide" | "show" | "toggle";
    }
}