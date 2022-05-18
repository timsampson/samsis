# Student Services Application Example App

## Description

I use GAPS for different tasks at work and over the years I've build a few mini appliations that have been useful un organizing data and saving some administrative time. With each year, I've updated the applications to encorporate new patterns or updated tooling and it is getting a bit difficult to remember which application has which new useful pattern or feature that I'd like to add to the next application.

## Motivation

With this in mind, I've realized that it would be helpful to have one application that makes use of as many of the patterns and processes in a centralized way. I'll try as much as possible to first build a new feature or use case with this repository and then extract the funtionality for the targeted application needed at work.

## Use Case

In the applications put to use so far, the number of accounts that are processed are less than 1000, and some of the records (tabs) have almost 4000 rows with around 20 columns. I'm sure a proper database would be more suitable and more efficient, but certainly not as flexible when you want to open a sheet and make an edit, or do some analitics.

It may end up being an impractical Frankenstein app, but I think it will be fun to build. Starting with the most basic features, with each feature branch, I will be adding functionality.

## Initial Features

- [Setup Script with Sheet Menu add on and alert](https://github.com/timsampson/samsis/tree/gaps-setup/server)
- [Simple Web Page with doGet](https://github.com/timsampson/samsis/tree/simple-webpage)
- [Web Page with Svelte.js](https://github.com/timsampson/samsis/tree/deploy-svelte)
- [TailwindCSS for Styling](https://github.com/timsampson/samsis/tree/add-tailwind)
- [Routing with ItalyPaleAle\svelte-spa-router](https://github.com/timsampson/samsis/tree/links-pages)
- [Routing with google.script.history.push](https://github.com/timsampson/samsis/tree/url-routing)
- [Add a page to Display Table from a sheet](https://github.com/timsampson/samsis/tree/club-signup)
- [Add a navigation component](https://github.com/timsampson/samsis/tree/nav-component)
- [Navigate to pasted URL](https://github.com/timsampson/samsis/tree/router-paste-url)
- [Submit a simple form from web to a sheet](https://github.com/timsampson/samsis/tree/submit-basic-form)
- [Username with Icon displayed](https://github.com/timsampson/samsis/tree/user-icon)
- [Separate table and form components](https://github.com/timsampson/samsis/tree/club-signup-form-comp)

## To Do

1. Update the documentation so someone new to GAPS can follow along and build it themselves.
2. Get it working without needing extra steps other than downloading and running npm install. Issue with it not working on Windows.

## FYI

The data is all mock data, except for some of my details, which needed to be there to properly test and use the app.

![Home Page View](https://raw.githubusercontent.com/timsampson/samsis/main/docs/loading.gif)
