import React, { useState, Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/pro-duotone-svg-icons';
import { faXmark } from '@fortawesome/pro-solid-svg-icons';

import classes from './TemplateInfo.module.scss';
import { Template } from '../../../models/template-models/Template';

interface Props {
	template: Template | undefined;
}

const TemplateInfo: React.FC<Props> = ({ template }) => {
	const [ showInfo, setShowInfo ] = useState(true);

	useEffect(() => setShowInfo(true), [ template ]);

	return (
		<Fragment>
			{showInfo && (
				<div className={`${classes.card}`}>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={setShowInfo.bind(null, false)}
						className='max-w-[2.1rem] text-slate-600 hover:text-rose-500 absolute top-3 right-3 text-xl cursor-pointer hover:scale-125 transition-all'
					/>
					<FontAwesomeIcon
						icon={faCircleInfo}
						className='max-w-[2.2rem] text-blue-700 text-2xl'
					/>
					<h3>About Template</h3>
					<p className={classes.para}>
						Use template planner to add repetitive tasks to whenever week you want.
						Please complete the template form first if you have not already, before
						using it.
					</p>
				</div>
			)}
		</Fragment>
	);
};

export default TemplateInfo;
