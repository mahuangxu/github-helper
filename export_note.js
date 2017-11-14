// ==UserScript==
// @name         导出慕课网笔记
// @namespace    https://github.com/yeomanye
// @version      0.1
// @description  导出慕课网的笔记，分为点赞和采集两种
// @author       Ming Ye
// @match        http://www.imooc.com/*/*
// @require      https://greasyfork.org/scripts/34143-debug/code/debug.js?version=229638
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @require      http://libs.cdnjs.net/FileSaver.js/1.3.3/FileSaver.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var log = consoleFactory('导出笔记脚本:','log',null,true),
        warn = consoleFactory('导出笔记脚本:','warn',null,true);
    log(saveAs);
    var $btnContainer = $('#main .course-info-main .content-wrap .mod-tab-menu .course-menu');
    var $collectBtn = $('<li><a style="color:orange;cursor:pointer;">导出笔记</a></li>'),//采集按钮
        $praiseBtn = $('<li><a style="color:orange;cursor:pointer;">赞</a></li>'),//采集按钮
        courseId = window.location.pathname.split("/")[2], //课程ID
        pageNum = 1,//笔记页码
        $iframe = $("<iframe hidden></iframe>"),
        baseUrl = 'http://'+window.location.hostname+'/note/'+courseId+'?sort=hot&page=';
    log('课程ID',courseId);
    $iframe[0].onload = function(e){
        log(e,this);
        var $contDoc = $(this.contentDocument);
        var $collectI = $contDoc.find('#js-note-container .Jcollect i');
        var flag = false; //笔记成功加载并处理后，才处理下一页
        warn($collectI);
        var notes = JSON.parse(localStorage.getItem('notes'));
        for(var i=0,len=$collectI.length;i<len;i++){
            notes = notes || [];
            flag = true;
            if($collectI.eq(i).text()=='已采集'){
                var $content = $collectI.eq(i).parents('li.post-row'),
                    noteStr = $content.find('.js-notelist-content .autowrap')[0].innerText,
                    user = $content.find('.bd .tit')[0].innerText,
                    time = $content.find('.footer .timeago')[0].innerText.replace('时间：',''),
                    chapter = $content.find('.footer .from')[0].innerText.replace('源自：',''),
                    data = {
                        note:noteStr,
                        user:user,
                        time:time,
                        chapter:chapter
                    };
                warn('data',data);
                notes.push(data);
            }
        }
        var pageNum = parseInt(localStorage.getItem('pageNum'));
        pageNum = pageNum ? (pageNum + 1) : 2;
        warn(pageNum);
        if(flag && pageNum < 5){
            localStorage.setItem('notes',JSON.stringify(notes));
            localStorage.setItem('pageNum',pageNum);
            this.src = baseUrl + pageNum;
        }

    };
    $btnContainer.append($collectBtn);
    $('body').append($iframe);
    $iframe[0].src = baseUrl + pageNum;
})();