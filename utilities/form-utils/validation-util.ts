export interface Error {
	hasError: boolean;
	message: string | null;
}

export function validateName (name: string, validateEmpty: boolean = true): Error {
	if (!name && validateEmpty)
		return {
			hasError: true,
			message: "SubTask name should not be empty!"
		};
	if (name.length > 60)
		return {
			hasError: true,
			message: "SubTask name should not exceed 60 characters!"
		};

	return {
		hasError: false,
		message: null
	};
}
