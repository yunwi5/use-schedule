export interface Task {
	id: string;
	name: string;
	timeString: string;
	description: string;
	duration: number;
	category: string;
	subCategory: string;
	status: string;
	userId: string;
	importance: string;
}

// export class PlannerTask implements Task {
// 	id: string;
// 	name: string;
// 	timeString: string;
// 	description: string;
// 	duration: number;
// 	category: string;
// 	subCategory: string;
// 	status: string;
// 	userId: string;
// 	importance: string;
// }
