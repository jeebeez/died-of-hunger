## Atlas Kitchen Assignment



### Live Demo

[Click here to see it live](https://diedofhunger.netlify.app/)



![project thumbnail](https://user-images.githubusercontent.com/67776449/165939383-ac2793cd-2a6c-4462-a4a6-85811334f1b1.png)


## Installation

```
git clone https://github.com/jeebeez/listicle.git
cd [foldername]
yarn install
yarn start

```

## Features

- Users can navigate through meal options.
- The Navigation bar updates as you scroll through, using react-intesection-observer.
- The threshold property of the intersection observer can be adjust according to your requirements.
- The Navigation bar can also be used for scrolling to respective section, using refs.
- The baseURL can be updated from the atlasAPI file.
- The response from the API is sanitized using DOMPurify.
- Unavailable items are darkened while items out-of-stock have a red border around them.
- Unavailable/Out-of-stock items cannot be ordered.
- Well tbh nothing can be ordered.We advise you to order real food if you are actually hungry.



## External Libraries

- [TailwindCSS](https://www.npmjs.com/package/tailwindcss)
- [React intersection observer](https://www.npmjs.com/package/react-intersection-observer)
- [Classnames](https://www.npmjs.com/package/classnames)
- [@react-hook/window-size](https://www.npmjs.com/package/@react-hook/window-size)
- [axios](https://www.npmjs.com/package/axios)

