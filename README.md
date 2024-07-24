# README file per l'app Pokémon

## Introduzione al progetto 

Il progetto realizzato consiste in un'applicazione che guida l'utente, attraverso l'approccio dei wizard, nella creazione di una squadra di Pokémon. 

## Stack tecnologico utilizzato

1 - React, 
2 - react-step-wizard,
3 - Material-UI,
4 - Javascript,
5 - HTML / CSS,
6 - React Hooks,
7 - Node.js & npm (Node Package Manager),
8 - Axios,
9 - API Pokémon


## Struttura del progetto
La struttura presenta 3 step principali che guidano l'utente attraverso tutto il processo:

Step 1 - Inserimento dei dati dell'utente relativi al Trainer name, Team name e tipo di pokemon preferito.

Step 2 - Composizione del team dell'utente con selezione di un numero di pokemon compreso tra 1 e 7.

Step 3 -  Generazione casuale del team avversario composto da 4 pokemon che non rientrano tra quelli scelti dall'utente allo step precedente.

L'ultimo step rappresenta un riepilogo di tutte le scelte effettuate dall'utente e presenta la possibilità di confermarle o modificarle.  

Per gestire la navigazione tra i diversi step del wizard è stato utilizzato il pacchetto 'react-step-wizard' in modo da semplificare l'intero processo attraverso un'interfaccia user-friendly che consente all'utente di spostarsi tra i vari step attraverso i pulsanti implementati riducendo così al minimo la probabilità di errori.

Per la gestione del layout e dello stile dell'applicazione ho deciso di utilizzare la libreria Material-UI (MUI) che fornisce una serie di componenti stilizzati e pronti all'uso, oltre a fornire
anche la possibilità di personalizzazione di questi componenti attraverso il sistema di theming applicato per la rappresentazione della barra di navigazione presente nel sommario conclusivo.


----------------------------------------------------------------------------------

## Prerequisiti
-Node.js 
-npm

## Procedimento di avvio
1 - Dopo aver clonato la repository da git attraverso il comando git clone url_repository, 
spostarsi nella directory del progetto appena clonata tramite il comando cd nome_directory

2 - Installare le varie dipendenze necessarie per il corretto avvio dell'applicazione attraverso il comando npm install che andrà ad installare tutte le librerie e pacchetti necessari 
(react-step-wizard, @mui/material, @emotion/react, @emotion/styled, Axios)

3 - Avviare l'applicazione attraverso il comando npm start che procederà all'apertura sul browser predefinito dal sistema in utilizzo. 




