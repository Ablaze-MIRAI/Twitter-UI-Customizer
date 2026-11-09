import { createFilter, type FilterPattern } from "vite";
import type { NodePath, PluginObj, types, BabelFile, TransformOptions } from "@babel/core";

type BabelHub = NodePath["hub"] & { file?: BabelFile };

export interface SolidClassPluginOptions {
    /** クラス属性を変換するファイル */
    include?: FilterPattern;
    /** クラス変換から除外するファイル */
    exclude?: FilterPattern;
    /** クラストークンの正確な置換 */
    classMap?: Readonly<Record<string, string>>;
    /** classMap の後の各静的クラス値への追加の変換 */
    // transform?: (classValue: string, id: string) => string;
}

const getClassAttributeName = (node: types.JSXAttribute): string | undefined => {
    return typeof node.name.name === "string" ? node.name.name : undefined;
};

const createClassValueTransformer = (options: SolidClassPluginOptions) => {
    const classMap = options.classMap ?? {};

    return (classValue: string, id: string): string => {
        const mappedValue = classValue.replace(/\S+/g, (className) => {
            return Object.hasOwn(classMap, className) ? `${className} ${classMap[className]}` : className;
        });
        return /*options.transform ? options.transform(mappedValue, id) : */mappedValue;
    };
};

const rewriteClassValue = (
    node: types.Node,
    transform: (classValue: string) => string,
    seen = new Set<types.Node>(),
): void => {
    if (seen.has(node)) return;
    seen.add(node);

    if (node.type === "StringLiteral" && typeof node.value === "string") {
        node.value = transform(node.value);
        return;
    }

    if (node.type === "TemplateElement") {
        if (typeof node.value.raw === "string") node.value.raw = transform(node.value.raw);
        if (typeof node.value.cooked === "string") node.value.cooked = transform(node.value.cooked);
        return;
    }

    for (const [key, value] of Object.entries(node)) {
        // Babel メタデータはクラス式の一部ではないため、
        // 書き換えてはいけない文字列を含めることができます
        if (key === "loc" || key === "extra" || key === "leadingComments" || key === "innerComments" || key === "trailingComments") continue;
        if (typeof value === "object" && value !== null) {
            rewriteClassValue(value as types.Node, transform, seen);
        } else if (Array.isArray(value)) {
            for (const child of value) rewriteClassValue(child, transform, seen);
        }
    }
};

/**
 * Solid クラス プリセットによって使用される Babel プラグイン
 *
 * これは JSX がまだ利用可能な間に実行されるため、
 * Solid が生成した JavaScript の正規表現に依存せずに静的クラス値を変更できます
 * また、Solid コードの DOM 要素に直接割り当てられたクラス値も処理します
 */
export function solidClassBabelPlugin(_api: unknown, options: SolidClassPluginOptions = {}): PluginObj {
    const filter = createFilter(options.include ?? /\.[cm]?[jt]sx(?:$|\?)/i, options.exclude ?? /node_modules/);
    const transformClassValue = createClassValueTransformer(options);

    return {
        name: "solid-class",
        visitor: {
            // JSX の class / className
            JSXAttribute(path) {
                const id = (path.hub as BabelHub)?.file?.opts?.filename ?? "";
                if (!filter(id)) return;

                const attributeName = getClassAttributeName(path.node);
                if (attributeName !== "class" && attributeName !== "className") return;

                rewriteClassValue(path.node.value, (classValue) => transformClassValue(classValue, id));
            },
        },
    };
}

/**
 * vite-plugin-solid の Babel プリセット
 *
 * `passPerPreset: true` を使用すると、このプリセットは vite-plugin-solid の
 * デフォルトのプリセットより前に実行され、引き続き JSX 属性を参照できます。
 */
export function solidClassBabelPreset(_api: unknown, options: SolidClassPluginOptions = {}) {
    return {
        plugins: [[solidClassBabelPlugin, options]],
    };
}

export const solidBabelOption: TransformOptions & { passPerPreset: boolean } = {
    passPerPreset: true,
    presets: [[solidClassBabelPreset, {
        // 例: { "class-before": "class-after" }
        classMap: {
            "twcss-text-explicit": "css-146c3p1",
            "twcss-text-inherit": "css-1jxf684",
            "twcss-cover-hidden": "css-9pa8cd",
            "twcss-flex": "css-g5y9jx",
        },
    }]],
};
