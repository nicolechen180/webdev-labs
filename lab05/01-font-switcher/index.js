let currentFont = 1.4;

const makeBigger = (ev) => {
   // make the font bigger
   currentFont += 0.2;
   // set the font to be that way on the page
   setFont();
   // alert('make bigger!');
};

const makeSmaller = (ev) => {
   // make the font smaller
   currentFont -= 0.2;
   // set the font to be that way on the page 
   setFont();
   // alert('make smaller!');
};

const setFont = () => {
   document.querySelector('.content').style.fontSize = `${currentFont}em`;
   document.quarySelector('h1').style.fontSize = `${currentFont + 0.5}em`;
}

document.querySelector('#a1').addEventListener('click', makeBigger);
document.querySelector('#a2').addEventListener('click', makeSmaller);

