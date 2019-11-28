# Crypt of the NecroTyper
A fun personal project which combines the core game mechanic of [Crypt of the Necrodancer](https://en.wikipedia.org/wiki/Crypt_of_the_NecroDancer) with [The Most Dangerous Writing App](https://maebert.github.io/themostdangerouswritingapp/#/) Using the Spotify API this text editor app forces users to type to the beat of their favourite songs - too many misteps will cause their work to delete. 

A work in progress inspired by the subbredit [r/badUIbattles](https://www.reddit.com/r/badUIbattles/).

## Setup

Clone repository to local machine and run:
```
npm install
```
Using Spotify's developer console, create a Spotify app. In app settings, create redirect url pointing to your local host. Copy the App Id.
Navigate to "./src/Helpers/configExample.js" and rename to "config.js". Paste App Id into indicated variable within config.js file.

To run project locally:
```
npm install
```

