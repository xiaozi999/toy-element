import { describe,it,expect } from "vitest";
import { mount } from "@vue/test-utils";
import Popconfirm from "./Popconfirm.vue";

describe("Popconfirm.vue", () => {
  it("should render the popconfirm", () => {
    const wrapper = mount(Popconfirm);
    expect(wrapper.exists()).toBe(true);
  });
});