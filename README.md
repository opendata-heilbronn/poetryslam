# poetryslam

## Wording für Projekt

* Wizard - Zur Installation - Ein Setup-Prozess - Fragt Dinge wie Farben, Hintergrund, etc ab
* Admin - Dinge die vor derm Event erledigt werden
* Regie - Dinge die während des Events erledigt werden


## Über

Die Webanwendung ermöglicht, Teilnehmer, Wettbewerbe, Gruppen und Wertungen zu verwalten und während der Veranstaltung auf einem Beamer zu präsentieren.
Das Hosting erfolgt über [GitHub Pages](https://pages.github.com).

Für den [BWSLAM 2016](http://www.bwslam16.de/) in Heilbronn hat die Initiative [Code for Heilbronn](http://codefor.de/heilbronn) für das [Popbüro Heilbronn](http://www.skjr-hn.de/index.php/popbuero) diese Präsentationssoftware ehrenamtlich entwickelt.

Die Software wurde u.a. bereits bei folgenden Events eingesetzt:
* Landesmeisterschaft Heilbronn 2016 (BWSLAM)
* Meisterschaft Stuttgart 2016
* Meisterschaft Hannover 2017

### Funktionsweise

Die Webanwendung wird in zwei Browser-Fenstern parallel geöffnet. Ein Browser-Fenster dient zur Steuerung, das andere zur Präsentation.
Einmal aufgerufen kann die Webanwendung auch offline verwendet werden.

* [Admin-Oberfläche](http://poetryslam.opendatalab.de/admin.html#/)
* [Präsentation](http://poetryslam.opendatalab.de/index.html)

Steuerung der Präsentation:

![Steuerung der Präsentation](/doc/screenshot-admin-presentation.png)

Admin-Oberfläche:

![Admin-Oberfläche](/doc/screenshot-admin-videos.png)

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


# SlamwareApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Icon by <a href="https://www.flaticon.com/free-icons/microphone" title="microphone icons">Microphone icons created by Freepik - Flaticon</a>