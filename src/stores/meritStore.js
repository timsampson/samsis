import { writable, derived } from 'svelte/store';
export const term = writable('');
export const items = writable([]);
export const filtered = derived(
	[term, items], 
	([$term, $items]) => $items.filter(record => {
		return record.student_id.toLowerCase().trim().includes($term) || record.student_name.toLowerCase().trim().includes($term);
	})
);