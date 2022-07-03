import { writable, derived } from 'svelte/store';
export const categories = [ "Merit", "Information", "Level 1",  "Yellow Level",  "Orange Level", "Red Level", "Homework"];
export const positiveList = ["helpful", "On task", "Diligent"];
export const informationList = ["sleepy", "eating in class", "late", "emotional"];
export const level1List = ["off task", "constantly chatting", "tardy"];
export const YCList = ["shouting", "running", "sleeping"];
export const OCList = ["fighting", "screaming", "thowing objects"];
export const RCList = ["smoking", "fireworks", "swearing"];
export const HWList = ["incomplete", "not submitted", "poor effort"];
export const subjects = ["Reading"," History","Geography","Geometry","Algebra lI","Writing","Physics","Chemistry","Biology","Math","Precalculus","Calculus"];
export const selectedSubject = writable('');
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
			record.hr_teacher_name.toLowerCase().trim().includes($meritSearchTerm) || 
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