<p align="center">
  <a href="https://www.wizardsurvey.fun"><img src="https://www.wizardsurvey.fun/og" alt="Logo"></a>
</p>
<h1 align="center">WizardSurvey.fun</h1>

## Why wizardsurvey.fun?

- As a side project, I set out to create a survey website that prioritizes user-friendliness and offers an appealing user interface.
- In my research, I came across findings indicating that traditional survey designs tend to lack engagement.
- I also discovered criticisms regarding online surveys, citing issues such as uninteresting content leading to negative respondent behavior, including speeding through questions, providing random responses, and reduced participant attention.
- These insights inspired me to develop a survey platform that aims to transform the survey-taking experience into an engaging and enjoyable one, all while maintaining an intuitive user interface.

## Contribution Guidelines

To contribute to this project, please follow these steps:

- You can reach me out on [Twitter](https://twitter.com/visrut06815925) or [LinkedIn](https://www.linkedin.com/in/visrut-navadiya-4498391a4/) to discuss the feature you want to implement, or support development.

### Setup

- **Docker**: If you haven't already, install Docker to manage containers.
- Run `npm run setup` to install all the dependencies and start mongodb container.
- Run `npm run dev` to start the development server.
- Run `npm run test` to run the tests.
- If you want to see database state, you can run `npm run db-ui`

## Tech Stack

- **MongoDB**: I chose MongoDB as the database due to its flexibility and user-friendliness for now it seems like a good fit for the project.
- [Next.js](https://nextjs.org/) with [DaisyUI](https://daisyui.com/) for the frontend.
- I am using [Mongoku](https://github.com/huggingface/Mongoku) to view the database state.

## Features

- [x] Ability to create a survey manually.
- [x] Ability to create a survey using OpenAI
- [x] Ability to share the survey with a link.
- [x] Ability to submit survey responses.
- [ ] Ability to view survey analytics.
- [x] Ability to export survey responses as CSV.
- [ ] Ability to view survey responses as a chart.

> Note: I need to deploy the OpenAI API separately because I have a Vercel hobby plan that encounters a request Gateway timeout error (504). Instead, I have deployed it on one of my AWS instances. Don't worry; it's only used for generating survey questions using OpenAI, and nothing else.
