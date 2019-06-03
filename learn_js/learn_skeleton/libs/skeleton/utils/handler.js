var SkeletonUtil = (function(exports) {
    const MOCK_TEXT_ID = 'skeleton-text-id';

    function getHtmlAndStyle() {
        const root = document.documentElement;
        const rawHtml = root.outerHTML;
        const bodyFontSize = document.body.style.fontSize || '';

        // 将骨骼图html和style从页面中移除，避免干扰
        const skeletonWrap = document.body.querySelector(
            '#nozomi-skeleton-html-style-container'
        );
        if (skeletonWrap) {
            document.body.removeChild(skeletonWrap);
        }

        // 文本块样式
        const skeletonTextBlockStyle =
            '.skeleton-text-block-mark{' +
            // 'display: block;' +
            'background-origin: content-box;' +
            'background-clip: content-box;' +
            'background-color: transparent !important;' +
            'color: transparent !important;' +
            'background-repeat: repeat-y}' +
            '#skeleton-text-id{visibility: hidden}';

        const skeletonTextBlockStyleEle = document.createElement('style');
        skeletonTextBlockStyleEle.innerText = skeletonTextBlockStyle;

        document.body.prepend(skeletonTextBlockStyleEle);

        // 将 js 脚本移除
        Array.from(document.body.querySelectorAll('script')).map(script => {
            document.body.removeChild(script);
        });

        Array.from(document.body.querySelectorAll('img')).map(img => {
            const { width, height } = img.getBoundingClientRect();
            img.style.width = width;
            img.style.height = height;
            img.src =
                'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            img.style.backgroundColor = '#EEEEEE';
        });

        Array.from(document.body.querySelectorAll('a')).map(a => {
            a.href = 'javascript:void(0);';
            a.removeAttribute('href');
        });

        handleNodes(document.body.childNodes);

        const styles = Array.from(document.querySelectorAll('style')).map(
            style => style.innerHTML || style.innerText
        );

        const cleanedHtml = document.body.innerHTML;

        return {
            rawHtml,
            styles,
            cleanedHtml,
            bodyFontSize
        };
    }

    // 将非首屏html节点移除
    function handleNodes(nodes) {
        Array.from(nodes).map(node => {
            // 处理需要忽略的节点
            const ignore = hasAttr(node, 'data-skeleton-ignore');

            if (inViewPort(node) && !hasAttr(node, 'data-skeleton-remove')) {
                if (hasAttr(node, 'data-skeleton-bgcolor')) {
                    const bgColor = node.getAttribute('data-skeleton-bgcolor');
                    node.style.backgroundColor = bgColor;
                    node.style.color = 'transparent';
                } else if (ignore) {
                    // do nothing
                    return true;
                } else if (hasAttr(node, 'data-skeleton-empty')) {
                    node.innerHTML = '';

                    let classNameArr =
                        node.className && node.className.split(' ');
                    classNameArr = classNameArr.map(item => {
                        return '.' + item;
                    });
                    const className = classNameArr.join('');
                    const id = node.id ? '#' + node.id : '';

                    const query = className || id;

                    if (query) {
                        console.log('query: ' + query);

                        let styleSheet;

                        for (let item of document.styleSheets) {
                            if (!item.href) {
                                styleSheet = item;
                                return;
                            }
                        }

                        try {
                            styleSheet &&
                                styleSheet.insertRule(
                                    `${query}::before{content:'' !important;background:none !important;}`,
                                    0
                                );
                            styleSheet &&
                                styleSheet.insertRule(
                                    `${query}::after{content:'' !important;background:none !important;}`,
                                    0
                                );
                        } catch (e) {
                            console.log(JSON.stringify(e));
                        }
                    }
                } else if (node.childNodes && node.childNodes.length == 1) {
                    if (node.childNodes[0].nodeType === 3) {
                        // 文本节点
                        textHandler(node, {
                            color: '#EEEEEE'
                        });
                    }
                }

                if (!ignore) {
                    const children = node.childNodes;
                    handleNodes(children);
                }
            } else {
                node.parentElement.removeChild(node);
            }
        });
    }

    /**
     * [transparent 设置元素字体颜色为透明，必要情况下，设置其 textDecorationColor 也为透明色]
     */
    function transparent(ele) {
        ele.style.color = TRANSPARENT;
    }

    function setOpacity(ele) {
        ele.style.opacity = 0;
    }

    const px2rem = px => {
        const pxValue = typeof px === 'string' ? parseInt(px, 10) : px;
        const htmlElementFontSize = getComputedStyle(document.documentElement)
            .fontSize;

        return `${pxValue / parseInt(htmlElementFontSize, 10)}rem`;
    };

    const getTextWidth = (text, style) => {
        let offScreenParagraph = document.querySelector(`#${MOCK_TEXT_ID}`);
        if (!offScreenParagraph) {
            const wrapper = document.createElement('p');
            offScreenParagraph = document.createElement('span');
            Object.assign(wrapper.style, {
                width: '10000px'
            });
            offScreenParagraph.id = MOCK_TEXT_ID;
            wrapper.appendChild(offScreenParagraph);
            document.body.appendChild(wrapper);
        }
        Object.assign(offScreenParagraph.style, style);
        offScreenParagraph.textContent = text;
        return offScreenParagraph.getBoundingClientRect().width;
    };

    function addTextMask(
        paragraph,
        { textAlign, lineHeight, paddingBottom, paddingLeft, paddingRight },
        maskWidthPercent = 0.5
    ) {
        let left;
        let right;
        switch (textAlign) {
            case 'center':
                left = document.createElement('span');
                right = document.createElement('span');
                [left, right].forEach(mask => {
                    Object.assign(mask.style, {
                        display: 'inline-block',
                        width: `${(maskWidthPercent / 2) * 100}%`,
                        height: lineHeight,
                        background: '#fff',
                        position: 'absolute',
                        bottom: paddingBottom
                    });
                });
                left.style.left = paddingLeft;
                right.style.right = paddingRight;
                paragraph.appendChild(left);
                paragraph.appendChild(right);
                break;
            case 'right':
                left = document.createElement('span');
                Object.assign(left.style, {
                    display: 'inline-block',
                    width: `${maskWidthPercent * 100}%`,
                    height: lineHeight,
                    background: '#fff',
                    position: 'absolute',
                    bottom: paddingBottom,
                    left: paddingLeft
                });
                paragraph.appendChild(left);
                break;
            case 'left':
            default:
                right = document.createElement('span');
                Object.assign(right.style, {
                    display: 'inline-block',
                    width: `${maskWidthPercent * 100}%`,
                    height: lineHeight,
                    background: '#fff',
                    position: 'absolute',
                    bottom: paddingBottom,
                    right: paddingRight
                });
                paragraph.appendChild(right);
                break;
        }
    }

    function textHandler(ele, { color }) {
        const { width } = ele.getBoundingClientRect();
        // 宽度小于 50 的元素就不做阴影处理
        if (width <= 2) {
            console.log(ele);
            return setOpacity(ele);
        }
        const comStyle = window.getComputedStyle(ele);
        const text = ele.textContent;
        let {
            lineHeight,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            position: pos,
            fontSize,
            textAlign,
            wordSpacing,
            wordBreak
        } = comStyle;
        if (!/\d/.test(lineHeight)) {
            const fontSizeNum = parseInt(fontSize, 10) || 14;
            lineHeight = `${fontSizeNum * 1.4}px`;
        }

        const position = ['fixed', 'absolute', 'flex'].find(p => p === pos)
            ? pos
            : 'relative';

        const height = ele.offsetHeight;
        // 向下取整
        let lineCount =
            (height - parseInt(paddingTop, 10) - parseInt(paddingBottom, 10)) /
            parseInt(lineHeight, 10); // eslint-disable-line no-bitwise

        lineCount = lineCount < 1.5 ? 1 : lineCount;

        // let textHeightRatio = parseInt(fontSize, 10) / parseInt(lineHeight, 10)
        // if (Number.isNaN(textHeightRatio)) {
        //   textHeightRatio = .6 // default number
        // }

        let textHeightRatio = 0.6;

        // 添加文本块类名标记
        ele.classList.add('skeleton-text-block-mark');

        /* eslint-disable no-mixed-operators */
        Object.assign(ele.style, {
            backgroundImage: `linear-gradient(
                transparent ${((1 - textHeightRatio) / 2) * 100}%,
                ${color} 0%,
                ${color} ${((1 - textHeightRatio) / 2 + textHeightRatio) *
                100}%,
                transparent 0%)`,
            backgroundSize: `100% ${px2rem(parseInt(lineHeight) * 1.1)}`,
            position
        });
        /* eslint-enable no-mixed-operators */
        // add white mask
        if (lineCount > 1) {
            addTextMask(
                ele,
                Object.assign(JSON.parse(JSON.stringify(comStyle)), {
                    lineHeight
                })
            );
        } else {
            const textWidth = getTextWidth(text, {
                fontSize,
                lineHeight,
                wordBreak,
                wordSpacing
            });
            const textWidthPercent =
                textWidth /
                (width -
                    parseInt(paddingRight, 10) -
                    parseInt(paddingLeft, 10));
            ele.style.backgroundSize = `${textWidthPercent * 100}% ${px2rem(
                lineHeight
            )}`;
            switch (textAlign) {
                case 'left': // do nothing
                    break;
                case 'center':
                    ele.style.backgroundPositionX = '50%';
                    break;
                case 'right':
                    ele.style.backgroundPositionX = '100%';
                    break;
            }
        }
    }

    function imgHandler(ele, { color, shape, shapeOpposite }) {
        const { width, height } = ele.getBoundingClientRect();
        const attrs = {
            width,
            height,
            src: SMALLEST_BASE64
        };

        const finalShape =
            shapeOpposite.indexOf(ele) > -1 ? getOppositeShape(shape) : shape;

        setAttributes(ele, attrs);
        // DON'T put `style` attribute in attrs, becasure maybe have another inline style.
        Object.assign(ele.style, {
            background: color,
            borderRadius: finalShape === 'circle' ? '50%' : 0
        });

        if (ele.hasAttribute('alt')) {
            ele.removeAttribute('alt');
        }
    }

    function inViewPort(ele) {
        try {
            const rect = ele.getBoundingClientRect();
            return (
                rect.top < window.innerHeight && rect.left < window.innerWidth
            );
        } catch (e) {
            return true;
        }
    }

    function hasAttr(ele, attr) {
        try {
            return ele.hasAttribute(attr);
        } catch (e) {
            return false;
        }
    }

    function setLocalStorage(storage = {}) {
        let keys = Object.keys(storage);
        keys.forEach((key) => {
            localStorage.setItem(key, storage[key]);
        });
    }

    exports.getHtmlAndStyle = getHtmlAndStyle;
    exports.setLocalStorage = setLocalStorage;
    return exports;
})({});
