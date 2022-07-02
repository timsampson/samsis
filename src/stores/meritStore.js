import { writable, derived } from 'svelte/store';
export const stepOneComplete = writable(false);
export const meritDateValue = writable(() => new Date().toLocaleDateString("en-CA"));
export const dateIsSelected = writable(false);
export const selectedCategory = writable('');
export const behaviorKinds = writable('');
export const meritBehaviors = writable([]);
export const meritDetails = writable('');
export const meritSearchTerm = writable('');
export const meritFormSubmitted = writable(false);
export const studentsData = writable([]);
export const selectedStudents = writable([]);
export const filtered = derived(
	[meritSearchTerm, studentsData], 
	([$meritSearchTerm, $studentsData]) => $studentsData.filter(record => {
		return (
			record.student_id.toLowerCase().trim().includes($meritSearchTerm) || 
			record.student_name.toLowerCase().trim().includes($meritSearchTerm) || 
			record.homeroom.toLowerCase().trim().includes($meritSearchTerm) || 
			record.hr_teacher.toLowerCase().trim().includes($meritSearchTerm) || 
			record.grade.toString().toLowerCase().trim().includes($meritSearchTerm)
			);
	})
);
export const meritFormComplete = derived(
	[meritDetails, selectedCategory, meritBehaviors, dateIsSelected]
	, ([$meritDetails, $selectedCategory, $meritBehaviors, $dateIsSelected]) => {
		return (
			$meritDetails.length > 0 && 
			$selectedCategory.length > 0 && 
			$meritBehaviors.length > 0  && 
			$dateIsSelected 
			);
	}
);