# Project 1 @cmda-minor-web · 2018-2019

## Table of Content
1. [Opdracht](#1)
2. [Het product](#2)
   -  2.1 Gebruikte technieken
   -  2.2 Workflow
3. [Waarom nu wel voldoende?](#3)

<a name="1"></a>

## Hoofdstuk 1 |  Opdracht
_Omdat ik de week van project-1 helaas griep had, heb ik maar 1-2 dagen kunnen werken aan het project. Dit project heb ik nu afgemaakt._

De eerste projectweek speelt zich af in de Openbare bibliotheek Amsterdam. Wij krijgen als klas toegang tot de API van de OBA, waar veel verschillende data in staat opgeslagen. Denk hierbij aan beschikbaarheid van de boeken, dvd's of bijvoorbeeld de openingstijden. Hiermee hebben we de opdracht gekregen om een prototype te bouwen waarin we de bezoeker een hand kunnen helpen bij het zoeken van zijn/haar product.

De opdracht van het project is: **een prototype bouwen dat bezoekers kan helpen om items uit de OBA collectie te vinden.**

Ik had hierbij meteen het idee om het de gebruiker zo makkelijk mogelijk te maken door middel van de dichstbijzijnde bibliotheek direct toe te wijzen. 
Hoe ik dit waar heb gemaakt kunt u lezen in het volgende hoofdstuk

<a name="2"></a>

## Hoofdstuk 2 | Het product

### 2.1 - Gebruikte technieken
De website bevat op dit moment:
- Een [NodeJS](https://nodejs.org/en/) server-side webpagina
- Connectie met de [OBA-API](https://www.oba.nl/nieuws/hva-studenten-bouwen-zoekmachine-voor-de-oba.html)
- Een [MapBox](https://www.mapbox.com/) kaart
- Routering d.m.v. [routie](http://projects.jga.me/routie/) (libary)
  
### 2.2  - Workflow
_Om het product het beste uit te leggen heb ik hieronder de workflow beschreven (+screenshots)_

**Stap 1: Hoofdpagina**

De klant bezoekt helpikhebsneleenboeknodig.nl

<img src="https://i.ibb.co/23SBssm/image.png">

**Stap 2: Zoekopdracht**

De klant typt de naam/auteur van het boek in en de zoekopdracht worden netjes weergegeven.


<img src="https://i.ibb.co/PDYjvBb/image.png">

<img src="https://i.ibb.co/khvB319/image.png">

**Stap 3: Waar ligt het boek?** 

De klant drukt op het gewenste boek en krijgt meteen te zien waar het boek, het dichste bij, beschikbaar is (op een kaart).

<img src="https://i.ibb.co/ZHmMhmC/image.png">

Ook heeft de klant de optie om elke gewenste bibliotheek in google maps te openen

<img src="https://i.ibb.co/MNHyYdh/image.png">



## Hoofdstuk 3 | Waarom nu wel voldoende?
Omdat dit de herkansing is, is het belangrijk te benoemen waarom ik vind dat het nu wel een voldoende waard is:

- Omdat ik tijdens de projectweek ziek was, heb ik toen (bijna) niks kunnen maken. Dit heb ik nu afgemaakt.
- De doel van het project (prototype bouwen waarin we de bezoeker een hand kunnen helpen met het zoeken van zijn/haar product) is belaald, en ik heb hierbij technieken van WAFS en CSS gebruikt (en zelfs nog extra). 
- Het is mogelijk om boeken te zoeken (dus connectie met de OBA API)
- Er wordt gebruik gemaakt van een mapbox om de bibliotheek locaties weer te geven.
- Routering d.m.v. routie (WAFS)
- De gebruiker ontvangt feedback (loader)
- Pagina ziet er netjes uit (CSS TO THE RESCUE)
- extra: server-side rendering  