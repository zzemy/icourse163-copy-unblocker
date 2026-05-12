# 🔓 解除网页限制（MOOC专用）

这是一个专为 **MOOC (icourse163.org)** 编写的 Tampermonkey / Greasemonkey 油猴脚本。旨在解决学习过程中无法使用右键、无法划选文字、无法使用快捷键复制的问题。

## 核心功能

-  **解除右键限制**：屏蔽网页自带的拦截代码，恢复浏览器默认右键菜单。
-  **恢复文本选中**：移除 `user-select: none` 等 CSS 限制，鼠标可正常划选文字。
-  **解锁快捷键复制**：保护 `Ctrl+C`、`Ctrl+A` 等快捷键不被网站强制拦截。
-  **纯净白名单**：仅在 `icourse163.org` 域名下运行，零负担，绝对不影响其他网站（如腾讯文档、B站等）的正常快捷键使用。

## 安装与使用

1. 首先确保你的浏览器已经安装了 [Tampermonkey](https://www.tampermonkey.net/) 插件。
2. 点击本仓库中的 `icourse163-unblocker.user.js` 文件。
3. 点击右上角的 **`Raw`** 按钮，油猴插件将会自动弹出安装提示。
4. 点击“安装”，刷新中国大学MOOC网页即可生效。

## 技术实现

*   使用 `addEventListener` 的 `capture: true` (捕获阶段) 提前拦截 `contextmenu`, `copy`, `selectstart` 等事件的冒泡。
*   拦截 `keydown` 和 `keyup` 事件以保护 `Ctrl+C` 按键不被劫持。
*   强行注入全局 CSS，覆盖原网站隐藏文本选中的样式。
*   清理 `document.body` 上绑定的内联限制事件。

## 免责声明

本脚本仅供个人学习、做笔记及前端技术交流使用。请尊重原作者的知识产权，切勿将复制的课程内容用于任何商业盈利或非法传播。
