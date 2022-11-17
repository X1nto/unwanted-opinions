# Unwanted Opinion

Are you tired of seeing tweets from Twitter Blue subscribers? Well, worry not, because Unwanted Opinion blocks tweets from Blue subscribers before you even get a glimpse of it!

| Before                 | After                 |
| ---------------------- | --------------------- |
| ![](/media/before.png) | ![](/media/after.png) |

# Building

## Chrome

```
npm run build-chrome
```

## Firefox

Requires web-ext

```
npm run build-firefox
cd build-firefox
web-ext build
```

The output zip will be in `build-firefox/web-ext-artifacts`

# Installation

## Chrome

Download the ZIP from the [latest GitHub Release](https://github.com/X1nto/unwanted-opinion/releases/latest) and extract it to a folder. Head to chrome://extensions, enable developer mode,click on "Load unpacked" and select the folder you extracted the ZIP to.

Chrome WebStore coming soon.

## Firefox

[![](media/get-it-on-firefox.png)](https://addons.mozilla.org/en-US/firefox/addon/unwanted-opinion/)

## Safari

Maybe?

# Credits

@busybox11 for their [Twitter Blue Nerd](https://gist.github.com/busybox11/53c76f57a577a47a19fab649a76f18e3), from which I used a huge amount of code.

@wseagar for [Eight Dollars](https://github.com/wseagar/eight-dollars), which partially inspired this extensions.
