export function getDaySuffixed (date: Date): JSX.Element {
	const day = date.getDate();

	const smallFontSize = {
		fontSize: "10px"
	};

	if (day === 1)
		return (
			<span>
				1<small style={smallFontSize}>st</small>
			</span>
		);
	if (day === 2)
		return (
			<span>
				2<small style={smallFontSize}>nd</small>
			</span>
		);
	if (day === 3)
		return (
			<span>
				3<small style={smallFontSize}>rd</small>
			</span>
		);
	return (
		<span>
			{day}
			<small style={smallFontSize}>th</small>
		</span>
	);
}
