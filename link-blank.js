// ==UserScript==
// @name         Google、Github超链接从空白标签打开
// @namespace    https://github.com/yeomanye
// @version      0.3
// @description  点击超链接从新标签页打开，支持google、github
// @author       Ming Ye
// @match        https://www.google.com
// @match        https://github.com
// @include      https://github.com*
// @include      https://www.google*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var links = document.getElementsByTagName('a');
    for(var i=0,len=links.length;i<len;i++){
        links[i].setAttribute('target','_blank');
    }
})();