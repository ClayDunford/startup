# CS 260 Notes

[My startup - ClassConnections](https://claydunford.com)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
## Initial Setup
I think using git will become very helpful, but defintiely does not feel initially very intuitive

My general startup ideas:


### Idea 1: Succulents
Succulent window that grows at a realistic speed. Tracks weather based on your location. Maybe uses google maps to create a realistic window scene? (likely needs more functionality) It would be cool to combine it with a productivity system ala forest? Maybe connect it with the atomic habits system?

if atomic habits, once a habit reaches "maturity" you can "propogate it" by stacking another habit on top of it. 

Multiple people can do it together to form accountability? "Hey it looks like such and such person's plant is wilting, send them a message to encourage them"

### Idea 2: Class flow visualizer
Creates a my map class planner, but that shows dependencies based on the pre-reqs. Clearly and simply visualizes the flow, and has a simple visual editor. 

### Idea 3: C is for Cookie
Illustrates how many cookies are currently tracking you in a fun visual way. Maybe a score based on how many cookies you have? (Raw (less) to burnt (tons)

## AWS
Public IP Address: 54.167.138.102
## Caddy
Seems pretty simple. Nano was much easier to use than VIM
## HTML
It seems like for deploying the code, I use the deploy feature and it basically uploads the file to the server, to update it.

Building sites in HTML is fairly simple, especially without CSS. It feels like it mainly about just throwing stuff on there, almost like a rough draft, and filling in that skeleton using css and later React.

## CSS
Css is very finicky, so it's very very helpful to use bootstrap. It's nice how quicly you can iterate
## React Part 1: Routing
React is all about paying very careful attention to the syntax changes between html, css, and jsx. As I implemented this, it made it a lot clearer how it all worked together.

## React Part 2: Reactivity



## Midterm Notes
Midterm Questions
In the following code, what does the link element do?
  Links to an external source, not currently part of the page
  Typically used in the head element for things like CSS
In the following code, what does a div tag do?
  Makes a divider within the body
In the following code, what is the difference between the #title and .grid selector?
  '#' means the ID is equal to title
  '.' indicates a class 
  Both within css
In the following code, what is the difference between padding and margin?
  Margin is the space between elements, pushes the relevant object away from external objects
  Padding is space within an element, space between content and the border, pushes content inward
Given this HTML and this CSS how will the images be displayed using flex?
  It will be resized based on the size of the window. Needs to be applied to the container
What does the following padding CSS do?
What does the following code using arrow syntax function declaration do?
  They function like an R pipe and a function defintition
What does the following code using map with an array output?
  map is a function that applies to each element in an array and output a new array without affecting the original
What does the following code output using getElementByID and addEventListener?
  Used together to attach an event listener to an html object, usually one follows   the other
  ex: document.getElementByID(ID).addEventListener("click", function)
What does the following line of Javascript do using a # selector?
  document.querySelector('#title') → uses CSS selector syntax (#)
  document.getElementById('title') → direct ID lookup
Which of the following are true? (mark all that are true about the DOM)
  Tree Structure
    Document objecti is the root, everything else is a node
  Nodes and objects
    Elements, attributes, other html objects become nodes 
  API for interaction
    Enables accessing using methods like:
      - document.getElementById(), 
      - document.getElementsByClassName()
      - document.querySelector()
    Modify Content
    Add or Remove Elements
    Handle Events
  How it works:  
    Parses HTML and builds the DOM
    Javascript Interaction interacts with this representation
    Changse made through JS dynamically update
By default, the HTML span element has a default CSS display property value of:
  Inline
How would you use CSS to change all the div elements to have a background color of red?
  div {
    background-color: red;
  }

  example structure:
    selector {
  property: value;
}
How would you display an image with a hyperlink in HTML?
  <img src="" alt="">
In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
  +----------------------------------------------------+
|                    MARGIN                          |
|  +----------------------------------------------+  |
|  |                 BORDER                       |  |
|  |  +----------------------------------------+  |  |
|  |  |               PADDING                  |  |  |
|  |  |  +----------------------------------+  |  |  |
|  |  |  |           CONTENT                |  |  |  |
|  |  |  |  (text, images, etc.)           |  |  |  |
|  |  |  +----------------------------------+  |  |  |
|  |  +----------------------------------------+  |  |
|  +----------------------------------------------+  |
+----------------------------------------------------+

Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
What will the following code output when executed using a for loop and console.log?
How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
How do you declare the document type to be html?
What is valid javascript syntax for if, else, for, while, switch statements?
What is the correct syntax for creating a javascript object?
Is it possible to add new properties to javascript objects?
If you want to include JavaScript on an HTML page, which tag do you use?
Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
Which of the following correctly describes JSON?
What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
Which of the following console command creates a remote shell session?
Which of the following is true when the -la parameter is specified for the ls console command?
Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
Is a web certificate is necessary to use HTTPS.
Can a DNS A record can point to an IP address or another A record.
Port 443, 80, 22 is reserved for which protocol?
What will the following code using Promises output when executed?

