##### 移动端开发的时候，在iphone下的input，上边框有一块阴影，导致与设计稿不统一
``` css
outline: none;
-webkit-appearance: none; /*去除系统默认的样式*/
-webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 点击高亮的颜色*/
```