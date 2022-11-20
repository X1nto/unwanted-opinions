# Unwanted Opinions

Sometimes you might want to block specific type of content without blocking the actual content creators. Unwanted Opinions lets you block content using various options in the extension.

Example:
| Before | After |
| ---------------------- | --------------------- |
| ![](/media/before.png) | ![](/media/after.png) |

# Building

```sh
npm i
//To build the Chrome version
npm run build-chrome
//To build the Firefox version
npm run build-firefox
```

you can then zip the builds using [web-ext](https://github.com/mozilla/web-ext) for example

# Installation

## Chrome

Download the ZIP from the [latest GitHub Release](https://github.com/X1nto/unwanted-opinions/releases/latest) and extract it to a folder. Head to chrome://extensions, enable developer mode,click on "Load unpacked" and select the folder you extracted the ZIP to.

Chrome WebStore coming soon.

## Firefox

[![](media/get-it-on-firefox.png)](https://addons.mozilla.org/en-US/firefox/addon/unwanted-opinions/)

## Safari

Maybe?

# Credits

@busybox11 for their [Twitter Blue Nerd](https://gist.github.com/busybox11/53c76f57a577a47a19fab649a76f18e3), from which I used a huge amount of code.

@wseagar for [Eight Dollars](https://github.com/wseagar/eight-dollars), which partially inspired this extensions.
