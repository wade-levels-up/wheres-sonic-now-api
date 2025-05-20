# Find Sonic Fast

🏔️ Objective:

I set out to create a 'Where's Wally' style game where the player finds a handful of characters within a busy image in the fastest time possible. I wanted to base this game around the 'Where's Sonic Now?' books by Ladybird, but draw inspiration from the Sonic & Knuckles and Sonic 3 Sega games from the 90's, which the book's illustrations are based upon.

💪🏻 Challenges:

From the start I knew it was a priority to keep the state of which characters were found, as well as the time seperate from the front end of the application. As the application interacts only with anonymous users I decided to use sessions with short expiry times to track this data.

Initially I'd set out building the application with sessions and cookies to verify the user after their session had been created. This worked fine in a local development environment but after deploying the application with my front end hosted on Netlify and my back end on Railway I had a lot of issues trying to make cross-domain cookies work. I made the decision to refactor the project to use json web tokens for authentication instead but kept express-session in place to handle the sessions even though cookies were no longer being used to authenticate the users.

The other challenge I ran into was keeping a single source of truth for the start time of the game and the end time of the game. I haven't perfected this by any means as server latency will still affect a player's time, though I've done as much as I understand to not let it affect the player's overall experience. Perhaps in the future I can create a means to calculate the time it takes to store the score on the server and deduct it from the final score.

⚙️ Technologies Used:
HTML, CSS, JavaScript, Node.js, Express, Prisma, PostgreSQL, React, Netlify, Railway
