# User Fluent
![Image for app](https://res.cloudinary.com/dmqtrnawm/image/upload/v1576203002/uf/uf-1_elx5re.png)

## Dont forget to precompile assets!!!!
- rake assets:precompile
- rake assets:precompile RAILS_ENV=production
## About
UserFluent is a UI/UX social media platform focused towards sharing interface designs and collaborating with others to improve the user experience of web applications.
## LICENSE
UserFluent™ Incorporated All Rights Reserved.

NOTICE:  All information contained herein this repository is, and remains
the property of UserFluent™ Incorporated.  The intellectual and technical
concepts contained herein are proprietary to UserFluent™ Incorporated and
may be covered by U.S. and Foreign Patents, patents in process, and are
protected by trade secret or copyright law. Dissemination of this
information or reproduction of this material is strictly forbidden unless
prior written permission is obtained from UserFluent™ Incorporated.

Written by C. Gunnar Rosenberg <gunnarrosenberg@gmail.com>, Jan 1st 2020
## Specs
    

``` Ruby 2.6.1 ```

```Rails 5.2.3```

```Postgres db```

``React frontend``

```Devise for user accounts/authentication```

```Active_Admin for admin accounts```

## Setup


```
$ rvm 2.6.1
```
```
$ bundle install
```
```
$ npm install  or  yarn install
```
```
$ rails db:setup
```
```
$ rails db:migrate
```
```
In two separate terminals run:
        - $ rails s
        - $ ./bin/webpack-dev-server
```
```   
--> visit http://localhost:3000/
--> visit http://localhost:3000/admin   (for the admin pannel)
```

## Testing
```
$ rspec
```
## To-do

- Re-name react views dir to routes
- Move profile posts method back to user controller
- Make this provide users posts, posts liked by the user, user name/info, etc...
- Improve user profile

- Add Newsfeed to see followers activity...

- convert stuff to flexbox...

- switch to imagekit.io maybe?

- add input frontend verification to forms
 
- Add ability to view other users profiles
- Add ability to follow other users
 
- Improve login/out views
- Make content viewable for non users

- Improve post tiles in indexes
- Add comment count
- Add functionality to ellipsis icon
- Flag post, follow, etc...
  
- Add lower nav bars for specific content views
- Add separate pages for content types
  
- Add design crit feature to posts
- Ability to rate various aspects of the post
- Add analytics dashboard for users - paid feature?
- Add ability to fork posts and perform markups
- bounding boxes with fabric.js
- sticky notes

- Add job board features + hiring / looking for work to profile
- Add employer dashboard

- light mode and dark mode

- validate user is logged in for specific pages in controller