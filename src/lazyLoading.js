/**
 * Created by cojok on 10/04/17.
 */

class LazyLoading {

    constructor() {
        this.bgHolder  = document.querySelectorAll('.responsive-bg');
        this.imgHolder = document.querySelectorAll('.responsive-img');

    }

    responsiveBackground() {
        let parent   = this,
            i        = 0,
            bgImgSrc = null;
        for (i; i < parent.bgHolder.length; i++) {
            let holder  = parent.bgHolder[i],
                bgImg   = holder.querySelectorAll('span'),
                matches = [],
                y       = 0;
            for (y; y < bgImg.length; y++) {
                let w            = bgImg[y],
                    bgImgDataSrc = w.getAttribute('data-src'),
                    bgImgMedia   = w.getAttribute('data-media');
                if (bgImgDataSrc && ((window.matchMedia && window.matchMedia(bgImgMedia).matches))) {
                    matches.push(bgImgDataSrc);
                }
            }

            if (matches.length > 0) {
                bgImgSrc = matches.pop();
            }
            // if(parent.inView(holder)) {
            //     if(bgImgSrc !== holder.style.backgroundImage.replace('url("','').replace('")','')) {
            //         parent.preloadImage(bgImgSrc, holder, 'bg');
            //     }
            // }
        }
    }

    responsiveImg() {
        let parent = this,
            i      = 0,
            imgSrc = null;

        for (i; i < parent.imgHolder.length; i++) {
            let holder  = parent.imgHolder[i],
                imgData = JSON.parse(holder.getAttribute('data-img')),
                matches = [],
                y       = 0;
            for (y; y < Object.keys(imgData).length; y++) {
                let w            = imgData[y],
                    imgDataSrc   = w.src,
                    imgDataMedia = w.media;

                if (imgDataSrc && ((window.matchMedia && window.matchMedia(imgDataMedia).matches))) {
                    matches.push(imgDataSrc);
                }
            }

            if (matches.length) {
                imgSrc = matches.pop();
            }
            console.info(parent.inView(holder));
            // if(parent.inView(holder)) {
                if(imgSrc !== holder.src){
                    parent.preloadImage(imgSrc, holder, 'img');
                }
            // }
        }
    }

    preloadImage(source, element, type) {
        let parent = this;
        if (source == '' || source == null) {
            return false;
        }
        let imgsrc    = new Image();
        imgsrc.src    = source;
        imgsrc.elm    = element;
        imgsrc.onload = function () {
            if (type === 'bg') {
                this.elm.style.backgroundImage = "url('" + source + "')";
            }
            else {
                this.elm.src = source;
            }
        };
    }

    inView(element) {

        let top = element.offsetTop,
            bottom = parseFloat(element.offsetTop) + parseFloat(element.offsetHeight),
            windowBottom = (document.documentElement || document.body).scrollTop + window.innerHeight,
            windowTop = (document.documentElement || document.body).scrollTop;

        return (top >= windowTop && bottom <= windowBottom);
    }

    init() {
        //this.responsiveBackground();
        this.responsiveImg();
    }
}

export default LazyLoading;

//  var BgPolyfill = (function () {
//         function BgPolyfill() {
//             /**
//              * Object containing references to event listeners attached by offcanvas.
//              * We need those references to be albe to remove them if needed.
//  * @type {IConfiguratorEventListeners}
//  */
// this.eventListeners = {};
// this.$bgHolder = document.querySelectorAll('.responsive-bg');
// this.$imgTags = document.querySelectorAll('.homepage img');
// this.attachEventListeners();
// }
// BgPolyfill.prototype.bgPolyfill = function () {
//     var parent = this;
//     for (var i = 0; i < parent.$bgHolder.length; i++) {
//         var v = parent.$bgHolder[i];
//         var $bgImg = v.querySelectorAll('span');
//         var $bgImgMatches = [];
//         for (var y = 0; y < $bgImg.length; y++) {
//             var w = $bgImg[y];
//             var $bgImgSrc_1 = w.getAttribute('data-src');
//             var $bgImgMedia = w.getAttribute('data-media');
//             if ($bgImgSrc_1 && ((window.matchMedia && window.matchMedia($bgImgMedia).matches))) {
//                 $bgImgMatches.push($bgImgSrc_1);
//             }
//         }
//         var winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//         var $bgImgSrc = null;
//         if ($bgImgMatches.length) {
//             if (winWidth > 400) {
//                 $bgImgSrc = $bgImgMatches.pop();
//             }
//             else {
//                 $bgImgSrc = $bgImgMatches[0];
//             }
//         }
//         parent.preloadImage($bgImgSrc, v, 'bg');
//     }
// };
// BgPolyfill.prototype.loadVisibleImg = function () {
//     var parent = this;
//     var winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//     for (var i = 0; i < parent.$imgTags.length; i++) {
//         var value = parent.$imgTags[i];
//         if (winWidth < 768 && !(value.offsetWidth || value.offsetHeight || value.getClientRects().length)) {
//             return;
//         }
//         var $bgImgSrc = value.getAttribute('data-src');
//         parent.preloadImage($bgImgSrc, value, 'img');
//     }
// };
// BgPolyfill.prototype.preloadImage = function (source, element, type) {
//     if (source == '' || source == null) {
//         return false;
//     }
//     var imgsrc = new Image();
//     var type = type || 'bg';
//     imgsrc.src = source;
//     imgsrc.elm = element;
//     imgsrc.onload = function () {
//         if (type === 'bg') {
//             this.elm.style.backgroundImage = "url('" + source + "')";
//         }
//         else {
//             this.elm.src = source;
//         }
//     };
// };
// /**
//  * Attaches all needed event listeners for component behaviour.
//  */
// BgPolyfill.prototype.attachEventListeners = function () {
//     // Assign reference to allow better minification.
//     var eventListeners = this.eventListeners;
//     eventListeners.bgPolyfill = this.bgPolyfill.bind(this);
//     eventListeners.loadVisibleImg = this.loadVisibleImg.bind(this);
//     window.addEventListener("resize", window.bgPolyfill, false);
//     window.addEventListener("DOMContentLoaded", function () {
//         eventListeners.bgPolyfill();
//         eventListeners.loadVisibleImg();
//     }, false);
// };
// return BgPolyfill;
// }());
