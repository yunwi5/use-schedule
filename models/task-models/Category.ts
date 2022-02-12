export function getSubCategory (category: Category): string[] {
	switch (category) {
		case Category.HOME:
			return HomeCategoryList;
		case Category.LEISURE:
			return LeisureCategoryList;
		case Category.SCHOOL_UNIVERSITY:
			return SchoolCategoryList;
		case Category.WORK:
			return WorkCategoryList;
	}
}
// Can be fixed afterwards
export enum Category {
	HOME = "Home",
	LEISURE = "Leisure",
	WORK = "Work",
	SCHOOL_UNIVERSITY = "School / University"
}

export enum HomeCategory {
	SHOPPING = "Shopping",
	COOKING = "Cooking",
	LAUNDRAY = "Laundray",
	CLEANING = "Cleaning",
	FAMILY = "family"
}

export const HomeCategoryList = [
	HomeCategory.SHOPPING,
	HomeCategory.COOKING,
	HomeCategory.LAUNDRAY,
	HomeCategory.CLEANING,
	HomeCategory.FAMILY
];

export enum LeisureCategory {
	MOVIES = "Movies",
	FRIENDS = "Friends",
	GAMES = "Games",
	TRIPS = "Trips",
	SOCIAL_MEDIA = "Social Media"
}

export const LeisureCategoryList = [
	LeisureCategory.MOVIES,
	LeisureCategory.FRIENDS,
	LeisureCategory.GAMES,
	LeisureCategory.TRIPS,
	LeisureCategory.SOCIAL_MEDIA
];

export enum WorkCategory {
	MEETING = "Meeting",
	REPORT = "Report",
	DAILY_WORK = "Daily Work"
}

export const WorkCategoryList = [
	WorkCategory.MEETING,
	WorkCategory.REPORT,
	WorkCategory.DAILY_WORK
];

export enum SchoolCategory {
	HOMEWORK = "HomeWork",
	ASSIGNMENTS = "Assignments",
	TEST_EXAMS = "Tests / Exams",
	LECTURES = "Lectures",
	REPORT = "Report / Essay",
	TUTORIALS = "Tutorials",
	LAB = "Lab",
	REPRESENTATIVES = "Representatives"
}

export const SchoolCategoryList = [
	SchoolCategory.HOMEWORK,
	SchoolCategory.ASSIGNMENTS,
	SchoolCategory.TEST_EXAMS,
	SchoolCategory.LECTURES,
	SchoolCategory.REPORT,
	SchoolCategory.TUTORIALS,
	SchoolCategory.LAB,
	SchoolCategory.REPRESENTATIVES
];
