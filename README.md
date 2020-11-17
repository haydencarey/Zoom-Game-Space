# DOCUMENTATION

## Introudction 

For project 2, I was immediately drawn to the concept of creating synergy between Connections Lab and Critical Experiences. I will briefly describe my intentions for my Critical Experiences Project.

I am exploring how play in early child development manifests as individuals grow old. My background and passion fall under in-person, imaginative experiences that connect others and that can't be truly experienced unless you are in the presence of the *thing.* I wanted to connect the concept of play with an embodied experience. COVID makes this challenging. I decided to pursue the next best option in this new world, a Zoom experience, which has been [gaining traction as of late](https://www.nytimes.com/2020/11/05/theater/escape-rooms-online-play.html). 

Introducing Mission Space, the Zoom experience (name WIP). It's objective is to remind adults how fun it is to tap into their childlike spirits. It’s so much fun to play how you once did. Children are inventive and nothing is out of bounds. I want to encourage adults to explore new ways of play and hold onto the feelings of play they had as a child.

I made a comprehensive script for the Zoom experience, which can be found on my [blog](https://haydenyaelcarey.com/Mission-Space). The Connections Lab project is meant to be a **companion destination for the Zoom guests to facilitate the experience and add an extra layer of immersion**. 

## Description 

In the experience, each Zoom guest is an astrobiologist looking for life on other planets. The public index.html is the astrobiologist [Mission Companion](blog](https://haydenyaelcarey.com/Mission-Space)), complete with mission details that dynamically updates the stages in the misison, a life "intercom server" chat app, an observations note-taking app, and a p5 canvas on the bottom. These elements each play a role in the Zoom experience. 

During interplanetary travel, the astrobiologists will be asked to redirect to their [Control Centers](https://bramble-diamond-mass.glitch.me/input/control-center.html). The Control Center includes buttons, sliders, switches, your "travel view," a "manual control," and a data" section. Again, these elements come into play during the experience.

## Production Process & Decisions

The first step was to think about the interface. I used both [Disney Epcot's Mission Space ride](https://www.google.com/search?q=mission+space+epcot+screen&source=lnms&tbm=isch&sa=X&ved=2ahUKEwin-uaOj4rtAhWtFFkFHdx0AvEQ_AUoAnoECB0QBA&biw=1200&bih=886) and [Space X's docking simulator](https://iss-sim.spacex.com/) for inspiration.

The next step was to think about the UX: the kind of interactions I wanted for my guests and how that would integrate with my experience. I met with Craig. He gave me five manageable steps to get the ball rolling: create a functioning chat app, implement a real-time p5 canvas onto the webpage, create a JSON file of the steps I wanted the guests to see, fetch that data, create a functioning button that can cycle through the prompts. I heavily used both Mathura and Craig's weekly videos on fetching data, chat apps, and drawing apps to achieve this. This was my foundation. Now, it was a matter of building on this, creating a better UX, and a seamless game. 

## Sockets Communication

There are numerous instances of socket emits and retrievals throughout my server-side and client-side code:
- The chat app (lines 34-40 in index.js & lines 34-64 in app.js)
- The note-taking app (lines 53-59 in index.js & lines 21-62 in appShare.js)
- The p5 sketch (lines 65-71 in index.js & line 77 and lines 138-142 in sketch.js)
- Button audio (lines 44-48 in index.js & lines 16-34 in appButton.js)
- URL param password to display the button for the "game-master" (lines 25-29 in index.js & lines 18-26 in app.js and lines 17-25 in appViewJSON.js)
- The stage button in the Mission Companion (lines 75-79 in index.js & lines 35-46 in appPromptsJSON.js)
- The views button in the Mission Control Center (lines 83-87 in index.js & lines 86-91 and lines 58-61 in appViewsJSON.js)

The main challenges came from the final three sockets communications listed above. I will explain my process.

I knew I wanted the "game-master" (me) to have certain privileges. In this case, the privileges were simple. As the "game-master," I wanted access to a button that could inform the guests where they were in their journey. The guests should see the words and images but not have access to the buttons that cycle through the JSON data. This was a long process to figure out, but after consulting with a friend and online, I came up with a solution.

Using [this MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams), I learned how to work with a query string of a URL. On line 5 in app.js, I identified the object instance I needed in the URL. I set the value associated with that parameter to a variable 'password' (line 6 in app.js). Then emitted the value of 'password' to the server (lines 17-18 in app.js). On the server-side, I check to see if that value is equal to the pre-set password. If they match up, I send a boolean to the [individual socketid](https://socket.io/docs/v3/emit-cheatsheet/index.html) (lines 25-29 in index.js). If the client receives True from the server, they are the "game-master" and I use this code, "nextStepBtn.style.display = 'inline-block'" to display the button. For each interaction that depended on the password, I needed to send the password parameter to the server to check if it matches the pre-set password. This is the core functionality of the final two socket communications listed above.

My other serious challenges were the client-side javascript and css. For instance, I was cycling through images and a video in a JSON data set (views.json). For the interplanetary travel views in the control center, I wanted the button to cycle through images, as well as a video. The video is a launch of rocket, which mimicks it's time for take-off in the Zoom experience. This conditional piece of code solved that 
if (views[count].video) {
     missionBox.innerHTML = `  <iframe class="video" width="420" height="315" src=${views[count].video}> </iframe>`" }. (appViewsJSON.js lines 33-34)

Editing the HTML within my javascript files took trial and error. Playing with the CSS to display the HTML elements to my satisfaction took up the most time. I spent long nights cycling between my developer tools and VS code, workshopping my CSS. 

My final challenge was figuring out a way to better personalize the Mission Companion. Mathura had a fantastic suggestion to create an Alert Box once the pages loads, asking the user their astrobiologist name. Craig then helped me capture the input in a variable, namePrompt (lines 67-68 in appShare.js). I then was able to populate the namePrompt throughout the webpage, making for a more personalized webpage and better UX. I even emitted the namePrompt variable between Sockets so users didn't have to keep typing in their name.   

## Final Thoughts

Overall, I am incredibly proud of what I accomplished in this project. There's still so much to build upon and continue to playtest in accordance with my Zoom experience. I will say my CSS, javascript, HTML and, sockets knowledge reached new heights. I feel confident with my flex-box and eventListeners abilities. I am comfortable with the data journey between the client and the server when it comes to sockets. I still get tripped up with knowing what data to send between the client and the server.

I am looking forward to playtesting my Zoom experience with the cohort and continuing to build on this project. With each little element I get working, I feel like I am getting closer to more immersion; a more imaginative experience. Long-term, this is what I hope to achieve.

## Final Thoughts:
- In the control center, add more sounds and functional buttons
- Adjust the p5 sketch so it's one single canvas for each user. When the user is done, I want them to submit their drawing and it would populate on the webpage for everyone else to see. The result would be a mosaic of drawings. 
- Alter asteroid p5 sketch code
- Make the alert box functional for the Mission Control
- Incorporating storing data with NEDB somehow?
- Organize my code! The reason I haven't is because of time and fear of ruining functionality 
- Workshop the "flight data" interaction
- Incorporate more interactive and visual elements
- Incorporate an Arduino interaction!
- Play-test!

### Special Thanks to Craig, Mathura for the excellent videos. Aidan for office hours, Dan Schiffman's Coding Train for the tutorials and his Asteroid game code, and the Low Res Cohort for the constructive feedback

















Documentation (25pts): 
Provides a clear description of the project, production decisions (i.e. technical, design, conceptual, creative etc), influences and inspiration, key challenges and solutions, overall lessons learned as well as potential next steps, and relevant references/resources that were utilized. 
Appropriate attribution must be provided to noteworthy material utilized in service of  the research, production and delivery of the project
