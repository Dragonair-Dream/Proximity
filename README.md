# Proximity
an app to find friends

Capstone MVP Statement & Tiers

Idea: Social (tracking) app that finds your friends near users based on their location. Users can post video/photo and pin on map allowing friends to see where they are and what they’re up to. 

Description:
User has 1 modes → signed in
User chooses to share location or not
If sharing location the map actively tracks but only appears on map via a toggle to share current location and post with friends.
Users can now see friends nearby. 
Once “shared,” chat feature unlocks and both parties can engage via link in popup(post).
User sees other users' posts. They can now click the chat link to discuss a meetup.
Push notification for new messages?
(Stretch goal) Includes an endorsement feature, which allows for users to anonymously endorse other users. This is a way of making the app more safe, as well as a measure for dealing with robots, etc.

Lets walk through our app:

- Sign in
- Add friend
- see friend
- see friend posted blip
- click on blip and see post
- blip has expiration 24 hour
- we can chat with friend.
- we have a map that shows current location of user/s
- send message link on post that send user to chat feature.
- send notification of user post / when nearby?


User Stories: 
Jacopo Amigoni downloads “Proximity”. Prior to the signup process, they are prompted to provide their location services. They are prompted to sign up or login. Since they don’t have an account already, they sign up by entering their name, email and phone number.Upon completing the sign up, they are asked if they want to add friends from contact list / add directly by phone # / OAuth through Facebook, Gmail, etc. An accompanying message explains that this information will be used for finding people they know on the app, along with a brief privacy statement.
Jacopo Amigoni agrees to share their contact list with “Proximity”. They are then prompted to fill out their profile. First they are asked to add up to 1 picture
Once they’ve completed their profile, they see their friends in map view– these are other users they selected as friends. Jacopo Amigoni looks through their map view, and finds one of their friends. They “click” on this person's location icon, and if there’s a post, the popup displays a single photo/video from the friend as well as a link to start chatting.
Jacopo Amigoni is messaged by friend Luca using the chat box. (They agree to meet, and now Luca can navigate to Jacopo Amigoni?)

Proof of Concepts:
(PWA) React Application  #1
Login/Signup #2
Seeing a basic version of some map #3


MVP Features:
Login and getting a map view
See friends on map
See blips on map
Open blips to view media / message friend

Tech Stack:
React (possibly PWA library) FE
CSS Framework - ***Decide by morning of 1/27***
Firebase BE
Map API (Google, etc.)


Stretch Goals:
Endorsement Feature: The next time Alexis logs in, they are prompted to “endorse” a user who is in their contacts. They are informed that all endorsements are anonymous, and are designed to make Z a safer space for all users. This co-endorsement happens each time Alexis opens the app, until they run out of contacts who are also users.
