import { faFacebook, faGithub, faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer className=''>
			<p>&copy; 2022 JYK Inc. All rights reserved.</p>
			<div>
				<FontAwesomeIcon icon={faGithub as any} />
				<FontAwesomeIcon icon={faFacebook as any} />
				<FontAwesomeIcon icon={faLinkedin as any} />
			</div>
		</footer>
	);
};

export default Footer;
