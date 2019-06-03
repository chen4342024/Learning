// 用于生成骨骼图
const puppeteer = require('puppeteer');
const fs = require('fs');
const co = require('co');
const minify = require('html-minifier').minify;
const cssTree = require('css-tree');
const path = require('path');
const { JSDOM } = require('jsdom');

const base64Img = require('base64-img');

const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const util = require('./utils/index');

const SCREEN_SHOT_PATH = 'screenshot';

const getSkeleton = async function(config = {}) {
    const pageName = config.name; // 页面名称（仅限英文），必填
    const pageUrl = config.url; // 页面地址（此地址必须可访问），必填
    let outputPath = config.outputPath || ''; // 骨骼图文件输出文件夹路径，默认目录下的html文件夹
    let templatePath = config.templatePath || './index.html'; // 需要做骨骼图替换的文件路径，默认 ./index.html
    let viewport = config.viewport || '375x812'; // 设置设备参数，默认 375x812
    let storage = config.storage || {};
    let placeholderString = config.placeholderString || '<!-- shell -->';

    if (!(pageName && pageUrl)) {
        console.log(`name 和 url 均不能为空！`);
        return false;
    }

    const tempArr = viewport && viewport.split('x');
    viewport = {
        width: tempArr[0] * 1,
        height: tempArr[1] * 1
    };

    if (!pageName) {
        console.warn('请输入要获取骨骼图的页面名称');
        return false;
    }

    outputPath = `${outputPath}/${pageName}`;
    // 骨架图输出
    const skeletonHtmlPath = outputPath
        ? path.join(outputPath, `./skeleton.html`)
        : null;
    const skeletonBase64Path = outputPath
        ? path.join(outputPath, `./base64.txt`)
        : null;

    const skeletonInjectPath = outputPath
        ? path.join(outputPath, `./inject.txt`)
        : null;

    // 开始模拟打开页面
    co(function*() {
        const browser = yield puppeteer.launch({ headless: false });

        let scriptContent = yield util.genScriptContent();

        const page = yield browser.newPage();

        // 设置 viewport
        yield page.setViewport(viewport);
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('warning', msg =>
            console.log('PAGE WARN:', JSON.stringify(msg))
        );
        page.on('error', msg => console.log('PAGE ERR:', ...msg.args));

        // 跳转到页面
        yield page.goto(pageUrl);

        // 注入脚本
        yield page.addScriptTag({ content: scriptContent });

        // 在页面执行脚本 localstorage， 注入登陆信息
        yield page.evaluate(storage => {
            console.log(SkeletonUtil);
            return SkeletonUtil.setLocalStorage(storage);
        }, storage);

        // 再重新打开
        yield page.goto(pageUrl);

        // 注入脚本
        yield page.addScriptTag({ content: scriptContent });

        // 延时 10s
        yield sleep(10000);

        // 截屏
        yield page.screenshot({
            path: path.join(SCREEN_SHOT_PATH, 'preview.png')
        });

        // Get the "viewport" of the page, as reported by the page.
        // 在页面执行脚本
        const htmlAndStyle = yield page.evaluate(storage => {
            console.log(SkeletonUtil);
            SkeletonUtil.setLocalStorage(storage);
            return SkeletonUtil.getHtmlAndStyle();
        }, storage);

        // 执行截屏
        yield page.screenshot({
            path: path.join(SCREEN_SHOT_PATH, 'preview-after-htmlAndStyle.png')
        });

        // 清理样式
        const cleanedStyles = handleStyles(
            htmlAndStyle.styles,
            htmlAndStyle.cleanedHtml
        );

        // 骨骼图完整样式+html
        const skeletonHtmlContent =
            '<div id="nozomi-skeleton-html-style-container" style="width:10rem;overflow-x:hidden;"><style>body{font-size: ' +
            htmlAndStyle.bodyFontSize +
            ' } #skeleton-text-id{visibility: hidden} a:hover{text-decoration: none;}' +
            cleanedStyles +
            '</style>\n' +
            htmlAndStyle.cleanedHtml +
            '</div>';

        // console.log('skeletonHtmlContent, ' + skeletonHtmlContent);

        if (skeletonHtmlPath && fs.existsSync(skeletonHtmlPath)) {
            fs.unlinkSync(skeletonHtmlPath);
        }

        // 对代码进行压缩
        const minifySkeletonHtmlContent = minify(skeletonHtmlContent, {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        });

        const screenshotPath = `skeleton-${pageName}.png`;

        // 生成 base64
        yield page.screenshot({
            path: path.join(SCREEN_SHOT_PATH, 'preview-base64.png')
        });

        // 首屏骨骼图截图
        const screenshot = yield page.screenshot({
            path: screenshotPath
        });

        // base64 图片获取
        let skeletonImageBase64 = '';
        yield imagemin([screenshotPath], './', {
            use: [
                imageminPngquant({
                    quality: 30
                })
            ]
        }).then(() => {
            skeletonImageBase64 = base64Img.base64Sync(screenshotPath);

            console.log(`base64 png ${pageName} is created`);

            if (screenshotPath && fs.existsSync(screenshotPath)) {
                fs.unlinkSync(screenshotPath);
            }
        });

        // 若不存在 output 目录，创建目录
        if (outputPath && !fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, 0755);
        }

        if (skeletonBase64Path) {
            // 将骨骼图 base64 png 写入 txt 文件
            fs.writeFile(skeletonBase64Path, skeletonImageBase64, err => {
                if (err) {
                    throw err;
                }
                console.log(
                    `The ${pageName}/ base64.txt file has been saved in path '${outputPath}' !`
                );
            });
        }

        if (skeletonHtmlPath) {
            // 将骨骼图写入 html 文件
            fs.writeFile(skeletonHtmlPath, minifySkeletonHtmlContent, err => {
                if (err) {
                    throw err;
                }
                console.log(
                    `The ${pageName} / skeleton.html file has been saved in path '${outputPath}' !`
                );
            });
        }

        // 需要注入到页面的代码
        if (skeletonInjectPath) {
            let injectString = getInjectString(skeletonImageBase64);
            fs.writeFile(skeletonInjectPath, injectString, err => {
                if (err) {
                    throw err;
                }
                console.log(
                    `The ${pageName} / inject.txt file has been saved in path '${outputPath}' !`
                );
            });
        }

        // resetSkeletonBodyBg(templatePath, skeletonImageBase64);
        // replaceStringInFile(
        //     templatePath,
        //     placeholderString,
        //     getInjectString(skeletonImageBase64)
        // );

        yield browser.close();
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 移除非首屏样式
    function handleStyles(styles, html) {
        const ast = cssTree.parse(styles);
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const cleanedChildren = [];

        let index = 0;

        ast &&
            ast.children &&
            ast.children.map(style => {
                let slectorExisted = false,
                    selector;

                switch (style.prelude && style.prelude.type) {
                    case 'Raw':
                        selector =
                            style.prelude.value &&
                            style.prelude.value.replace(/\,|\n/g, '');

                        slectorExisted = selectorExistedInHtml(
                            selector,
                            document
                        );

                        break;
                    case 'SelectorList':
                        style.prelude.children &&
                            style.prelude.children.map(child => {
                                const children = child && child.children;

                                selector = getSelector(children);

                                if (selectorExistedInHtml(selector, document)) {
                                    slectorExisted = true;
                                }
                            });

                        break;
                }

                if (slectorExisted) {
                    cleanedChildren.push(style);
                }
            });

        ast.children = cleanedChildren;

        let outputStyles = cssTree.generate(ast);

        outputStyles = outputStyles.replace(/}\,+/g, '}');

        return outputStyles;
    }

    function selectorExistedInHtml(selector, document) {
        if (!selector) {
            return false;
        }

        // 查询当前样式在 html 中是否用到
        let selectorResult,
            slectorExisted = false;
        try {
            selectorResult = document.querySelectorAll(selector);
        } catch (e) {
            console.log('selector query error: ' + selector);
        }

        if (selectorResult && selectorResult.length) {
            slectorExisted = true;
        }

        return slectorExisted;
    }

    function getSelector(arr) {
        if (!arr) {
            return '';
        }

        let selector = '';

        const selectorArr = [];
        arr.map(child2 => {
            switch (
                child2.type // ClassSelector,IdSelector,Combinator,TypeSelector,Identifier,AttributeSelector
            ) {
                case 'WhiteSpace':
                    selectorArr.push(child2.value);
                    break;
                case 'ClassSelector':
                    selectorArr.push('.' + child2.name);
                    break;
                case 'IdSelector':
                    selectorArr.push('#' + child2.name);
                    break;
                case 'AttributeSelector':
                    selectorArr.push('[' + child2.name.name + ']');
                    slectorExisted = true;
                    break;
                case 'PseudoClassSelector':
                    selectorArr.push(':' + child2.name);
                    slectorExisted = true;
                    break;
                case 'PseudoElementSelector':
                    selectorArr.push('::' + child2.name);
                    slectorExisted = true;
                    break;
                case 'Raw':
                    child2.value =
                        child2.value &&
                        (child2.value + '').replace(/\,|\n/g, '');
                    child2.name =
                        child2.name && (child2.name + '').replace(/\,|\n/g, '');

                    selectorArr.push(child2.value || child2.name);
                    slectorExisted = true;

                    break;
                default:
                    selectorArr.push(child2.name || child2.value);
                    slectorExisted = true;
                    break;
            }
        });

        selector = selectorArr.join('');

        return selector;
    }

    function replaceStringInFile(templatePath, replaceString, replaceContent) {
        if (!(templatePath && replaceString && replaceContent)) {
            return false;
        }

        if (!fs.existsSync(templatePath)) {
            console.warn('----- warning begin -----');
            console.warn(`WARNING: the template path '${templatePath}' 不存在`);
            console.warn('----- warning end -----');
            return false;
        }

        fs.readFile(templatePath, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }

            const result = data.replace(replaceString, replaceContent);

            fs.writeFile(templatePath, result, 'utf8', function(err) {
                if (err) return console.log(err);
            });
        });
    }

    // 在模板中注入骨骼图
    function resetSkeletonBodyBg(templatePath, skeletonImageBase64) {
        if (!(templatePath && skeletonImageBase64)) {
            return false;
        }

        if (!fs.existsSync(templatePath)) {
            console.warn('----- warning begin -----');
            console.warn(`WARNING: the template path '${templatePath}' 不存在`);
            console.warn('----- warning end -----');
            return false;
        }

        fs.readFile(templatePath, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }

            const dom = new JSDOM(data);

            const document = dom.window.document;

            const skeletonRemoveMarkClassName =
                'skeleton-remove-after-first-request';

            const skeletonRemoveMark = Array.from(
                document.body.querySelectorAll(
                    '.' + skeletonRemoveMarkClassName
                )
            );

            skeletonRemoveMark &&
                skeletonRemoveMark.map(item => {
                    document.body.removeChild(item);
                });

            const style = document.createElement('style');
            style.classList.add(skeletonRemoveMarkClassName);
            style.innerHTML = getInjectStyle(skeletonImageBase64);
            document.body.prepend(style);

            const script = document.createElement('script');
            script.classList.add(skeletonRemoveMarkClassName);
            script.innerHTML = getInjectStyle(skeletonRemoveMarkClassName);
            document.body.prepend(script);

            fs.writeFile(
                templatePath,
                document.documentElement.outerHTML,
                'utf8',
                function(err) {
                    if (err) return console.log(err);
                }
            );
        });
    }
};

// 生成注入到模板的字符串
function getInjectString(skeletonImageBase64) {
    const skeletonRemoveMarkClassName = 'skeleton-remove-after-first-request';
    let styleString = `<style class="${skeletonRemoveMarkClassName}">${getInjectStyle(
        skeletonImageBase64
    )}</style>`;
    let scriptString = `<script class="${skeletonRemoveMarkClassName}">${getInjectScript(
        skeletonRemoveMarkClassName
    )}</script>`;
    return `${styleString}${scriptString}`;
}

// 生成注入到模板的样式内容
function getInjectStyle(skeletonImageBase64) {
    return `body{width:10rem;min-height:25rem;background-image:url(${skeletonImageBase64});background-repeat:no-repeat;background-size:100% auto;}`;
}

// 生成注入到模板的脚本内容
function getInjectScript(skeletonRemoveMarkClassName) {
    return `window.addEventListener('load', function(){setTimeout(function(){var removes = Array.from(document.body.querySelectorAll('.${skeletonRemoveMarkClassName}'));removes && removes.map(function(item){document.body.removeChild(item);})},3000);})`;
}

module.exports = getSkeleton;
