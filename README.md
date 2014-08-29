## Job Hunter - [Live Site](http://jobhuntr.co)

This is a quick app to keep track of your job hunt. Add jobs to your list, mark your progress as you get in touch, get responses, interviews and offers, then have a quick summary of your search at any time. Also mark down important details like interview dates, salary, and contact info.

I made this mostly to try out the MEAN stack - MongoDB, Express, Angular and Node. If this were a larger project, I'd add the following:

* Tests
* A real authentication / permission mechanism on the Express side
* Controllers in Express
* Standard app features like "Forgot Password", transactional emails, etc

As it is, it does what I need it to.

## Install

Make sure you have [Mongo](http://mongodb.org), [NPM](http://www.npmjs.org), [Bower](http://bower.io) and [Node](http://nodejs.org) installed.

    $ git clone git://github.com/agius/jobhunter.git
    $ npm install
    $ bower install
    $ supervisor -w app,config,node_modules,package.json,server.js server.js

Then head to <http://localhost:8080> . Note that when you want to deploy, you'll need to set the following environment variables on your server:

* NODE_ENV
* PORT
* SESSION_TOKEN
* MONGO_URL

## License

The MIT License (MIT)

Copyright (c) 2013 Madhusudhan Srinivasa <me@madhums.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.