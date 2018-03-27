//ParticleJS
// particlesJS("particles-js", {
//     "particles": {
//         "number": { "value": 6, "density": { "enable": true, "value_area": 800 } },
//         "color": { "value": "#1b1e34" },
//         "shape": { "type": "polygon", "stroke": { "width": 0, "color": "#000" }, "polygon": { "nb_sides": 6 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } },
//         "opacity": { "value": 0.3, "random": true, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
//         "size": { "value": 160, "random": false, "anim": { "enable": true, "speed": 10, "size_min": 40, "sync": false } },
//         "line_linked": { "enable": false, "distance": 200, "color": "#ffffff", "opacity": 1, "width": 2 },
//         "move": { "enable": true, "speed": 8, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
//     },
//     "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "grab" }, "onclick": { "enable": false, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } },
//     "retina_detect": true
// });
// var count_particles, stats, update;
// stats = new Stats;
// stats.setMode(0);
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.left = '0px';
// stats.domElement.style.top = '0px';
// document.body.appendChild(stats.domElement);
// count_particles = document.querySelector('.js-count-particles');
// update = function() {
//     stats.begin();
//     stats.end();
//     if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; }
//     requestAnimationFrame(update);
// };
// requestAnimationFrame(update);;


//Type texting
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; color: #778492; font-family: 'Permanent+Marker', cursive; background-color: whitesmoke;}";
    document.body.appendChild(css);
};

jQuery(document).ready(function($) {

    /*======= Skillset *=======*/

    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {

            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);

        });

    });

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();


    /* jQuery RSS - https://github.com/sdepold/jquery-rss */

    $("#rss-feeds").rss(

        //Change this to your own rss feeds
        "http://feeds.feedburner.com/TechCrunch/startups",

        {
            // how many entries do you want?
            // default: 4
            // valid values: any integer
            limit: 3,

            // the effect, which is used to let the entries appear
            // default: 'show'
            // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
            effect: 'slideFastSynced',

            // outer template for the html transformation
            // default: "<ul>{entries}</ul>"
            // valid values: any string
            layoutTemplate: "<div class='item'>{entries}</div>",

            // inner template for each entry
            // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
            // valid values: any string
            entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'

        }
    );

    /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
    // GitHubCalendar("#github-graph", "darpanjbora");


    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "darpanjbora", selector: "#ghfeed" });


});