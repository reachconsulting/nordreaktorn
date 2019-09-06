# NördReaktorn
Tema för [Ghost](https://ghost.org) att använda för Reachs konferens NördReaktorn

## Installation

1a. Installera Ghost via Docker ;)
1b. Installera Ghost, via ghost-cli med kommandot ghost install local, och konfigurera upp installationen via webbgränssnittet på http://localhost:2386/ghost.
2. Dra ner det här repot i en katalog nordreaktorn under themes i din ghost-installation.
3. Installera Node dependancy med 'npm install'
4. Ladda upp content-filen som finns i data-katalogen i det här repot för att få innehållet som finns. Uppladdningsfunktionen finns under Labs.


## Development

1. cd ~/tema_mappen
2. starta utvecklingsmiljö med browser-sync med 'gulp'

## Deploy

1. cd ~/tema_mappen
2. Zipa filen för uppladdning till server: 'gulp zip'