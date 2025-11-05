# Irish Beacon Watch Changelog

## version 0.6.0
Moved all weather and marine Forecast into Lightohuse page (Forecast page will now be Lightohuse page)
Image button unused (swithed off)
Changed layout of Lighthouse page (Removed Lightouse age and coast fields from aids to navigation cards)
The homepage now gets lighthouse data from database by Adding a fectAllLighthouse function in data.js file
Naming convention changes and sminor code cleanup
Added customised ClusterMarkers

## version 0.5.2
Added click action to map marker on homepage
Added Google Custom Search API to Forecast page
Added Coastal select button to map on homepage
Added Marker Clustering
Added flytobounds action for selected coastal area

## version 0.5.1
Added Map to Marine and Historical Pages
Updated lighthouse data
Added a "coast" attribute to the lighthouse type 

## version 0.5.0
Added Buttons to Historical page
Added basic About Page
Rechanged dicision to add images to database due to the site being static
Enabled the pages to resize between desktop and mobile view
Added generic error massesge component
README file updated

## version 0.4.1
Added Landing Page
Added 1 ageChart component to Home page with sort function applied
Added table with a list of lighthouse max metrics
Updated lighthouse placeholder-data with actual data
Added Footer component
Added max wind and gudt metrics to Historical page

## version 0.4.0
Added Landing Page
Added 3 Charts to Home page with sort function applied
Updated lighthouse placeholder-data with actual data

## version 0.3.0
Added Pagination component to all pages
Added Search bar component to allow search by Lighthouse name
Added Current Visibilty metric to Forecast Page Header
Added Wind and Visibilty number to text conversion function
Added styling and new layout to Marine page

## version 0.2.0
Added linegraph to Historical page to show wind metrics
Added linegraph to Marine page to show waveheight metrics
Added map to Forecast page
Changed lighthouse data from database fetch to placeholder-data for map on home page
Added Chart to Home page
Added styling and layout to forecast Page

## version 0.1.1
Added map to home page
Added weather api data forecast page (graphs and tables are still to be decided on)
Rendered weather data on forecast page
Implemented function to retrieve lighthouse data from database onto map page
Added Historical API call to data file
Added test historical weather table to Historical page

## version 0.1.0
Clone example boiler plate from nextjs official web page https://nextjs.org/learn/dashboard-app/getting-started
Run pnpm i to install the project's packages.
Run pnpm dev
Push Project to Git Repository
Pushed project from git repo to Vercel account for deployement
Created a new connection to Neon PostresSQL database
added .env file
added database credentials to .env and executed pnpm i @vercel/postgres to retrieve database dependencies
Seeded database with lighthouse table
Changed page names from Dashboard project to Beacon watch project