function getRandomNumber (min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap<T> (array: T[], i: number, j: number): void {
	const temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

export function shuffleList<T> (list: T[]) {
	const N = list.length;
	for (let i = 0; i < N; i++) {
		const randomIndex = getRandomNumber(0, N - 1);
		swap(list, i, randomIndex);
	}

	return list;
}
