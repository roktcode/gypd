### Get YouTube playlist duration easily

<br>
GYPD lets you get YouTube playlist duartion easily with a very simple API!

#### Install:

```
npm i gypd
```

#### Import:

```js
import gypd from "gypd"
```

#### Use:

```js
const duration = await gypd({
	playlistId: PLAYLIST_ID_OR_URL,
	apiKey: API_KEY,
	formatted: true,
})
```

### Description:

`gypd` is is small package that returns YouTube playlist duration in seconds.


- apiKey (required): type `string`
 Your Google API key (with YouTube API v3 enabled). Watch this short video to learn how to [generate your Google API key](https://youtu.be/Jl9Nitf8PJs)

- playlistId (required):  type `string`
 The identifier of the target YouTube playlist

- formatted (optional): type `boolean`, default value `false`
  Returns a duration object in the form of **{days, hours, minutes and seconds}**

<br>

> Use try/catch block, or any equivalent solution to catch potential errors that might happen

<br>

If you face problems, open an issue, or contact me on Twitter [@roktmy](https://twitter.com/roktmy)

Version 1 uploaded Sep 25, 2021, by Muhammad Yasser.
