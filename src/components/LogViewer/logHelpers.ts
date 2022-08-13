import type { SearchProfile } from '../../IndexedDB';
import { readAsText } from 'promise-file-reader';

export const readLogFiles = async function (file: File) {
	try {
		return readAsText(file);
	} catch (error) {
		return 'Unable to read file';
	}
};

export const parseBySearchProfile = (searchProfile: SearchProfile, logText: string) => {
	const lines = getLines(logText);
	const snippedLines = searchProfile.snippets.map((snippet) => ({
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

const getLines = (text: string): Array<{ lineNum: number; text: string }> => {
	const newlineMatch = new RegExp(/\r?\n/);
	return text.split(newlineMatch).map((text, index) => ({ lineNum: index, text: text }));
};
