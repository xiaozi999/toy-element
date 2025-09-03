import { describe, expect, it } from "vitest";
import { defineComponent, createApp, h } from "vue";
import { mount } from "@vue/test-utils";
import { withInstall } from "../install";

const AppComp = defineComponent({
  setup() {
    return () => h('div', 'app');
  },
});

const componentA = withInstall(
  defineComponent({
    name: "test",
    setup() {
      return () => h('div', 'test');
    },
  })
);

const componentB = withInstall(
  defineComponent({
    name: "test2",
    setup() {
      return () => h('div', 'test2');
    },
  })
);

describe("install", () => {
  it("withInstall should be worked", () => {
    const wapper = mount(() => h('div', { id: 'app2' }));
    const app = createApp(AppComp);

    app.use(componentA).use(componentB).mount(wapper.element);

    expect(componentA.install).toBeDefined();
    expect(componentB.install).toBeDefined();
    expect(app._context.components["test"]).toBeTruthy();
    expect(app._context.components["test2"]).toBeTruthy();
  });
});
