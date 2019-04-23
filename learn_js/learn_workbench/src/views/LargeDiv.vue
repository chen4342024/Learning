<template>
    <div class="large-div">
        <h3>大量 DIV 问题</h3>
        <div class="btn" @click="handleAppendDiv">fragment</div>
        <div class="btn" @click="handleNormalAppendDiv">普通插入</div>
        <div class="btn" @click="handleCloneAppendDiv">clone插入</div>
        <div class="btn" @click="handleStringAppendDiv">String插入</div>
        <div class="result-box">
            得出结论： 在chrome fragment 性能比普通插入并没有任何优势
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
const loopNum = 5000;
export default {
    name: "largeDiv",
    components: {},
    data() {
        return {};
    },
    created() {
        const container = document.createElement("div");
        container.id = "container";
        document.body.appendChild(container);
    },
    methods: {
        handleAppendDiv() {
            let containerEl = document.getElementById("container");
            containerEl.innerHTML = "";
            console.time("handleAppendDiv");
            var oFrag = document.createDocumentFragment();
            for (var i = 0; i < loopNum; i++) {
                var op = document.createElement("div");
                oFrag.appendChild(op);
            }
            containerEl.appendChild(oFrag);
            console.timeEnd("handleAppendDiv");
        },

        handleNormalAppendDiv() {
            let containerEl = document.getElementById("container");
            containerEl.innerHTML = "";
            console.time("handleNormalAppendDiv");
            for (var i = 0; i < loopNum; i++) {
                var op = document.createElement("div");
                containerEl.appendChild(op);
            }
            console.timeEnd("handleNormalAppendDiv");
        },

        handleCloneAppendDiv() {
            let containerEl = document.getElementById("container");
            containerEl.innerHTML = "";
            console.time("handleCloneAppendDiv");
            var op = document.createElement("div");
            for (var i = 0; i < loopNum; i++) {
                containerEl.appendChild(op.cloneNode());
            }
            console.timeEnd("handleCloneAppendDiv");
        },

        handleStringAppendDiv() {
            let containerEl = document.getElementById("container");
            containerEl.innerHTML = "";
            console.time("handleStringAppendDiv");
            let html = "";
            for (var i = 0; i < loopNum; i++) {
                html += "<div></div>";
            }
            containerEl.innerHTML = html;
            console.timeEnd("handleStringAppendDiv");
        }
    }
};
</script>
