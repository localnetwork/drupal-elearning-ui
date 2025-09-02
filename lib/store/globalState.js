import { create } from "zustand";
export default create(() => ({
  showLazy: false,
  captcha: {},
  ready: false,
}));
