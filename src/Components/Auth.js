import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import './Auth.css';
import * as $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from '../Helpers/config';
import hash from '../Helpers/hash';
import Title from './Title';
import heart from '../Assets/heart.png';

import MusicDisp from './MusicDisp';

class Auth extends Component {
	constructor() {
		super();
		this.state = {
			token: null,
			item: {
				album: {
					images: [ { url: '' } ]
				},
				name: '',
				ids: '',
				artists: [ { name: '' } ]
			},
			is_playing: 'Paused',
			duration_ms: 0,
			progress_ms: 0,
			progress_percent: 0,
			beat: 0,
			initialized: false
		};
	}

	componentDidMount() {
		// Set token

		let _token = hash.access_token;

		if (_token) {
			// Set token
			this.setState({
				token: _token
			});
			this.getCurrentlyPlaying(_token);
		}
	}

	getCurrentlyPlaying(token) {
		// Using auth token, call spotify api and grab currently playing song
		$.ajax({
			url: 'https://api.spotify.com/v1/me/player',
			type: 'GET',
			beforeSend: (xhr) => {
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success: (data) => {
				// completion status of current song
				let progress_percent = data.progress_ms / data.item.duration_ms * 100;

				this.setState(
					{
						item: data.item,
						is_playing: data.is_playing,
						progress_ms: data.progress_ms,
						beat: data.progress_ms,
						duration_ms: data.item.duration_ms,
						progress_percent: progress_percent
					},
					// request further info of current song
					() => {
						this.getTrackInfo(this.state.item.id, this.state.token);
					}
				);
			}
		});
	}

	getTrackInfo(id, token) {
		// Find song tempo
		$.ajax({
			url: 'https://api.spotify.com/v1/audio-features/' + id,
			type: 'GET',
			headers: {
				Authorization: 'Bearer ' + token
			},
			success: (data) => {
				//Find how many milliseconds pass between each beat
				let BPM = data.tempo;
				let beatInterval = 60000 / BPM;

				//set animation speed of the pulsing heart
				let root = document.getElementById('heart');
				root.style.setProperty('--pulse-speed', beatInterval / 1000 + 's');

				if (!this.state.initialized) {
					this.setState({
						initialized: true
					});
					//updates every song beat
					//TODO: Create a minor delay in beatInterval so users can press a little before the exact beatInterval
					setInterval(() => {
						this.setState({
							beat: this.state.beat + beatInterval
						});
					}, beatInterval);

					// Updates song progress in ms and percent
					setInterval(() => {
						let progress = this.state.progress_ms / this.state.duration_ms * 100;

						this.setState({
							progress_ms: this.state.progress_ms + 100,
							progress_percent: progress
						});
						//call api if current song is complete
						if (this.state.progress_percent > 100) {
							this.getCurrentlyPlaying(this.state.token);
						}
					}, 100);
				}
			}
		});
	}

	handleKeyPress() {
		//compares beat interval with song progress to check if user has pressed on the beat
		//!! Broken, will not recofnise users who press before exact interval
		let press = this.state.progress_ms;
		let beat = this.state.beat;
		console.log(beat, press);
		if (press < beat + 200 && press > beat - 200) {
			console.log('good');
		} else {
			console.log('bad');
		}
	}

	render() {
		return (
			<div id="body">
				{this.state.token && (
					<Grid
						container
						spacing={0}
						direction="row"
						alignItems="center"
						justify="center"
						style={{ minHeight: '15vh' }}
					>
						<h1 className="banner">Crypt of the Necro-Typer</h1>
					</Grid>
				)}
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justify="center"
					style={{ minHeight: '100vh' }}
				>
					{!this.state.token && <Title />}

					<Grid item xs={5}>
						{!this.state.token && (
							<div id="content">
								<button
									className="btn"
									onClick={(event) =>
										(window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
											'%20'
										)}&response_type=token&show_dialog=true`)}
								>
									Begin
								</button>
							</div>
						)}
						{this.state.token && <textarea id="input" placeholder="Start typing on the beat!" />}
						{this.state.token && (
							<div className="heartContainer">
								<img id="heart" className="heart" src={heart} alt="this" />
							</div>
						)}
					</Grid>
				</Grid>
				{this.state.token && (
					<MusicDisp
						img={this.state.item.album.images[0].url}
						album={this.state.item.album.name}
						name={this.state.item.name}
						progress={this.state.progress_percent}
					/>
				)}
			</div>
		);
	}
}

export default Auth;
