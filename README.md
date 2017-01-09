Pomodoro Timer To-Do:
- determine when to take a long break
- CSS styling
  - placement of buttons
  - coloring
  - menu bar
- About page
- Notification settings
  - alternate sounds
  - volume control


Bugs:
- time initially displays with only one 0 in the minutes place
  - Bug fixed, but in a haphazard way: if seconds == 0, it displays as the string "00"
    - there must be a better way, but it doesn't matter for right now
- upon adding custom time, new custom time should be default in dropdown menu
- ding only happens after the alert pops up, should happen before
- persist custom times through reloads and page changes
  - refactor code so that variables are global?
  - I think globals are generally bad, so maybe this should be tied up in user profile?