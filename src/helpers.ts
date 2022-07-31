import { readAsText } from 'promise-file-reader';

export const readLogFiles = async function (file: File) {
	try {
		return readAsText(file);
	} catch (error) {
		return 'Unable to read file';
	}
};
