import { useState, useEffect } from "react";

function useLogger<T> (watchObject: T) {
	const [ isLogging, setIsLogging ] = useState(true);

	// Default is keep logging out everytime the object changes
	useEffect(
		() => {
			if (!isLogging) return;
			console.log("***WATCH***");
			if (Array.isArray(watchObject)) {
				console.table(watchObject);
			} else {
				console.log(watchObject);
			}
		},
		[ watchObject ]
	);

	return {
		stopLog: () => setIsLogging(false),
		restartLog: () => setIsLogging(true)
	};
}

export default useLogger;
