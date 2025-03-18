# Irish Beacon Watch Changelog

## verson 0.4.1
Added Landing Page
Added 1 ageChart component to Home page with sort function applied
Added table with a list of lighthouse max metrics
Updated lighthouse placeholder-data with actual data
Added Footer component

## verson 0.4.0
Added Landing Page
Added 3 Charts to Home page with sort function applied
Updated lighthouse placeholder-data with actual data

## verson 0.3.0
Added Pagination component to all pages
Added Search bar component to allow search by Lighthouse name
Added Current Visibilty metric to Forecast Page Header
Added Wind and Visibilty number to text conversion function
Added styling and new layout to Marine page

## verson 0.2.0
Added linegraph to Historical page to show wind metrics
Added linegraph to Marine page to show waveheight metrics
Added map to Forecast page
Changed lighthouse data from database fetch to placeholder-data for map on home page
Added Chart to Home page
Added styling and layout to forecast Page

## verson 0.1.1
Added map to home page
Added weather api data forecast page (graphs and tables are still to be decided on)
Rendered weather data on forecast page
Implemented function to retrieve lighthouse data from database onto map page
Added Historical API call to data file
Added test historical weather table to Historical page

## verson 0.1.0
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