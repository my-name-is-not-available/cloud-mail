import settingService from './setting-service.js';

const r2Service = {
	async putObj(c, key, content, metadata) {
		const { r2Domain } = await settingService.query(c);
		const formData = new FormData();
		formData.append('key', key);
		formData.append('file', content);

		const response = await fetch(`${r2Domain}/upload`, {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error(`Upload failed: ${response.statusText}`);
		}
		return await response.json();
	},

	async getObj(c, key) {
		const { r2Domain } = await settingService.query(c);
		const response = await fetch(`${r2Domain}/${key}`, {
			method: 'GET'
		});

		if (!response.ok) {
			throw new Error(`Download failed: ${response.statusText}`);
		}
		return await response.blob();
	},

	async delete(c, key) {
		// await c.env.r2.delete(key);
	}

};
export default r2Service;
