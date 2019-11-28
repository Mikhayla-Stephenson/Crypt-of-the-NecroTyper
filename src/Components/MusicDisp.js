import React from 'react';
import './MusicDisp.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ProgressBar from './ProgressBar';
import Grid from '@material-ui/core/Grid';

// A collapsible bar at the bottom of the screen. Displays song name, album, cover art and song progress bar
const MusicDisp = (props) => {
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
							<ProgressBar id="progressbar" progress={props.progress} />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default MusicDisp;
