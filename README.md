The application has been designed using React JS framework on front end and Express as the server side framework. 

# Backend Overview

There are 3 API’s created for this task. 
GET : For retrieving the list of boats and their status
POST : For adding a new boat
PUT : For updating the status of an existing boat


# Frontend Overview

As the frontend is built using react, thus we have divided the main component responsible to show a board with boats and their respective status, into sub-components / children. The UI shows a board with 4 different columns corresponding to each status. There are 4 statuses : DOCKED, OUTBOUND_TO_SEA, INBOUND_TO_HARBOR and MAINTENANCE.

The board has the status and the boats corresponding to them are listed below them. This could be viewed either on desktop or mobile. 

There is a button “Add Boat” for the user to add a new boat. I have made use of Modal so that the form looks a little pretty by popping in between. 

I made use of children/sub components so as to enhance modularity and loose coupling. This would be useful in case of adding any new features in the future.

I have made use of a bootstrap grid so as to give the board a clean look.

# Few things which could not be done due to time constraint

Drag and drop feature in order to update the status is working for desktop version and not for mobile version. I could have deep dived in case of more time.
I have written unit and functional tests using Jest in my company. However somehow I couldn't do the same here due to issues related to installing enzyme adapter. I have used shallow to get into the component and then tested different features corresponding to the same. Due to the missing adapter class, could not proceed.
