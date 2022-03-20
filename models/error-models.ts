export class NextError extends Error {
	public name = "NextError";
	public message: string;
	public statusCode: number;

	constructor (message: string, options?: ErrorOptions, statusCode?: number) {
		super(message, options);
		this.message = message;
		this.statusCode = statusCode || 404;
	}
}
