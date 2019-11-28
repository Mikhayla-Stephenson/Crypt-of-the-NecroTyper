import React from 'react';
import './ProgressBar.css';

//Progress bar to show the completion status of the currently playing song

const ProgressBar = (props) => {
	let progress = props.progress + '%';

	return (
		<div>
			<div className="ProgressBar">
				<div className="Filler" style={{ width: progress }} />
			</div>
		</div>
	);
};

export default ProgressBar;
