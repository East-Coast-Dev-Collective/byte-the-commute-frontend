# Byte the Commute! -- Frontend Web Application

## Overview

Byte The Commute is a web application that provides traffic, public transport, and weather information all in one display to help the fullstack commuter. This repository holds the frontend web site source code and associated files. Note, that you will also need to standup the backend for the application to function properly.

## Tech Stack

- Node.js
- React
- Vite
- JavaScript/CSS/HTML

## How To Run Locally (Placeholder)

This is a placeholder setup flow for local development.

1. Clone the repo down using the command: `git clone <url-from-green-code-button-above>`
3. Run `npm install`
4. You can test out the site by running: `npm run dev`
5. Using your web browser, navigate to `http:localhost:5173` and you should be able to see content.

Some features are still placeholder and not fully implemented yet, but these are the expected local run steps.

## Folder Structure

- `src`
|-- `api`
|-- `db`

## Scripts

- `dev`

## Workflow

Create a feature branch, make focused changes, and open a pull request. Another team member reviews the PR, requests changes if needed, and approves before merge.

## Notes

GTFS (General Transit Feed Specification) is a common format for public transit schedules and route data. Transit agencies publish GTFS feeds so apps can consistently read trips, stops, and calendars. This application will later ingest GTFS data to support routes, stops, and next departures.

For weather support, the application will use each stop's latitude and longitude and call the Open-Meteo API. That response can be attached to stop or departure results to provide local weather context.
