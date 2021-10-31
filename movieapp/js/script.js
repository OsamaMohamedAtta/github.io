
let container = document.getElementById("cont")
let searchByWord = document.getElementById("byWord")
let searchPage = document.getElementById("searchPage")
let contSH = document.getElementById("contSH")
let NowPlaying = document.getElementById("NowPlaying")
let link = document.querySelectorAll(".link")
let Trending = document.getElementById("Trending")
let toggelSlide = document.getElementById("toggelSlide")
let navSlide = document.getElementById("navSlide")
let footerSlide = document.getElementById("footerSlide")
let ulSlide = document.getElementById("ulSlide")
let iconSlide = document.getElementById("iconSlide")
let allData = []
let cartona;
let cartonaSH;
$(document).ready(function(){
    $(" .lds-circle").fadeOut(1000,()=>{
        $(".load").fadeOut(1500)
        $("body").css("overflow","scroll")
    })
    async function now_playing() {
        let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0dRCdOgYGxV-APD9liUk8kU9D3QcsTnhMYHWGucNF1780djQ8QYnwhPR8"
        let response = await fetch(url);
        let data = await response.json();
        allData = data.results
        displayData(allData)
    }
   
    async function byword(q) {
        if (searchByWord.value != "") {
            let url = `https://api.themoviedb.org/3/search/movie?api_key=c7a2d60eee80735bbfdf95a69863740e&query=${q}`
            let response = await fetch(url);
            let data = await response.json();
            allData = data.results
            displayData(allData)
        }
    }
    function searchPg(term) {
        cartonaSH = ""
        let count = 0;
        for (let i = 0; i < allData.length; i++) {
            if(allData[i].media_type == "tv"){
                allData[i].title = allData[i].name
            }
            if (allData[i].title.toLowerCase().includes(term.toLowerCase()) && searchPage.value != "") {
                count++;
                if (allData[i].poster_path == null) {
                    cartonaSH += ` <div class="cont-info">
                <img src="img/default.jpg" alt="poster">
                <div class="layout">
                <h2>${allData[i].title}</h2>
                <p>${allData[i].overview}</p>
                <p>rate: ${allData[i].vote_average}</p>
                <p>${allData[i].release_date}</p>
            </div>
        </div>`
                }
                else {
                    cartonaSH += ` <div class="cont-info">
                <img src="https://image.tmdb.org/t/p/w500${allData[i].poster_path}" alt="poster">
                <div class="layout">
                <h2>${allData[i].title}</h2>
                <p>${allData[i].overview}</p>
                <p>rate: ${allData[i].vote_average}</p>
                <p>${allData[i].release_date}</p>
            </div>
        </div>`
                }
            }
        }
        if ((count + 1) % 3 == 0) {
            cartonaSH += `<div class="fix"><img src="../img/fix.jpg" alt="poster"></div>`
        }
        contSH.innerHTML = cartonaSH
    }
    async function popRat(q) {
        let url = `https://api.themoviedb.org/3/movie/${q}?api_key=c7a2d60eee80735bbfdf95a69863740e&language=en-US&page=1`
        let response = await fetch(url);
        let data = await response.json();
        allData = data.results
        displayData(allData)
    }
    async function trand() {
        let url = `https://api.themoviedb.org/3/trending/all/day?api_key=c7a2d60eee80735bbfdf95a69863740e`
        let response = await fetch(url);
        let data = await response.json();
        allData = data.results
        cartona = ""
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].poster_path == null) {
                if(allData[i].media_type == "tv"){
                    allData[i].title = allData[i].name
                }
                cartona += ` <div class="cont-info">
                <img src="img/default.jpg" alt="poster">
                <div class="layout">
                <h2>${allData[i].title}</h2>
                <p>${allData[i].overview}</p>
                <p>rate: ${allData[i].vote_average}</p>
                <p>${allData[i].release_date}</p>
            </div>
        </div>`
            }
            else {
                if(allData[i].media_type == "tv"){
                    allData[i].title = allData[i].name
                }
                cartona += ` <div class="cont-info">
                <img src="https://image.tmdb.org/t/p/w500${allData[i].poster_path}" alt="poster">
                <div class="layout">
                <h2>${allData[i].title}</h2>
                <p>${allData[i].overview}</p>
                <p>rate: ${allData[i].vote_average}</p>
                <p>${allData[i].release_date}</p>
            </div>
        </div>`
            }
        }
        if ((allData.length + 1) % 3 == 0) {
            cartona += `<div class="fix"><img src="../img/fix.jpg" alt="poster"></div>`
        }
        container.innerHTML = cartona
    }
    function displayData(allData){
        cartona = ""
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].poster_path == null) {
                cartona += ` <div class="cont-info">
                <img src="img/default.jpg" alt="poster">
                <div class="layout">
                <h2>${allData[i].title}</h2>
                <p>${allData[i].overview}</p>
                <p>rate: ${allData[i].vote_average}</p>
                <p>${allData[i].release_date}</p>
            </div>
        </div>`
            }
            else {
                cartona += ` <div class="cont-info">
                <img src="https://image.tmdb.org/t/p/w500${allData[i].poster_path}" alt="poster">
                <div class="layout">
                <h2>${allData[i].title}</h2>
                <p>${allData[i].overview}</p>
                <p>rate: ${allData[i].vote_average}</p>
                <p>${allData[i].release_date}</p>
            </div>
        </div>`
            }
        }
        if ((allData.length + 1) % 3 == 0) {
            cartona += `<div class="fix"><img src="../img/fix.jpg" alt="poster"></div>`
        }
        container.innerHTML = cartona
    }
    Trending.addEventListener("click", function () {
        trand()
    })
    NowPlaying.addEventListener("click", function () {
        now_playing()
    })
    for (let i = 0; i < link.length; i++) {
        link[i].addEventListener("click", function (e) {
            popRat(e.target.id)
        })
    }
    searchByWord.addEventListener("keyup", (q) => { byword(q.target.value) })
    searchPage.addEventListener("keyup", (t) => { searchPg(t.target.value) })
    if (searchByWord.value == "") {
        now_playing()
    }
    $(".hideTogg").click(() => {
        $(".hideTogg").css("display", "none")
        $("#togg").css("display", "block")
        $(".navbar").animate({ marginLeft: "0px" }, 500, function () {
            $(".now").css({ "transform": "translateY(0)", "transition": "0.4s ease-out", "opacity": "1" })
            $(".pop").css({ "transform": "translateY(0)", "transition": "0.4s ease-out", "opacity": "1", "transitionDelay": "0.2s" })
            $(".top").css({ "transform": "translateY(0)", "transition": "0.4s ease-out", "opacity": "1", "transitionDelay": "0.4s" })
            $(".tren").css({ "transform": "translateY(0)", "transition": "0.4s ease-out", "opacity": "1", "transitionDelay": "0.6s" })
            $(".up").css({ "transform": "translateY(0)", "transition": "0.4s ease-out", "opacity": "1", "transitionDelay": "0.8s" })
            $(".cont").css({ "transform": "translateY(0)", "transition": "0.4s ease-out", "opacity": "1", "transitionDelay": "1s" })
        })
    })
    $("#togg").click(() => {
        $("#togg").css("display", "none")
        $(".hideTogg").css("display", "block")
        $(".navbar").animate({ marginLeft: "-235px" }, 500, function () {
            $(".now").css({ "transform": "translateY(300%)", "opacity": "0" })
            $(".pop").css({ "transform": "translateY(300%)", "opacity": "0" })
            $(".top").css({ "transform": "translateY(250%)", "opacity": "0" })
            $(".tren").css({ "transform": "translateY(250%)", "opacity": "0" })
            $(".up").css({ "transform": "translateY(250%)", "opacity": "0" })
            $(".cont").css({ "transform": "translateY(250%)", "opacity": "0" })
        })
    })
})

// $("body").click((e) => {
//     if(e.target != toggelSlide && e.target.parentNode != toggelSlide && e.target != navSlide && e.target.parentNode != navSlide && e.target.parentNode != footerSlide && e.target.parentNode != ulSlide && e.target.parentNode != iconSlide){
//         $("#togg").css("display", "none")
//         $(".hideTogg").css("display", "block")
//         $(".navbar").animate({ marginLeft: "-235px" }, 700, function () {
//             $(".now").css({ "transform": "translateY(300%)", "opacity": "0" })
//             $(".pop").css({ "transform": "translateY(300%)", "opacity": "0" })
//             $(".top").css({ "transform": "translateY(250%)", "opacity": "0" })
//             $(".tren").css({ "transform": "translateY(250%)", "opacity": "0" })
//             $(".up").css({ "transform": "translateY(250%)", "opacity": "0" })
//             $(".cont").css({ "transform": "translateY(250%)", "opacity": "0" })
//         })
//     }    
// })
