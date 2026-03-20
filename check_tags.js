
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ADMIN\\Music\\bhcwebsite - Copy\\src\\components\\LandingPage\\LegaeLandingPage.tsx', 'utf8');

let divOpen = (content.match(/<div/g) || []).length;
let divClose = (content.match(/<\/div>/g) || []).length;

console.log(`Div Open: ${divOpen}`);
console.log(`Div Close: ${divClose}`);

// Also check sections and footers
let sectionOpen = (content.match(/<section/g) || []).length;
let sectionClose = (content.match(/<\/section>/g) || []).length;
console.log(`Section Open: ${sectionOpen}`);
console.log(`Section Close: ${sectionClose}`);

let footerOpen = (content.match(/<footer/g) || []).length;
let footerClose = (content.match(/<\/footer>/g) || []).length;
console.log(`Footer Open: ${footerOpen}`);
console.log(`Footer Close: ${footerClose}`);
