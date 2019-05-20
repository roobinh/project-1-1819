# Project 2 @cmda-minor-web · 2018-2019

_Voor het tweede project van de minor Web Development gaan we het bedrijf [ValTech](https://www.valtech.com) een handje helpen. Zij beheren namelijk de website van [Volkswagen](www.volkswagen.com), die ze jaren geleden hebben gemaakt. In de tussentijd is er niks tot weinig veranderd aan de website. Aan ons de taak om de volkswagen website te onderzoeken, op zoek naar verbeteringen in de performance en accessability._

## Table of Content
1. [Opdracht](#1)
2. [Onderzoek](#2)
    - 2.1 Performance
    - 2.2 Accessability
    - 2.3 Best Practices
    - 2.4 SEO
3. [Top 5 oplossingen (+ POC)](#3)
    - 3.1 Server-Side rendering
    - 3.2 Externe Javascript Verminderen
    - 3.3 Afbeeldingen
    - 3.4 Fonts
    - 3.5 Kleurencontrast
4. [Conclusie](#4)

<a name="1"></a>

## Hoofdstuk 1 |  Opdracht
De opdracht is individueel en duurt een werkweek. Aan het eind van de week (vrijdag) presenteren we ons eindverslag. Hierin moet een 'top 5 oplossingen' staan met daarbij een POC (Prove Of Concept). Hierin laten we zien wat de daadwerkelijke impact van de oplossingen is, en waarom deze van belang is.

<a name="2"></a>

## Hoofdstuk 2 | Onderzoek
De eerste stap in het zoeken naar improvements van performance en accessability op de [Volkswagen](www.volkswagen.com) site is een onderzoek. 

Om dit te testen heb ik de gebruik gemaakt van de Chrome Dev tools (`Audits` tab). Dit heb ik gedaan in incognitomodus voor de meest accurate testresultaten, omdat er in incocnitomodus geen extensies/cache gebruikt worden. 

De testresultaten hiervan zijn hieronder te zien:

<img src="https://i.ibb.co/9GWkZL7/image.png">

### 2.1 Performance (61%)

<img src="https://i.ibb.co/y5zWmkq/image.png">

Op performance scoort de website `61/100`. Dit komt grotendeels omdat de website veel gebruik maakt van afbeeldingen. Afbeeldingen kosten veel meer tijd om te laden dan text, en het is daarom belangrijk dat afbeeldingen op de goede manier ingeladen worden. 

Een oplossing voor het probleem van lange laadtijd voor afbeeldingen is het gebruik van next-gen image formats, zoals 'WebP' of 'JPEG 2000'. Deze afbeeldingen maken gebruik van veel betere compressie, waardoor de filesize daalt en, je deze sneller kan downloaden en minder datagebruik hebt. Mogelijke winst:

<img src="https://i.ibb.co/bX8rFPW/image.png">

Naast afbeeldingen zijn er nog meer punten van verbetering, zoals het inladen van een standaard font voor het laden van de webfont. Dit zorgt ervoor dat text wel zichtbaar is tijdens het laden van de custom font.


### 2.2 Accessibility (81%)

Naast performance is het belangrijk dat de website accessible is. Dit betekend dat de webstie voor zo veel mogelijk mensen te gebruiken is. Denk hierbij aan gebruikers met slechtziendheid of mensen met kleurenblindheid. Omdat volkswagen een automerk is, is de kans dat blinde gebruikers de site bezoeken nihil. Op accessibility scoort de website op dit moment `81/100`.

Kleurencontrast - Volgens de Google Audits tab is het kleurencontrast nog niet perfect. Denk hierbij aan 'lichtblauw op wit' of 'witte text op lichte afbeeldingen'. Zie voorbeelden daarvan hieronder:

<img src="https://i.ibb.co/wyNQBZ6/image.png" width="300">
<img src="https://i.ibb.co/QrjLS5V/image.png" width="300">

_Ook heb ik de accessability nog getest door middel van de Google Chrome extencie aXe. Testresultaten hiervan zijn, met de oplossingen, te lezen in hoofdstuk 3.3._

### 2.3 Best Practices (57%)

Op het gebied van Best Practices zijn er meerdere verbeterpunten, de site scoort daarom ook maar `57/100`:

<img src="https://i.ibb.co/ryJb978/image.png">

HTTP - Voor een groot deel van de website wordt op dit moment gebruik gemaakt van het HTTP/1 protocol. Een nieuwere versie van dit protocol is HTTP/2. HTTP/2 biedt vele voordelen ten opzichte van HTTP/1, zoals een snellere laadtijd, pipelining, extra headers & multiplexing.

document.write() - Op dit moment wordt er gebruik gemaakt van de document.write functie in javascript. Voor gebruikers met een langzame computer/verbinding kan dit ervoor zorgen dat het laden van de pagina veel langer duurt. Een oplossing voor dit probleem kan server side rendering zijn. Hierbij wordt de pagiana vanaf de server geredendered, in plaats van vanaf de client. Dit heeft naast snelle laadtijd nog meer voordelen.

### 2.4 SEO (100%)

SEO checkt of de website hoog in de Search Engine Rankings staat. Dit is belangrijk voor een website als die van volkswagen, omdat hun product(en) zo veel mogelijk bekeken moet worden. Dit is alleen niet relevant voor de performance en accessability.

<a name="3"></a>

## Hoofdstuk 3 | Top 5 oplossingen (+ POC)

In dit hoofdstuk ga ik de volgende oplossingen bespreken:
- 3.1 Server-Side Rendering
- 3.2 Externe Javascript
- 3.3 Afbeeldingen
- 3.4 Fonts
- 3.5 Kleurencontrast

### 3.1 - Server-Side Rendering
_Let op: in dit hoofdstuk heb ik het over de nodige javascript (dus niet externe javascript)_

Momenteel wordt bij de site veel Javascript ingeladen om onder andere afbeeldingen in te laden. Dit zorgt er onder andere voor dat de website geen afbeeldingen weergeeft als je Javascript uit hebt staan. 

<img src="https://i.ibb.co/PDb4gqq/image.png" heigth="150">

Ook kost het downloaden van alle Javascript extreem veel tijd en kost het ook nog veel tijd om de Javascript uit te voeren. Om dit te voorkomen kan je ervoor kiezen de website Server-Side te renderen. Dit zorgt ervoor dat het inladen in de DOM wordt gedaan vanaf de server, en dan naar de client wordt gestuurd. Dit scheelt veel tijd en maakt het mogelijk de website te runnen zonder Javascript. Ook geeft een server-side website, naast tal andere voordelen, ook de mogelijkheid om de afbeeldingen te compressen naar een formaat zoals WebP (zie paragraaf 3.3).  


### 3.2 - Externe JavaScript
Bij het laden van de volkswagen site worden er veel externe javascript bestanden ingeladen.

<img src="https://i.ibb.co/PDb4gqq/image.png" heigth="300">

Het laden en uitvoeren van deze JavaScript kost extreem veel tijd, vooral voor gebruikers met een langzame verbinding/computer. Het is daarom belangrijk dat er wordt uitgezocht welke van deze Javascript wel en niet noodzakelijk is voor het gebruiken van de website. Omdat ik hier geen kennis over heb, kan ik hier ook geen aanbevelingen over doen. Wel is het een van mijn onderzoeksresultaten waar naar gekeken moet worden. Bij halvering van externe javascript wordt er al 200KB bespaard, naast de runtime die je ermee bespaard.

### 3.3 - Afbeeldingen
Op de volkswagen site wordt veel gebruik gemaakt van afbeeldingen. 

<img src="https://i.ibb.co/1qCXHY3/image.png" heigth="300">

_Mogelijke winst = ongeveer 900KB. `Op langzaam 3G (150KBps) scheelt dit al snel 900/150 = 6 seconden!`_

Omdat afbeeldingen heel veel tijd kosten om te laden, is het zeeeeer belangrijk dat de afbeeldingen als zo klein mogelijk bestand verstuurd worden. Momenteel wordt voor de afbeeldingen geen compressie gebruikt, dit zorgt ervoor dat de website een stuk langer moet laden dan als de afbeeldingen compressed zijn. Een voorbeeld van compressed formaat is .webp. Dit is een vrij nieuw formaat en dus [nog niet gesupport voor alle browsers](https://caniuse.com/#search=webp). Wel wordt het gesupport door browsers als Google Chrome, Opera, Firefox en Edge. Daarom kan er een hoop tijd gewonnen worden met het compressen van afbeeldingen. Een voorbeeld hiervan is op mijn site te zien:

_Zie site: De afbeeldingen zijn momenteel op dezelfde grootte als gebruikt op de site. De linker afbeelding is een jpg bestand, de rechter afbeelding is een webp bestand. Het verschil in bestandsgrootte is 420kb (oud) / 107kb (nieuw) * 100 = 392% kleiner!_

Bij het corpressen van afbeeldingen is wel een probleem: de server moet van te voren weten of de client webp ondersteunt. Ondersteunt de client namelijk geen webp, moeten de afbeeldingen niet gecompressed worden! Helaas is het met het huidige Http/1 niet mogelijk om vanaf de client naar de server in de header mee te geven of webp ondersteunt wordt. Daarom is het van groot belang, naast tal van andere redenen, dat de website wordt omgezet naar HTTP/2.

Een andere oplossing voor het gebruik van afbeeldingen maar korte laadtijd is het gebruik van [Lazy Loading](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/). Dit zorgt ervoor dat alle belangrijke elementen (zoals text) eerst worden geladen, en daarna pas alle afbeeldingen/videos/onbelangrijke elementen. Dit zorgt ervoor dat de site veel eerder functioneel is.

### 3.4 - Fonts
Bij het laden van de hoofdpagina worden veel bestanden ingeladen. Als je deze bestanden sorteert op grootte, staan de fonts bijna bovenaan.

<img src="https://i.ibb.co/dWxHRHr/image.png">

Samen maar liefst bijna 400KB, van de totale 3MB die wordt gedownload. Op mijn Live Demo is het verschil tussen `VWHeadFont` & `VWTextFont` te zien, namelijk bijna niks. Door alle fonts op de site te veranderen naar `VWTextFont` en `VWHeadFont` te schrappen bespaar je al 200KB van de totale 3MB (1/15e van totale downloadtijd).

### 3.5 - Kleurencontrast
Voor het testen van de accessability heb ik de Chrome Extensie [aXe](https://www.deque.com/axe/) gebruikt. 

<img src="https://i.ibb.co/998V1Zy/image.png" heigth="300">

Na het runnen van de audit blijkt het dat er 13 elementen op de pagina niet voldoen aan het juiste kleurencontrast (juist = [WCAG 2 AA contrast ratio thresholds](https://webaim.org/resources/contrastchecker/)). Dit komt vooral door de lichtblauwe kleur die op de site vaker gebruikt wordt:

<img src="https://i.ibb.co/k4qDYYr/image.png" heigth="300">

Deze lichtblauwe kleur op wit voldoet niet aan het WCAG 2AA contrast ratio threshhold. Een hele makkalijke oplossing hiervoor is het veranderen van lichtblauw naar een donkerdere variant, zoals die in het volkswagen logo:

<img src="https://i.ibb.co/XxX5F9M/image.png" heigth="200">

Deze aanpassing is extreem simpel om toe te passen, en zorgt ervoor dat de site voor iedereen (slechtziend, doof & geen beperkingen) te gebruiken is.

<a name="4"></a>

## Hoofdstuk 4 | Conclusie

Pas je alle technieken/oplossingen genoemd in dit document bespaar je:

| Aanpassing | Invloed  |   |
|--------------------|--------|---|
| Afbeeldingen       | 900KB  | (bij compressie)  |
| Fonts              | 200KB  |   |
| Externe Javascript | 200KB | (bij halvering)  |


Totaal = 1300KB (=29% van totale site)

Hierbij heb ik de execution tijd die je bespaard met lazy loading en server side rendering nog niet eens genoemd.


Bedankt voor het lezen 😄.

