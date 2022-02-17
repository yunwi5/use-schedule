import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/pro-duotone-svg-icons";

import Button from "../../ui/Button";
import { Size, Theme } from "../../../models/design-models";
import classes from "./IntroPanel.module.scss";

interface Props {
	title: string;
	message: string;
}

const IntroPanel: React.FC<Props> = (props) => {
	const { title, message } = props;

	return (
		<div className={classes.panel}>
			<h2>{title}</h2>
			<p>{message}</p>

			<Button className="mr-4 flex items-center" theme={Theme.SECONDARY} size={Size.MEDIUM}>
				<FontAwesomeIcon className="mr-2 max-w-[1.3rem]" icon={faChartPie as any} />{" "}
				Statistics
			</Button>
		</div>
	);
};

export default IntroPanel;
