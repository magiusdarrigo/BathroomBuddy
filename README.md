![](pics/bblogotrans.png)
Bathroom Buddy is a simple yet powerful device that helps users decrease their environmental footprint by alerting and tracking users' water and light consumption. Users may monitor their activity on the Bathroom Buddy website where they may also redeem rewards for eco-friendly habits.

## Inspiration
Water is one of our most finite resources - we cannot live without it. The average American shower uses 17.2 gallons and takes roughly 8.2 minutes. We realized that by cutting down showers by just a minute, we could be saving 2.1 gallons every shower session!

## How we built it
We sautered an ESP8266 with photoresistors to sense light changes. The device uses node.js to send the data to a Firebase database where our web app pulls data from. The web app was built with HTML, CSS, JavaScript/JQuery, Bootstrap, Google CHarts API, and amCharts API.

## Challenges we ran into
Figuring out how to assemble the hardware into a small form was one of the most difficult parts. We wanted the hardware to be cost effective and light-weight.

## Accomplishments that we're proud of
We are most proud of the UI/UX design that animates upon loading, giving the app a modern feel.

## What we learned
We learned to create a dynamic and modern application that helps conserve water. Each one of our team members improved our software and hardware skills. We did research to see what made a modern app visually appealing and attempted for a minimalist look.

## How to run the web app
Go to https://magiusdarrigo.github.io/BathroomBuddy/or simply clone the repo and open the index.html file in a browser(preferably Chrome). A user ID you can test would be raspgary.
