/**
 * Created by cojok on 10/04/17.
 */

import LazyLoading from './lazyLoading';

let lazy = new LazyLoading();

window.addEventListener("resize", lazy.responsiveImg, false);
window.addEventListener("scroll", lazy.responsiveImg, false);
window.addEventListener("DOMContentLoaded", function () {
    lazy.responsiveImg();
}, false);

