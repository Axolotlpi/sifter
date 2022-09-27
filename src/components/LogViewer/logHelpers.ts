import type { SearchProfile } from '../../IndexedDB';
import { readAsText } from 'promise-file-reader';

export const readLogFiles = async function (file: File) {
	try {
		return readAsText(file);
	} catch (error) {
		return 'Unable to read file';
	}
};

export type Line = { lineNum: number; text: string };
export type SnippedLine = {
	snippet: {
		name: string;
		pattern: string;
		message?: string;
		color?: string;
	};
	lines: Array<{ text: any; lineNum: any; match: Array<number> }>;
};

export const parseBySearchProfile = async (
	searchProfile: SearchProfile,
	lines: Array<Line>
): Promise<{ lines: Array<Line>; snippedLines: Array<SnippedLine> }> => {
	const snippedLines = await searchProfile.snippets.map((snippet) => ({
		snippet: snippet,
		lines: lines
			.filter((line) => line.text.match(snippet.pattern))
			.map((line) => addMatchToLine(line, snippet.pattern))
	}));
	return { lines, snippedLines };
};

const addMatchToLine = ({ text, lineNum }, pattern) => {
	const match = text.match(pattern);
	return {
		text: text,
		lineNum: lineNum,
		match: [match.index, match.index + match[0].length] //assumes no g flag is used in the regex pattern
	};
};

export const getLines = async (text: string): Promise<Array<Line>> => {
	const newlineMatch = new RegExp(/\r?\n/);
	return await text.split(newlineMatch).map((text, index) => ({ lineNum: index, text: text }));
};
