import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { mergeArrays } from "../../src/utils/util";

describe("HelloWorld.vue", () => {
    it("renders props.msg when passed", () => {
        const msg = "new message";
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg }
        });
        expect(wrapper.text()).to.include(msg);
    });
});

describe("mergeArrays", () => {
    it("合并数组", () => {
        let array = [2, 3, 7, 1, 4, 6];
        mergeArrays(array, 0, 2, 3, 5);
        expect(array).to.deep.equal([1, 2, 3, 4, 6, 7]);
    });
});
