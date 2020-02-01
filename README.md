A simple jest reporter that will only indicate the status of a test and only show the first failing test. Perfect for keeping a focus on the failing test, especially if you only care about the status of the test.

## Example of the report:

```
 ✓  0.  Je hebt de juiste setup om de oefening te beginnen

 ✕  1.  Zorg ervoor dat een reel correct gespinned kan worden.
        Dit kan je bereiken door de reel.spin() functie een random value uit de ‘symbols’ array te laten returnen.
        Enkele voorbeelden welke waarde reel.spin() moet terug geven: 
        reel.spin() => ♣
        reel.spin() => ♥

  40% van alle oefeningen correct opgelost
```

## How to use:

```
npm install jest-step-by-step-report --save-dev
```

In your Jest config:

```
"jest": {
  "reporters": [
    "jest-step-by-step-report"
  ]
},
```