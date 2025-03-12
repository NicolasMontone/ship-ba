export function getProjectSlug(projectName: string): string {
	return projectName
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-');
}