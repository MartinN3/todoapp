# React + TypeScript + Vite

To feel amused while spending my time on assigment, i chose to try new features or libs i have been eyeballing.

App loads data to cache and so user can work with it. Cache can be edited and every user has separate data. Updates should be saved across logins until page reload.

- React Router with Tanstack(React) Query with using loaders and actions.
- orval for generating types since i was hitting walls with other libraries serving same purpose.

#### For ReactRouter V6 - that included some weird stuff i had to do:

- Using loaders and actions on react router in contrast to data fetching in components with hooks and handling fetching or errors.
- Using route loader as data store for my auth instead of context.

I like that one is able to avoid fetch waterfalls. - example article https://www.infoxicator.com/en/react-router-6-deferred-fetch

Overally i kind of feel that app got smaller for the good, but certain things like loosing typescript on Deferred loader, or doing "happy path" for react query that can handle all cases elegantly seems weird.

If i had to do application with lot of forms with cross dependant inputs, like i usually do, i wouldn't wanna use routeAction but on small apps, it's kinda comfortable to rely on formdata.

#### For Orval

Overally this lib suited well to this small project. I think that it could better handle queryKeys on queries. And maybe include straightforward method to fetch in routeLoaders. Also axios inclusion is something i don't usually do, but it is solid lib with tons of documentation so who doesn't like that.

#### Article included

I have found great summary on react router api i have used. In article he also mentions "tanstack router" and when i looked at comparisions with react router, it seemed like they didn't push for "Fetch" and some clunky loader stuff but keep goodies so i might agree with author that it might be worthwhile to check.

https://programmingarehard.com/2023/04/01/react-routers-data-utilities-are-awkward.html/
