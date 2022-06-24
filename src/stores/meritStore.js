import { writable, derived } from 'svelte/store';
export const term = writable('');
export const items = writable([]);
export const category = writable('student_name');
export const filtered = derived(
	[term, items, category], 
	([$term, $items, $category]) => $items.filter(record => record[$category].toLowerCase().trim().includes($term))
);