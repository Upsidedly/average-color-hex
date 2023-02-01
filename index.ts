import { getAverageColor } from "fast-average-color-node";

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];
export type ThresholdRGBA = [number, number, number, number, number];
export type IgnoredColor =
	| RGB
	| RGBA
	| ThresholdRGBA
	| Array<RGB | RGBA | ThresholdRGBA>;
export interface ColorOptions {
	defaultColor?: RGBA;
	ignoredColor?: IgnoredColor;
	mode?: "precision" | "speed";
	algorithm?: "simple" | "sqrt" | "dominant";
	step?: number;
	left?: number;
	top?: number;
	width?: number;
	height?: number;
	silent?: boolean;
	crossOrigin?: string;
}
export interface ColorResult {
	rgb: RGB;
	rgba: RGBA;
	hex: `#${string}`;
	hexa: `#${string}`;
	value: RGBA;
	isDark: boolean;
	isLight: boolean;
	error?: Error;
}

export default async function (
	resource: string | Buffer,
	options?: ColorOptions,
): Promise<ColorResult> {
	const { value, hex, hexa, rgba, isDark, isLight, error } =
		await getAverageColor(resource, options);
	return {
		rgb: [value[0], value[1], value[2]],
		rgba: [value[0], value[1], value[2], Number(rgba.split(",").slice(0, -1))],
		hex: hex as `#${string}`,
		hexa: hexa as `#${string}`,
		value,
		isDark,
		isLight,
		error,
	};
}
