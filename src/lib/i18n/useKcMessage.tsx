
import { useKcLanguageTag } from "./useKcLanguageTag";
import { messages } from "./generated_messages/login";
import { useConstCallback } from "powerhooks";
import type { ReactNode } from "react";
import { id } from "evt/tools/typeSafety/id";

export type MessageKey = keyof typeof messages["en"];

export function useKcMessage() {

    const { kcLanguageTag } = useKcLanguageTag();

    const msgStr = useConstCallback(
        (key: MessageKey, ...args: (string | undefined)[]): string => {

            let str: string = messages[kcLanguageTag as any as "en"][key] ?? messages["en"][key];

            args.forEach((arg, i) => {

                if (arg === undefined) {
                    return;
                }

                str = str.replace(new RegExp(`\\{${i}\\}`, "g"), arg);

            });

            return str;

        }
    );

    const msg = useConstCallback(
        id<(...args: Parameters<typeof msgStr>) => ReactNode>(
            (key, ...args) =>
                <span className={key} dangerouslySetInnerHTML={{ "__html": msgStr(key, ...args) }} />
        )
    );

    return { msg, msgStr };

}