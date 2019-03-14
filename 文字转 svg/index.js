const TextToSVG = require('text-to-svg')
const fs = require('fs')
const path = require('path')

const textToSVG = TextToSVG.loadSync();
const options = {x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: {fill: 'red', stroke: 'black'}};
const svg = textToSVG.getSVG('李金珂', options);


fs.writeFileSync(path.join(__dirname,'test.svg'),svg)
