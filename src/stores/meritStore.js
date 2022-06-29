import { writable, derived } from 'svelte/store';
export const meritFormStepOneSelect = writable(true);
export const selectedCategory = writable('');
export const behaviorKind = writable('');
export const behavior = writable('');
export const details = writable('');
export const term = writable('');
export const studentsData = writable([]);
export const selectedData = writable([]);
export const filtered = derived(
	[term, studentsData], 
	([$term, $studentsData]) => $studentsData.filter(record => {
		return (
			record.student_id.toLowerCase().trim().includes($term) || 
			record.student_name.toLowerCase().trim().includes($term) || 
			record.homeroom.toLowerCase().trim().includes($term) || 
			record.hr_teacher.toLowerCase().trim().includes($term) || 
			record.grade.toString().toLowerCase().trim().includes($term)
			);
	})
);
export const meritFormComplete = derived(
	[details, selectedCategory]
	, ([$details, $selectedCategory]) => {
		return $details.length > 0 && $selectedCategory.length > 0;
	}
);