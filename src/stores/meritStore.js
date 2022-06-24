import { writable, derived } from 'svelte/store';
export const term = writable('');
export const items = writable([]);
export const filtered = derived(
	[term, items], 
	([$term, $items]) => $items.filter(record => record.student_name.toLowerCase().trim().includes($term))
);