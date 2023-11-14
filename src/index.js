import './less/index.less'

// Örnek bir event kullanımı aşağıdadır. Çalıştırmak için comment dışına alın
// document.querySelector("h1").addEventListener("click",function(e){
// alert("Bana tıkladın!")
// });


// Kodlar buraya gelecek!
//vars
const body = document.getElementsByTagName("body")[0];
const imageList = document.getElementsByTagName("img");
const header = body.children[0];
const headerAnchorList = header.getElementsByTagName("a");
const destButtonList = body.getElementsByClassName("btn");

//values
const minImgOpacity = 0.5;
const maxImgOpacity = 1;
const timeoutDuration = 1000;
const startingBGC = [255,255,255];
const targetBGC = [0,255,0];

//variables
let totalDY = 0;
let colorChangeRatio = 0;
let colorArr = [0,0,0];

//init conditions
for(let i = 0; i < imageList.length; i++){
    imageList[i].style.opacity = minImgOpacity;
}

body.style.backgroundColor =  ArrayToRGBString(startingBGC);  

//events
for(let i = 0; i < destButtonList.length; i++){
    destButtonList[i].addEventListener("click", (e) => {
        body.style.opacity = minImgOpacity;
        setTimeout(() => {body.style.opacity = maxImgOpacity}, timeoutDuration)
    });
}


for(let i = 0; i < headerAnchorList.length; i++){
    headerAnchorList[i].addEventListener("mousedown", (e) => {
        e.stopPropagation();
        let letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        headerAnchorList[i].style.color = color;
    });
    headerAnchorList[i].addEventListener("mouseup", (e) => {
        e.stopPropagation();
        headerAnchorList[i].style.color = "black";
    });
}

document.addEventListener("keydown", (e) => {
    window.scrollTo(top);
});

for(let i = 0; i < imageList.length; i++){
    
    imageList[i].addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        imageList[i].style.opacity = maxImgOpacity;
    });
    imageList[i].addEventListener("mouseleave", (e) => {
        e.stopPropagation();
        imageList[i].style.opacity = minImgOpacity;
    });
}

window.addEventListener("scroll", (e) => {
    colorChangeRatio = InverseLerp(0, window.outerHeight, window.scrollY);
    colorArr = [Lerp(startingBGC[0], targetBGC[0], colorChangeRatio), Lerp(startingBGC[1], targetBGC[1], colorChangeRatio), Lerp(startingBGC[2], targetBGC[2], colorChangeRatio)];
    body.style.backgroundColor = ArrayToRGBString(colorArr);
    console.log(colorChangeRatio);
});


//extra functions
function InverseLerp(a, b, alpha){
    return a + alpha / (b - a);
}

function Lerp(a, b, alpha){
    return a + alpha * (b - a);
}

function ArrayToRGBString(arr){
    return "rgb("+arr[0]+","+arr[1]+","+arr[2]+")";
}