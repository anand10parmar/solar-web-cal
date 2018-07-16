![](https://i.imgur.com/mkXHCZ5.jpg)
## link to demo

[Demo](https://anand10parmar.github.io/solar-web-cal/).


## Solar web calculator

To see the source code please clone this repository https://github.com/anand10parmar/solar-web-cal.git to your local machine.
open your terminal and type > git clone https://github.com/anand10parmar/solar-web-cal.git

## RUN

After downloading please run the index.html file to your browser.

Project does'nt need local host server to run.
just latest browser with enabled javascript.

## Steps to use
Step-1: Enter location
Step-2: Select the area to draw the polygon
Step-3: Draw the polygon to calculate the area
Step-4: Note down the area
Step-5: Enjoy!!

## Approach

- Decided to you use bootstrap to ensure the responsiveness and better grid view.
- Started reading about google map api from (https://developers.google.com/maps/documentation/).
- Created google API key.
- Launched google map on web browser
- Created input search with motion using -webkit-transition.
- Imported auto-complete google search to my module.
- Search is restricted to USA as per the requirements.
- Used Geometry and drawing libraries.
- Made functions required for better use.
- Compute area using google.maps.geometry.spherical.computeArea(newShape.getPath());
- Converted long decimal to 2 decimal float using parseFloat(area).toFixed(2);

## Note
- You can use square tool and rectangle tool to find the area.(I will think about it soon)


