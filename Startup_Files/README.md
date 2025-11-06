# Class Connections

[My Notes](notes.md)

A tool to show the dependencies between various classes when planning multiple semesters out and displays the flow between classes like a flowchart. 


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Mymap is a great tool for planning classes, but often falls short when you try to move classes around, as it's difficult to track which classes require or are themselves prequisites. This can make planning, especially when creating a multi-year plan difficult. This website intends to be a tool to clearly visualize how your classes flow together, so when you switch one class, you have an understanding of how that affects the other classes you're planning on taking.

### Design

<img width="568" height="452" alt="Design Image" src="https://github.com/user-attachments/assets/bede04f6-cff2-4ad8-a2aa-138ddce45283" />

Simple minimalist design. Centered primarily on displaying the class visualization and letting the user move various classes (here represented by rectangle with rounded corners) around. Each class will be clickable and display information about the class below the editor, as well as highlighting the various classes that connect with this one. The actual classplan itself will be stored in a simple custom data structure, akin to a double linked list. The webapp will then read that data structure to know how to generate the visual of the class plan.

### Key features

- Visual editor to illustrate the connections between classes like a flowchart
- Login feature so users can save their current plans and make new ones
- Export button that lets the user export the currently displayed plan and save it to their computer

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Used to build the structure and skeleton of the website
- **CSS** - Add color and visuals to the site to make it easier to navigate
- **React** - Used to create the visual editor to modify the class structure.
- **Service** - Saves the user's class plans so they can access it at later times. If it isn't too complex, using web services to access the BYU course catalog to dynamically generate the class connections
- **DB/Login** - Each user creates a login to save their plan, which is stored in a database server.
- **WebSocket** - Used to autosave each change the user makes to their plan without having to do anything manually. Automatically highlights when the user has made a change that invalidates their course plan.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://claydunford.com)

Attached the custom domain named and configured the caddy file to use https!

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Added the necessaary pages
- [x] **Proper HTML element usage** - Used the components from HTML
- [x] **Links** - Linked the pages to connect them
- [x] **Text** - Added the basic text to help make it clear how to use the apps
- [x] **3rd party API placeholder** - Added a placeholder for the 3rd party API
- [x] **Images** - The placeholder images are in place
- [x] **Login placeholder** - Created log in place holder
- [x] **DB data placeholder** - Created a Database placeholder
- [x] **WebSocket placeholder** - Created a Websocket placeholder

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Used bootstrap to build this section
- [x] **Navigation elements** - Followed the examples from the bootstrap code pen in the cs260 github
- [x] **Responsive to window resizing** - Used flex to make windows resizable based on mobile vs web users
- [x] **Application elements** - Implemented the basic css for applications
- [x] **Application text content** -Filled in the necessary text content and stylized as needed
- [x] **Application images** - Created a logo that accurately represents my web app

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Built this component
- [x] **Components** - Converted each page into a component
- [x] **Router** - Implemented the router!

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - Added the basic app functionality. Simulated the websocket in the gallery page
- [x] **Hooks** - created simple hooks for running the background programs for the succulent simulation.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Done!
- [x] **Static middleware for frontend** - Applied the code from Simon
- [x] **Calls to third party endpoints** - Weather API used to generate the background
- [x] **Backend service endpoints** - login and logout used
- [x] **Frontend calls service endpoints** - login and logout used
- [x] **Supports registration, login, logout, and restricted endpoint** - Done!


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
