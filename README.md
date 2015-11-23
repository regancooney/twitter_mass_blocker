# Twitter Mass-Blocker

I had an issue where I was being targeted by some follow-spam on Twitter. I wrote this quick interface to help manage my followers.

## Configuration

Rename config.example.js to config.js and set your twitter handle and API keys. Then launch it however you run node apps locally.

## Extras

Because Twitter has limits on how many users you can report for spam in a specific interval, there is another controller action (/block_export) which will simply output the Twitter IDs of the users you select. You can then save this to a CSV file, and import at https://twitter.com/settings/blocked to bypass the time limit.
