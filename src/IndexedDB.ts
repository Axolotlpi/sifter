import { setMany, getMany, del, keys, get } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';

export const templateData = new Map();
export const dataTypes = ['searchProfile'];
templateData.set('searchProfile', {
	id: 0,
	type: 'searchProfile',
	name: 'template',
	snippets: [
		{
			pattern: 'fail',
			alertLevel: 3
		}
	],
	alertLevels: [
		{
			level: 'Warning',
			number: '3',
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
	let DataKeyVal = data?.map != undefined ? data.map((a) => [a.id, a]) : [[data.id, data]];
	try {
		await setMany(DataKeyVal);
	} catch (error) {
		console.log('Could not write to database: ', data, error);
	}
};

export const deleteFromDB = async function (key) {
	try {
		await del(key?.id || key);
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
