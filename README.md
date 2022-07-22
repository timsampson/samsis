# Student Services Application Example App

## Description

I use GAPS for different tasks at work and over the years I've build a few mini appliations that have been useful un organizing data and saving some administrative time. With each year, I've updated the applications to encorporate new patterns or updated tooling and it is getting a bit difficult to remember which application has which new useful pattern or feature that I'd like to add to the next application.

## Motivation

With this in mind, I've realized that it would be helpful to have one application that makes use of as many of the patterns and processes in one app. I'll try as much as possible to first build a new feature or use case with this repository and then extract the funtionality for the targeted application needed.

## Use Case

In the applications put to use so far, the number of accounts that are processed are less than 1000, and some of the records (tabs) have almost 4000 rows with around 20 columns. I'm sure a proper database would be more suitable and more efficient, but certainly not as flexible when you want to open a sheet and make an edit, or do some analitics.

It may end up being an impractical Frankenstein app, but I think it will be fun to build. Starting with the most basic features, with each feature branch, I will be adding functionality.

## Features

- Sheet Menu add on and alert
- Web App with doGet
- Use Svelte.js and Svelte Stores
- TailwindCSS for Styling, Daisy UI components.
- Routing with ItalyPaleAle\svelte-spa-router and using google.script.history.push
- Form submission for students to join clubs
- Admin for Club Manager to approve or reject applications.  Setting to auto accept if club is not full.
- Form submission for student behavior records.
- Admin for student behavior records. Delete or edit entries
- Page for student to review their own records.

## To Do

1. Update the documentation so someone new to GAPS can follow along and build something similar themselves.
2. Get it working without needing extra steps other than downloading and running npm install. Issue with it not working on Windows after npm install.

## FYI

The data is all mock data, except for some of my details, which needed to be there to properly test and use the app.

![Home Page View](https://raw.githubusercontent.com/timsampson/samsis/main/docs/loading.gif)
