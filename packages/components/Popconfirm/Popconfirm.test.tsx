import { describe,it,expect } from "vitest";
import { mount } from "@vue/test-utils";
import Popconfirm from "./Popconfirm.vue";
import type { PopconfirmProps} from "./type";
import {each,get } from "lodash-es";

describe("Popconfirm.vue", () => {
  const props = {
    title: "Test Title",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    confirmButtonType: "primary",
    cancelButtonType: "info",
    icon: "check-circle",
    iconColor: "green",
    hideIcon: false,
    hideAfter: 500,
    width: 200,
  } as PopconfirmProps;
  it("should accept all props", () => {
    const wrapper = mount(Popconfirm,{props});
    each(props,(value,key)=>{
      expect(get(wrapper.props(),key)).toBe(value);
    })
  });

  it('should render solt content correctly',()=>{
    const soltsContent = 'Test Content';
    const wrapper = mount(Popconfirm,{
      props,
      slots:{
        default:soltsContent,
      }
    })
    expect(wrapper.text()).toContain(soltsContent);
  })
});