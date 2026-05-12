// ==UserScript==
// @name         解除网页限制（中国大学MOOC专用 + 快捷键保护）
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  仅在 icourse163.org 运行，强制解除右键、复制、选择限制，破除 CSS 限制，并保护 Ctrl+C 快捷键不被网站拦截。
// @author       Your Name
// @match        *://www.icourse163.org/*
// @match        *://*.icourse163.org/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. 解锁基础 JavaScript 事件（鼠标右键、浏览器复制/选择等）
    const lockedEvents = [
        "contextmenu",
        "copy",
        "cut",
        "paste",
        "selectstart",
        "dragstart"
    ];

    const unlockHandler = (e) => {
        e.stopPropagation();           // 阻止事件冒泡
        e.stopImmediatePropagation();  // 抢夺控制权，阻止网站自身的禁用脚本运行
    };

    lockedEvents.forEach(eventName => {
        document.addEventListener(eventName, unlockHandler, { capture: true });
    });

    // 2. 保护键盘快捷键 (Ctrl+C, Ctrl+A, Ctrl+X 等)
    const keyHandler = (e) => {
        // 判断是否按下了 Ctrl 键 (Windows) 或 Command 键 (Mac)
        if (e.ctrlKey || e.metaKey) {
            // 获取按下的键（统一转为小写处理）
            const key = e.key ? e.key.toLowerCase() : String.fromCharCode(e.keyCode).toLowerCase();
            
            // 保护常用的复制、全选、剪切、粘贴快捷键
            if (['c', 'a', 'x', 'v', 'p'].includes(key)) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                // 注意：绝对不能写 e.preventDefault()，否则浏览器原生的复制功能也被干掉了
            }
        }
    };

    // 在捕获阶段拦截键盘按下和抬起事件
    document.addEventListener('keydown', keyHandler, { capture: true });
    document.addEventListener('keyup', keyHandler, { capture: true });

    // 3. 清除 HTML 标签自带的内联限制事件
    const clearInlineEvents = () => {
        const elements = [document, document.body];
        elements.forEach(el => {
            if (el) {
                el.oncontextmenu = null;
                el.onselectstart = null;
                el.ondragstart = null;
                el.oncopy = null;
                el.onkeydown = null; // 清理可能写死在标签上的按键拦截
            }
        });
    };

    // 4. 破除 CSS 样式限制（恢复鼠标划选）
    const enableCssSelect = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                -webkit-user-select: auto !important;
                -moz-user-select: auto !important;
                -ms-user-select: auto !important;
                user-select: auto !important;
            }
        `;
        if (document.head) {
            document.head.appendChild(style);
        } else {
            document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style));
        }
    };

    // DOM 加载完成后执行清理和 CSS 注入
    window.addEventListener('DOMContentLoaded', () => {
        clearInlineEvents();
        enableCssSelect();
    });

    // 针对头部一开始就存在 head 的情况直接执行
    if(document.head) enableCssSelect();

})();
