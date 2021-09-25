import axios from "axios";
import toSeconds from "./src/toSeconds.js";
import formatDuration from "./src/formatDuration.js";

let API_KEY = ``;
let gPlaylistId = "";
let gTotalDuration = 0;
let gNextPageToken = null;
const gVideoIdsPromises = [];

const gPlaylistItemsURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken`;
const gVideosDetailsURL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&fields=items/contentDetails/duration`;

function getNextTokenURL() {
	return gNextPageToken
		? `${gPlaylistItemsURL}&playlistId=${gPlaylistId}&pageToken=${gNextPageToken}&key=${API_KEY}`
		: `${gPlaylistItemsURL}&playlistId=${gPlaylistId}&key=${API_KEY}`;
}

function getNextVideosDetailsURL(id) {
	return `${gVideosDetailsURL}&id=${id}&key=${API_KEY}`;
}

async function getVideoIdsForPageToken() {
	try {
		const { data } = await axios.get(getNextTokenURL());
		const nextPageToken = data.nextPageToken;

		const videoIds = data.items.map((video) => {
			return video.contentDetails.videoId;
		});

		return { videoIds, nextPageToken };
	} catch (e) {
		if (e.response) {
			const { code, message } = e.response.data.error;
			throw new Error(`StatusCode ${code}. Reason: ${message}`);
		} else {
			throw new Error(e.message);
		}
	}
}

async function getDetailsForVideoIds(id) {
	try {
		const { data } = await axios.get(getNextVideosDetailsURL(id));
		return data.items;
	} catch (e) {
		throw new Error(e.message);
	}
}

async function getPlaylistData() {
	try {
		const { videoIds, nextPageToken } = await getVideoIdsForPageToken();
		gNextPageToken = nextPageToken;
		gVideoIdsPromises.push(getDetailsForVideoIds(videoIds));

		if (gNextPageToken) {
			await getPlaylistData();
		}
	} catch (e) {
		throw new Error(e.message);
	}
}

async function getVideosDuraion() {
	try {
		const videoGroups = await Promise.all(gVideoIdsPromises);

		for (const group of videoGroups) {
			for (const video of group) {
				gTotalDuration += toSeconds(video.contentDetails.duration);
			}
		}
	} catch (e) {
		throw new Error(e.message);
	}
}

export default async function ({ playlistId, apiKey, formatted = false }) {
	if (!playlistId || !apiKey) {
		throw new Error(`GYPD: Provide a valid playlist Id & API key!`);
	}

	try {
		gPlaylistId = playlistId;
		API_KEY = apiKey;
		await getPlaylistData();
		await getVideosDuraion();

		return formatted ? formatDuration(gTotalDuration) : gTotalDuration;
	} catch (e) {
		throw new Error(e.message);
	}
}
