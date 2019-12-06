import React, { useState } from 'react';

import './MusicDisp.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ProgressBar from './ProgressBar';
import Grid from '@material-ui/core/Grid';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';

// A collapsible bar at the bottom of the screen. Displays song name, album, cover art and song progress bar
const MusicDisp = (props) => {
	const [ paused, setPaused ] = useState(false);
	return (
		<div>
			<AppBar id="Bar" position="static">
				<Toolbar id="toolbar">
					<Grid container direction="row" justify="left" alignItems="center">
						<Grid item xs={4}>
							<img src={props.img} alt="alt" />

							<div>
								<h1>{props.name}</h1>
								<h3>{props.album}</h3>
							</div>
						</Grid>

						<Grid item xs={4}>
							<div className="player">
								<IconButton onClick={() => props.back()}>
									<SkipPreviousIcon className="icon" />
								</IconButton>
								{paused && (
									<IconButton
										onClick={() => {
											props.play();
											setPaused(!paused);
										}}
									>
										<PlayArrowIcon className="icon" />
									</IconButton>
								)}
								{!paused && (
									<IconButton
										onClick={() => {
											props.pause();
											setPaused(!paused);
										}}
									>
										<PauseIcon className="icon" />
									</IconButton>
								)}

								<IconButton onClick={() => props.skip()}>
									<SkipNextIcon className="icon" />
								</IconButton>
							</div>
							<ProgressBar id="progressbar" progress={props.progress} />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default MusicDisp;
