# Text To Voice

JavaScript based web functions to manage the text-to-voice/text-to-speech browser api. It works creating fragments of the original text and receiving some parameters like language, rate and pitch.

## index.html

Example file that imports the `tv2.js` and uses it to read the content of a textarea input.

## t2v.js `(Contains the utility functions)`

The utility functions are listed below.

### textToVoice

Reads text, has no return.
Language codes references in: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry

- `text`: string (mandatory)
- `lang`: string (language code, depends of the languages available in each client web browser)
- `rate`: number (speed of the reader, default is 0.9, normal is 1)
- `pitch`: number (pitch of the reader, default is 1, normal is 1)

```js
textToVoice(
  (text = "some string"),
  (lang = "es-MX"),
  (rate = 0.9),
  (pitch = 1.2)
);
```

### stopTextToVoice

Stops the reader, has no return.

```js
stopTextToVoice();
```

### chunkText

Receives a string and returns an array of chunks of the string.

```js
chunksArrayFromText = chunkText("some long text");
```

### listVoices

Shows in the console the list of voices available in the current client, depending on the browser, os, and pc.

```js
listVoices();
```

### whichOS

Returns the name of the current client computer OS.

```js
nameOfTheCurrentOS = whichOS();
```

### whichBrowser

Returns the name of the current client web browser.

```js
nameOfCurrentBrowser = whichBrowser();
```

### isChromiumBasedBrowser

Returns true if the current browser is based on the open project of Chromium.

```js
booleanIfIsChromiumBased = isChromiumBasedBrowser();
```
