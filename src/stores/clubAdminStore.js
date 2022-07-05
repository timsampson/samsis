import { writable } from 'svelte/store';
export const canSubmit = writable(false);
export const submitted = writable(false);
export const approvalType = writable('');
export const approvalRecords = writable([]);
export const recordsForApproval = writable([]);