# Project 1 @cmda-minor-web · 2018-2019

## Table of Content
1. [Opdracht](#1)
2. [Het product](#2)
3. [Waarom nu wel voldoende?](#3)

<a name="1"></a>

## Hoofdstuk 1 |  Opdracht
_Omdat ik de week van project-1 helaas griep had, heb ik maar 1-2 dagen kunnen werken aan het project. Dit project heb ik nu afgemaakt._

_Het eerste projectweek speelt zich af in de Openbare bibliotheek Amsterdam. Wij krijgen als klas toegang tot de API van de OBA, waar veel verschillende data in staat opgeslagen. Denk hierbij aan beschikbaarheid van de boeken, dvd's of bijvoorbeeld de openingstijden. Hiermee hebben we de opdracht gekregen om een prototype te bouwen waarin we de bezoeker een hand kunnen helpen bij het zoeken van zijn/haar product._

De opdracht van het project is: _een prototype bouwen dat bezoekers kan helpen om items uit de OBA collectie te vinden._

Ik had hierbij meteen het idee om het de gebruiker zo makkelijk mogelijk te maken door middel van de dichstbijzijnde bibliotheek direct toe te wijzen. 
Hoe ik dit waar heb gemaakt kunt u lezen in het volgende hoofdstuk

<a name="2"></a>

## Hoofdstuk 2 | Het product
_Om het product het beste uit te leggen heb ik hieronder de workflow beschreven (+screenshots)_

**Hoofdpagina**
De klant bezoekt helpikhebsneleenboeknodig.nl

<img src="https://i.ibb.co/23SBssm/image.png">

**Zoekopdracht**
De klant typt de naam/autheur van het boek in en de zoekopdracht worden netjes weergegeven.

_feedback_
<img src="https://i.ibb.co/PDYjvBb/image.png">

_zoekresultaten_
<img src="https://i.ibb.co/khvB319/image.png">

**Resultaten Pagina**
De klant drukt op het gewenste boek en krijgt meteen te zien waar het boek, het dichste bij, beschikbaar is (op een kaart).
<img src="https://i.ibb.co/ZHmMhmC/image.png">

Ook heeft de klant de optie om elke gewenste bibliotheek in google maps te openen
<img src="https://i.ibb.co/MNHyYdh/image.png">


De website bevat op dit moment:
- Een NodeJS server-side webpagina
- Connectie met de OBA-API
- Een MapBox kaart
- Routering d.m.v. [routie](http://projects.jga.me/routie/) (libary)


## Hoofdstuk 3 | Waarom nu wel voldoende?
Omdat dit de herkansing is, is het belangrijk te benoemen waarom ik vind dat het nu wel een voldoende waard is:

- Omdat ik tijdens de projectweek ziek was, heb ik toen (bijna) niks kunnen maken. Dit heb ik nu afgemaakt.
- De doel van het project is belaald. (prototype bouwen waarin we de bezoeker een hand kunnen helpen met het zoeken van zijn/haar product)
- Het is mogelijk om boeken te zoeken (dus connectie met de OBA API)
- Er wordt gebruik gemaakt van een mapbox om de bibliotheek locaties weer te geven.
- Routering d.m.v. routie (WAFS)
- Pagina ziet er netjes uit (CSS TO THE RESCUE)
- extra: server-side rendering



Wat moet er nog gedaan worden : 
-bugfix minder dan 9 zoekresultaten