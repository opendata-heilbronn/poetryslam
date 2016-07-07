# poetryslam

## Wording für Projekt

* Wizard - Zur Installation - Ein Setup-Prozess - Fragt Dinge wie Farben, Hintergrund, etc ab
* Admin - Dinge die vor derm Event erledigt werden
* Regie - Dinge die während des Events erledigt werden



## Über

Für den [BWSLAM 2016](http://www.bwslam16.de/) in Heilbronn hat die Initiative [Code for Heilbronn](http://codefor.de/heilbronn) für das [Popbüro Heilbronn](http://www.skjr-hn.de/index.php/popbuero) diese Präsentationssoftware ehrenamtlich entwickelt.
Die Webanwendung ermöglicht, Teilnehmer, Wettbewerbe, Gruppen und Wertungen zu verwalten und während der Veranstaltung auf einem Beamer zu präsentieren.
Das Hosting erfolgt über [GitHub Pages](https://pages.github.com).

### Funktionsweise

Die Webanwendung wird in zwei Browser-Fenstern parallel geöffnet. Ein Browser-Fenster dient zur Steuerung, das andere zur Präsentation.
Einmal aufgerufen kann die Webanwendung auch offline verwendet werden.

* [Admin-Oberfläche](http://poetryslam.opendatalab.de/admin.html#/)
* [Präsentation](http://poetryslam.opendatalab.de/index.html)

Steuerung der Präsentation:

![Steuerung der Präsentation](/doc/screenshot-admin.png)

Admin-Oberfläche:

![Admin-Oberfläche](/doc/screenshot-about.png)

Präsentation:

![Präsentation](/doc/screenshot-presentation.png)

## Dev-Setup

Required software:

* NodeJS

Install Dependencies:


    npm install
    npm install -g bower
    bower install

Start a local http server, e.g.:
    
   
    npm install -g http-server
    http-server


## ToDos

@ [Trello](https://trello.com/b/N1q5HtOf/bw-slam)
