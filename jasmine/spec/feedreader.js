/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has an url defined && it is not empty', function() {
            //loop through allFeeds array of objects
            for(let feed of allFeeds) {
                //testing that on each iteration, individual feed object's url property is defined
                expect(feed['url']).toBeDefined();
                //testing that on each iteration, individual feed object's url property is type of String
                expect(typeof(feed['url'])).toEqual('string');
                //testing that on each iteration, individual feed object's url property's length is not 0 (not empty)
                expect(feed['url'].length).not.toBe(0);
            }
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name defined && it is not empty', function() {
            //loop through allFeeds array of objects
            for(let feed of allFeeds) {
                //testing that on each iteration, individual feed object's name property is defined
                expect(feed['name']).toBeDefined();
                //testing that on each iteration, individual feed object's name property is type of String
                expect(typeof(feed['name'])).toEqual('string');
                //testing that on each iteration, individual feed object's name property's length is not 0 (not empty)
                expect(feed['name'].length).toBeGreaterThan(0);
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        /* It ensures the menu element is
         * hidden by default.
         */
        it('hides menu by default', function() {
            //creating a variable hidden to capture <body> tag w/class menu-hidden (default status is true)
            let hidden = document.body.classList.contains('menu-hidden');
            //testing if hidden is set to true
            expect(hidden).toBeTruthy();
        });

        /*  It ensures the menu changes
         * visibility when the menu icon is clicked.
         * Should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu shows on click menu button and vice versa', function() {
            //creating a variable menuButton to capture <a> tag w/class menu-icon-link
            let menuButton = document.querySelector('a.menu-icon-link');
            //simulating click
            menuButton.click();
            //testing after simulation-click that <body> tag is false
            expect(document.body.classList.contains('menu-hidden')).toBeFalsy();
            //simulating click again
            menuButton.click();
            //testing after simulation-click that <body> tag is true
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();
        });

    });


    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* It ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });

        it('has entries in feed container', function(done) {
            //creating a variable feedContainer to capture <div> tag w/feed class (feed container)
            let feedContainer = document.querySelector('div.feed');
            //creating a variable feedEntries to capture feed container's children <article> tags w/class entry
            let feedEntries = feedContainer.querySelectorAll('article.entry');
            //testing if there are entries
            expect(feedEntries.length).toBeGreaterThan(0);
            done();
        });
    });


    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* It ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        //defining variables, which will hold previous and current feeds
        let prevFeed;
        let currFeed;

        beforeEach(function(done) {
            //loading first time feed
            loadFeed(0, function () {
                //in variable prevFeed we are capturing <div> tag w/class feed (HTML format)
                prevFeed = document.querySelector('div.feed').innerHTML;
                done();
            });
        });

        it('content changes once a new feed is loaded', function(done) {
            //loading second time feed
            loadFeed(1, function(){
                //in variable currFeed capturing <div> tag w/class feed (HTML format)
                currFeed = document.querySelector('div.feed').innerHTML;
                //testing that prevFeed is defined
                expect(prevFeed).toBeDefined();
                //testing that currFeed is defined
                expect(currFeed).toBeDefined();
                //testing that prevFeed and currFeed are not equal
                expect(prevFeed).not.toEqual(currFeed);
                done();
            });
        });
    });
}());
