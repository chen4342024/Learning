<template>
    <div class="home">
        <h3>监控数据：</h3>
        <p>加载起始时间：{{timing.navigationStart}}</p>
        <p>重定向开始时间：{{timing.redirectStart}}</p>
        <p>重定向介绍时间：{{timing.redirectEnd}}</p>
        <p>发起资源请求时间{{timing.fetchStart}}</p>
        <p>查询dns开始{{timing.domainLookupStart}}</p>
        <p>查询dns结束{{timing.domainLookupEnd}}</p>
        <p>Tcp建立{{timing.connectStart}}</p>
        <p>Tcp完成{{timing.connectEnd}}</p>
        <p>发起请求{{timing.requestStart}}</p>
        <p>服务器开始响应{{timing.responseStart}}</p>
        <p>加载完成{{timing.loadEventEnd}}</p>

        <h3>指标：</h3>
        <p>dns解析时间： {{mesure.dnsLookUp}} ms</p>
        <p>TCP建立时间： {{mesure.tcpTime}} ms</p>
        <p>首字节，网络请求耗时 {{mesure.ttfb}} ms</p>
        <p>传输数据耗时 {{mesure.trans}} ms</p>
        <p>白屏时间： {{mesure.firstPaintTime}} ms</p>
        <p>白屏时间(paint)： {{mesure.firstPaintTimePaint}} ms</p>
        <p>白屏时间(rfa)： {{mesure.firstPaintEndRfa}} ms</p>
        <p>白屏时间(body)： {{mesure.firstPaintTimeBody}} ms</p>
        <p>白屏时间(Chrome)： {{mesure.firstPaintTimeChrome}} ms</p>
        <p>dom渲染完成时间： {{mesure.domReady}} ms</p>
        <p>页面onload时间： {{mesure.onLoad}} ms</p>
    </div>
</template>

<script>
export default {
    name: "home",
    components: {},
    data() {
        return {
            timing: {},
            mesure: {}
        };
    },

    mounted() {
        window.onload = () => {
            setTimeout(() => {
                this.timing = performance.timing;
                this.calc();
            }, 500);
        };
    },

    methods: {
        calc() {
            this.mesure.dnsLookUp = this.dnsLookUp();
            this.mesure.tcpTime = this.tcpTime();
            this.mesure.ttfb = this.ttfb();
            this.mesure.firstPaintTime = this.firstPaintTime();
            this.mesure.firstPaintTimePaint = this.firstPaintTimePaint();
            this.mesure.firstPaintEndRfa = this.firstPaintEndRfa();
            this.mesure.firstPaintTimeBody = this.firstPaintTimeBody();
            this.mesure.firstPaintTimeChrome = this.firstPaintTimeChrome();
            this.mesure.trans = this.trans();
            this.mesure.timeToInteract = this.timeToInteract();
            this.mesure.domReady = this.domReady();
            this.mesure.onLoad = this.onLoad();
            this.mesure.onLoadEnd = this.onLoadEnd();
        },

        // DNS 解析耗时
        dnsLookUp() {
            let timing = this.timing;
            return timing.domainLookupEnd - timing.domainLookupStart;
        },

        // TCP链接耗时
        tcpTime() {
            let timing = this.timing;
            return timing.connectEnd - timing.connectStart;
        },

        // Time to FirstByte（TTFB），网络请求耗时
        // 以 Google Development 定义为准
        ttfb() {
            let timing = this.timing;
            return timing.responseStart - timing.requestStart;
        },

        // First Paint Time, 首次渲染时间 / 白屏时间
        // 如果浏览器支持，则会取chrome.loadTimes().firstPaintTime 计算
        // 白屏时间 = 开始渲染时间( 首字节时间+HTML下载完成时间 )+头部资源加载时间,
        // 这种方式忽略了头部资源加载的时间
        firstPaintTime() {
            let timing = this.timing;
            return timing.domLoading - timing.navigationStart;
        },

        // 通过raf来模拟，但是在safari里面有问题
        firstPaintEndRfa() {
            let timing = this.timing;
            return window.firstPaintEndRfa - timing.navigationStart;
        },

        // 比较准确的白屏时间，需要在body里面打一个点
        firstPaintTimeBody() {
            let timing = this.timing;
            return window.firstPaintEnd - timing.navigationStart;
        },

        // 通过 paint timing api ，safari里没有这个方法
        firstPaintTimePaint() {
            if (window.performance) {
                const fpEntry = window.performance.getEntriesByType("paint")[0];
                return fpEntry ? fpEntry.startTime : 0;
            }
            return 0;
        },

        // 通过 loadTimes api ， safari里也没有这个方法
        firstPaintTimeChrome() {
            if (window.chrome && window.chrome.loadTimes) {
                let loadTimes = window.chrome.loadTimes();
                return (
                    (loadTimes.firstPaintTime - loadTimes.startLoadTime) * 1000
                );
            }
            return 0;
        },

        //数据传输耗时
        trans() {
            let timing = this.timing;
            return timing.responseEnd - timing.responseStart;
        },

        // Time to Interact，首次可交互时间
        // 浏览器完成所有HTML 解析并且完成DOM 构建，此时浏览器开始加载资源
        timeToInteract() {
            let timing = this.timing;
            return timing.domInteractive - timing.navigationStart;
        },

        // HTML 加载完成时间， 即 DOM Ready 时间
        // 如果页面有同步执行的JS，则同步 JS 执行时间 = ready - tti
        // SPA的项目可以当这个为白屏时间
        domReady() {
            let timing = this.timing;
            return timing.domContentLoadedEventEnd - timing.navigationStart;
        },

        onLoad() {
            let timing = this.timing;
            return timing.loadEventStart - timing.navigationStart;
        },

        // load = 首次渲染时间 + DOM 解析耗时 +同步 JS 执行 + 资源加载耗时
        onLoadEnd() {
            let timing = this.timing;
            return timing.loadEventEnd - timing.navigationStart;
        }
    }
};
</script>
