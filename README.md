# Getting Started with the Activity Feed

## Description
This app allows users to view an activity feed of posts, filter posts by username and keywords, and create posts to add to the feed.

## Usage
- To view all posts sorted from most to least recent, scroll down the page.
- To filter posts by a username, use the search bar with label Username.
- To filter posts by keywords within the post, use the search bar with label Keywords.
- To create your own post, type into the text field with label Create a Post. Click submit to publish.
- To like a post, click the thumb icon. 
- To delete your own post, click the trash icon. 
- To switch between dark and light mode, use the toggle in the upper left hand corner.

## Setup
1. In the `activity-feed` folder, run `npm i` or `npm install` to install dependencies.
2. In the `activity-feed` folder run `npm start` to compile and view the app in your browser at `localhost:3000`. 

## Design Decisions
- This app is designed to be functionally simple and efficient. On a typical social feed, users want to consume content and post content with the least amount of clicks/actions as possible. This app does just that. 
- I chose to split components based on user interaction. For example, a user may interact with a Post (ActivityPosts.tsx) by liking it. In the future, users may want to comment or view more information such as the user's company. Therefore, the Post component is broken out to handle those new post-related user requirements.
- The PostContext handles data being fetched from the provided endpoint and stored in local storage. There were several dependencies, so this approach was more straighforward than passing props.

## Challenges
-  Some of the material-ui component's styles weren't intuitive, so that became a bit challenging. However, the solution to that was just investing time in reading through the documentation to better understand it.
-  I am not super familiar with TypeScript, so I had to do some learning! Some of the interfacing and declarations became tricky in the PostContext. I made a little diagram on paper of the data/types being supplied by the endpoint and this made it a lot easier to reference while building out the components.
- The app's UI was tricky to visualize at first because there aren't as many features as a normal "social feed". I used Figma to mock up where features could be placed so that the page wouldn't feel too empty. 

## Possible future enhancements or features
- Commenting functionality on posts
- A `Create Post` filter to ensure profanity, etc. is not being used.
- User Profile Pages 
- A filter to sort posts by: likes, date(most/least recent), topic, company
- Emojis (such as clap and laugh) in addition to the thumbs up
- 95%+ test coverage
- Of course, gather more user requirements through feedback!

## Dev Notes
- The app has been tested on an updated version of Google Chrome.

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
