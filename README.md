<p align="center">
  <img src="https://github.com/Csriso/wevape-client/blob/main/public/logo.png?raw=true" />
</p>

# WeVape Front-End

Social network for vape users around the world.

## Screenshots

![App Screenshot](https://raw.githubusercontent.com/Csriso/wevape-client/main/public/screen.png)

## MVP

- Social Stories of different users about vaping (CRUD) ✔️
- Users, add users to follow or friend… ✔️
- People can comment, other people stories and like it. ✔️

## Backlog

- Groups. ✔️
- Used products market, sales offers. ✔️
- Private messages.
- Meetings of vapelovers (flavors tastings, etc)
- Store locations to find in your city.
- Group live chats.

## Proyect layout

- "/public" -> Static files
- "/src/components" -> React components
  - Ad.jsx -> Single Ad component
  - Comment.jsx -> Single Comment component
  - Feed.jsx -> Component that renders all the Posts on "/"
  - FormatTime.jsx -> Component that renders the difference of time for posts and comments
  - Group.jsx -> Single Group component
  - IsPrivate.jsx -> Component for private content
  - LeftBar.jsx -> LeftBar component
  - LightBox.jsx -> Component to highlight pictures
  - Post.jsx -> Single Post component
  - RightBar.jsx -> RightBar component.
- "/src/context" -> React contexts
- "/src/pages" -> React pages
  - "/auth/ -> Auth pages
    - Login.jsx -> Login page
    - Signup.jsx -> Register page
  - Error.jsx -> 500 error
  - Groups.jsx -> Page to show all groups
  - MarketPlace.jsx -> Page to show all the ads in the marketplace
  - NotFound.jsx -> 404 error
  - NotFoundRedirect.jsx -> Page to redirect all 404 to NotFound.jsx
  - Profile.jsx -> User profile page
  - SingleAd.jsx -> Page to show a single Ad and all his comments
  - SinglePost.jsx -> Page to show a single Post and all his comments.
- "/src/services" -> React services to contact the backend.
  - auth.services.js -> Services for authentication
  - comment.services.js -> Services for managing the comments
  - config.services.js -> Services to configurate the Origin of all the services
  - groups.services.js -> Services for the groups
  - marketplace.services.js -> Services to get the ads for the marketplace.
  - post.services.js -> Services to manage the posts.
  - util.services.js -> Other services not related to models in the DB like Upload images

## Authors

- [@csriso](https://github.com/Csriso/)
