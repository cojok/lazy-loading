/**
 * Created by cojok on 10/04/17.
 */
//
// class LazyLoading {
//
//     constructor() {
//         this.bgHolder  = document.querySelectorAll('.responsive-bg');
//         this.imgHolder = document.querySelectorAll('.responsive-img');
//         this.timer = null;
//
//     }
//
//     responsiveBackground() {
//         let parent   = this,
//             i        = 0,
//             bgImgSrc = null,
//             evtCount = 0;
//         for (i; i < parent.bgHolder.length; i++) {
//             let holder  = parent.bgHolder[i],
//                 bgImg   = holder.querySelectorAll('span'),
//                 matches = [],
//                 y       = 0;
//             for (y; y < bgImg.length; y++) {
//                 let w            = bgImg[y],
//                     bgImgDataSrc = w.getAttribute('data-src'),
//                     bgImgMedia   = w.getAttribute('data-media');
//                 if (bgImgDataSrc && ((window.matchMedia && window.matchMedia(bgImgMedia).matches))) {
//                     matches.push(bgImgDataSrc);
//                 }
//             }
//
//             if (matches.length > 0) {
//                 bgImgSrc = matches.pop();
//             }
//
//             console.log(parent.inView(holder));
//
//             if (parent.inView(holder)) {
//                 if (bgImgSrc !== holder.style.backgroundImage.replace('url("', '').replace('")', '')) {
//                     parent.preloadImage(bgImgSrc, holder, 'bg');
//                     evtCount++;
//                 }
//             }
//         }
//
//         console.log(evtCount);
//
//         if (!parent.bgHolder.length || evtCount == parent.bgHolder.length) {
//             parent.destroy();
//         }
//     }
//
//     responsiveImg() {
//         let parent   = this,
//             i        = 0,
//             imgSrc   = null,
//             evtCount = 0;
//
//         for (i; i < parent.imgHolder.length; i++) {
//             let holder  = parent.imgHolder[i],
//                 imgData = JSON.parse(holder.getAttribute('data-img')),
//                 matches = [],
//                 y       = 0;
//             for (y; y < Object.keys(imgData).length; y++) {
//                 let w            = imgData[y],
//                     imgDataSrc   = w.src,
//                     imgDataMedia = w.media;
//
//                 if (imgDataSrc && ((window.matchMedia && window.matchMedia(imgDataMedia).matches))) {
//                     matches.push(imgDataSrc);
//                 }
//             }
//
//             if (matches.length) {
//                 imgSrc = matches.pop();
//             }
//
//             if (parent.inView(holder)) {
//                 if (imgSrc !== holder.src) {
//                     parent.preloadImage(imgSrc, holder, 'img');
//                     evtCount++;
//                 }
//             }
//         }
//
//         if (!parent.imgHolder.length || evtCount == parent.imgHolder.length) {
//             parent.destroy();
//         }
//     }
//
//     preloadImage(source, element, type) {
//         let parent = this;
//         if (source == '' || source == null) {
//             return false;
//         }
//         let imgsrc    = new Image();
//         imgsrc.src    = source;
//         imgsrc.elm    = element;
//         imgsrc.onload = function () {
//             if (type === 'bg') {
//                 this.elm.style.backgroundImage = "url('" + source + "')";
//             }
//             else {
//                 this.elm.src = source;
//             }
//         };
//     }
//
//     inView(element) {
//
//         let top          = element.offsetTop,
//             bottom       = parseFloat(element.offsetTop) + parseFloat(element.offsetHeight),
//             windowBottom = (document.documentElement || document.body).scrollTop + window.innerHeight,
//             windowTop    = (document.documentElement || document.body).scrollTop;
//             console.log(windowTop);
//         //return ((top >= windowTop) && (bottom <= windowBottom));
//         //  var elemTop    = element.getBoundingClientRect().top;
//         // var elemBottom = element.getBoundingClientRect().bottom;
//         //
//         //  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
//         //  return isVisible;
//
//         var viewport = element.getBoundingClientRect();
//         return (viewport.top >=0 && viewport.left >=0 && viewport.right < window.innerWidth && viewport.bottom < window.innerHeight);
//     }
//
//     // preInit() {
//     //     this.timer = setTimeout(() => {
//     //         this.responsiveImg();
//     //     },1000);
//     // }
//
//     init() {
//         let parent = this;
//         window.addEventListener("resize", parent.responsiveImg, false);
//         window.addEventListener("scroll", parent.responsiveImg, false);
//         window.addEventListener("DOMContentLoaded", function () {
//             parent.responsiveImg();
//         }, false);
//     }
//
//     destroy() {
//         let parent = this;
//         window.removeEventListener('scroll', parent.responsiveImg, false);
//         clearTimeout(this.timer);
//     }
// }
//
// export default LazyLoading;

// (function (root) {
//     'use strict';
//     var delay, timer, eventCount = 0;
//     root.lazy                    = {
//         init         : function (options) {
//             delay = options.delay || 0;
//             if (document.addEventListener) {
//                 root.addEventListener('scroll', lazy.engine, false);
//                 root.addEventListener('load', lazy.engine, false);
//             } else {
//                 root.attachEvent('onscroll', lazy.engine);
//                 root.attachEvent('onload', lazy.engine);
//             }
//
//         },
//         engine       : function () {
//             timer = setTimeout(function () {
//                 lazy.loadImage();
//             }, delay);
//         },
//         loadImage    : function () {
//             var elements = document.querySelectorAll('.responsive-img'),
//                 imgSrc   = null;
//             for (var i = 0; i < elements.length; i++) {
//                 var holder  = elements[i],
//                     imgData = JSON.parse(holder.getAttribute('data-img')),
//                     matches = [],
//                     y       = 0;
//                 for (y; y < Object.keys(imgData).length; y++) {
//                     let w            = imgData[y],
//                         imgDataSrc   = w.src,
//                         imgDataMedia = w.media;
//
//                     if (imgDataSrc && ((window.matchMedia && window.matchMedia(imgDataMedia).matches))) {
//                         matches.push(imgDataSrc);
//                     }
//                 }
//
//                 if (matches.length) {
//                     imgSrc = matches.pop();
//                 }
//
//                 if (lazy.isVisible(elements[i])) {
//                     if (imgSrc !== elements[i].getAttribute("src")) {
//                         lazy.preloadImage(imgSrc, elements[i], 'img')
//                         eventCount++;
//                     }
//                 }
//             }
//
//             if (!elements.length || eventCount == elements.length) {
//                 lazy.releaseEvents();
//             }
//         },
//         isVisible    : function (elem) {
//             var viewport = elem.getBoundingClientRect();
//             return (viewport.top >= 0 && viewport.left >= 0 && viewport.right < window.innerWidth && viewport.bottom < window.innerHeight);
//         },
//         preloadImage:function (source, element, type) {
//             let parent = this;
//             if (source == '' || source == null) {
//                 return false;
//             }
//             let imgsrc    = new Image();
//             imgsrc.src    = source;
//             imgsrc.elm    = element;
//             imgsrc.onload = function () {
//                 if (type === 'bg') {
//                     this.elm.style.backgroundImage = "url('" + source + "')";
//                 }
//                 else {
//                     this.elm.src = source;
//                 }
//             };
//         },
//         releaseEvents: function () {
//             if (document.removeEventListener) {
//                 root.removeEventListener('scroll', lazy.engine);
//             } else {
//                 root.detachEvent('onscroll', lazy.engine);
//             }
//             clearTimeout(timer);
//         }
//     };
// })(this)

