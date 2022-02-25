export function getDaySuffixed (date: Date): JSX.Element {
	const day = date.getDate();
	if (day === 1)
		return (
			<span>
				1<small>st</small>
			</span>
		);
	if (day === 2)
		return (
			<span>
				2<small>nd</small>
			</span>
		);
	if (day === 3)
		return (
			<span>
				3<small>rd</small>
			</span>
		);
	return (
		<span>
			{day}
			<small>th</small>
		</span>
	);
}
