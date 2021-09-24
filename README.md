### Get Youtube playlist duration easily

<br>
GYPD lets you get YouTube playlist duartion easily with a very intuitive APi.

### Install:

```
npm i gypd
```

Import:

```js
import gypd from "gypd"
```

### Use:

```js
const dur = await gypd({
	apiKey: API_KEY_HERE,
	playlistId: PLAYLIST_ID_HERE,
	formatted: false,
})
```

### How to use it?

- `gypd` requires that you have a valid Google API key, with Youtube API v3 enabled; watch this short video to learn how to [ generate your Google API key]()

- once you have created your API key, pass a playlist ID

- `gypd` returns duration in seconds, if you want to format the duration, make sure to set formatted as `true`. It will return and object of duration in the form of **{days, hours, minutes and seconds}**

<br>

> use try/catch block, or any equivelant solution to catch potential errors that might happen

<br>
If you face problems, open an issue, or contact me on Twitter [@roktmy](https://twitter.com/roktmy) 

Developed by: Muhammad Yasser