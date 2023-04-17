# Welcome to the Frontend Engineer Task!

This README file contains the instructions you will need to complete your task in the form of a User Story – the format regularly used by Hotjar engineers in our weekly sprints.

## Instructions

This `main` branch already contains code which you will use for your task. Please add any new code to a new feature branch. When you’re done with the task, please submit a GitHub pull request (PR) to `main`.

If you cannot satisfy all the acceptance criteria within the given timeframe, simply prioritise what you feel is important and mention what you have excluded and why in your README file (src/README.md).

For the parts of the task which you feel are unclear, we encourage you to make your own assumptions as long as they are documented in your README file (src/README.md). However, if you have a question or concern that is blocking you from completing the work, please reach out to us via email.

A week after your task start date, a Hotjar engineer will review your PR and you will receive an email within 48 hours notifying you of the next steps.

## User Story

As a user, I want to view all the images available in the form of a list that will automatically load more items as I scroll down.

## Design

🖼️ [Cards design](./design.png) - base design

🖼️ ✏️ [Cards design with annotations](./design-with-annotations.png) - annotated design with dimensions and element properties

## Acceptance Criteria

- The list should have an infinite scroll mechanism that loads images until there is no more content;
- The list should start requesting the next set of images before the user reaches the bottom of the page;
- The list should request 20 images per 'load', and should show 4 images per row;
- The application should be reasonably tested (70%+ test coverage);
- The approach and any decisions made should be explained and elabored upon on the MR or README.md;
- No external packages should be added to the project.

## Important Notes

- Commits and commit messages will be part of the task review;
- While there is a supplied design that shows the intended experience and visuals for the feature itself, please focus on the acceptance criteria first and foremost.
