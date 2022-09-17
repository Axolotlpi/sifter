import { setMany, getMany, del, keys, get, delMany } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';

export type SearchProfile = {
	id: number;
	type: string;
	name: string;
	snippets: Array<{
		name: string;
		pattern: string;
		message?: string;
		color?: string;
	}>;
};

export const templateData = new Map();
export const dataTypes = ['searchProfile'];
templateData.set('searchProfile', {
	id: 0,
	type: 'searchProfile',
	name: 'template',
	snippets: [
		{
			name: 'UniqueName1',
			pattern: 'fail',
			message: 'Fail Alert',
			color: '#884444'
		}
	]
});

typeof navigator != 'undefined' && navigator.storage.persist();

export const readDataByTypes = async function (types) {
	let data = await readAllDataFromDB();
	return data?.filter((data) => types.includes(data.type));
};

export const readAllDataFromDB = async function () {
	try {
		let currentKeys = await keys();
		return await getMany(currentKeys);
	} catch (error) {
		console.log('Could not read from database: ', error);
	}
};

export const readDataFromDB = async function (key) {
	try {
		return await get(key?.id || key);
	} catch (error) {
		console.log('Could not read from database: ', error);
	}
};

export const writeToDB = async function (data) {
	let dataKeyVal = data?.map != undefined ? data.map((a) => [a.id, a]) : [[data.id, data]];
	try {
		await setMany(dataKeyVal);
	} catch (error) {
		console.log('Could not write to database: ', data, error);
	}
};

export const deleteFromDB = async function (data) {
	let keys = data?.map != undefined ? data.map((a) => a.id) : [data.id];
	try {
		await delMany(keys);
	} catch (error) {
		console.log('Could not delete from database: ', error);
	}
};

export const deleteManyFromDB = async function (key) {
	try {
		await delMany(key.map((key) => key.id));
	} catch (error) {
		console.log('Could not delete from database: ', error);
	}
};

export const generateNewTemplate = function (type) {
	return { ...templateData.get(type), id: uuidv4() };
};

function download(content, fileName, contentType) {
	var a = document.createElement('a');
	var file = new Blob([content], { type: contentType });
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}

export async function downloadAllActions() {
	download(JSON.stringify(await readAllDataFromDB()), 'webmote-actions', 'text/plain');
}
