// vite.es.config.ts
import { defineConfig } from "file:///Users/pengzhibo/%E6%88%91%E4%B8%8D%E7%88%B1%E5%AD%A6%E4%B9%A0%F0%9F%91%8C/toy-element/node_modules/.pnpm/vite@5.4.19_@types+node@20.19.9/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/pengzhibo/%E6%88%91%E4%B8%8D%E7%88%B1%E5%AD%A6%E4%B9%A0%F0%9F%91%8C/toy-element/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.19_@types+node@20.19.9__vue@3.5.18_typescript@5.8.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///Users/pengzhibo/%E6%88%91%E4%B8%8D%E7%88%B1%E5%AD%A6%E4%B9%A0%F0%9F%91%8C/toy-element/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.19.9_rollup@4.46.1_typescript@5.8.3_vite@5.4.19_@types+node@20.19.9_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/pengzhibo/\u6211\u4E0D\u7231\u5B66\u4E60\u{1F44C}/toy-element/packages/core";
var COMP_NAMES = [
  "Alert",
  "Button",
  "Collapse",
  "Dropdown",
  "Form",
  "Icon",
  "Input",
  "Layout",
  "Loading",
  "Message",
  "MessageBox",
  "Notification",
  "Overlay",
  "Select",
  "Popconfirm",
  "Switch",
  "Tooltip",
  "Upload"
];
var vite_es_config_default = defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: "../../tsconfig.build.json",
    outDir: "dist/types"
  })],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "index.css";
          }
          return assetInfo.name;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils")) {
            return "utils";
          }
          for (const name of COMP_NAMES) {
            if (id.includes(`/packages/components/${name}`)) {
              return name;
            }
          }
          return null;
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGVuZ3poaWJvL1x1NjIxMVx1NEUwRFx1NzIzMVx1NUI2Nlx1NEU2MFx1RDgzRFx1REM0Qy90b3ktZWxlbWVudC9wYWNrYWdlcy9jb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcGVuZ3poaWJvL1x1NjIxMVx1NEUwRFx1NzIzMVx1NUI2Nlx1NEU2MFx1RDgzRFx1REM0Qy90b3ktZWxlbWVudC9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9wZW5nemhpYm8vJUU2JTg4JTkxJUU0JUI4JThEJUU3JTg4JUIxJUU1JUFEJUE2JUU0JUI5JUEwJUYwJTlGJTkxJThDL3RveS1lbGVtZW50L3BhY2thZ2VzL2NvcmUvdml0ZS5lcy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuXG5cbmNvbnN0IENPTVBfTkFNRVM9W1xuICBcIkFsZXJ0XCIsXG4gIFwiQnV0dG9uXCIsXG4gIFwiQ29sbGFwc2VcIixcbiAgXCJEcm9wZG93blwiLFxuICBcIkZvcm1cIixcbiAgXCJJY29uXCIsXG4gIFwiSW5wdXRcIixcbiAgXCJMYXlvdXRcIixcbiAgXCJMb2FkaW5nXCIsXG4gIFwiTWVzc2FnZVwiLFxuICBcIk1lc3NhZ2VCb3hcIixcbiAgXCJOb3RpZmljYXRpb25cIixcbiAgXCJPdmVybGF5XCIsXG4gIFwiU2VsZWN0XCIsXG4gIFwiUG9wY29uZmlybVwiLFxuICBcIlN3aXRjaFwiLFxuICBcIlRvb2x0aXBcIixcbiAgXCJVcGxvYWRcIlxuXSBhcyBjb25zdDtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpLGR0cyh7XG4gICAgdHNjb25maWdQYXRoOicuLi8uLi90c2NvbmZpZy5idWlsZC5qc29uJyxcbiAgICBvdXREaXI6J2Rpc3QvdHlwZXMnLFxuICB9KV0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdC9lcycsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL2luZGV4LnRzJyksXG4gICAgICBuYW1lOiAnVG95RWxlbWVudCcsXG4gICAgICBmaWxlTmFtZTonaW5kZXgnLFxuICAgICAgZm9ybWF0czpbJ2VzJ11cbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiLFxuICAgICAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiLFxuICAgICAgICBcIkBmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWVcIixcbiAgICAgICAgXCJAcG9wcGVyanMvY29yZVwiLFxuICAgICAgICBcImFzeW5jLXZhbGlkYXRvclwiLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczooYXNzZXRJbmZvKT0+e1xuICAgICAgICAgIGlmKGFzc2V0SW5mby5uYW1lID09PSAnc3R5bGUuY3NzJyl7XG4gICAgICAgICAgICByZXR1cm4gJ2luZGV4LmNzcydcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFzc2V0SW5mby5uYW1lIGFzIHN0cmluZ1xuICAgICAgICB9LFxuICAgICAgICBtYW51YWxDaHVua3MoaWQpe1xuICAgICAgICAgIGlmKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSl7XG4gICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3JcIlxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihpZC5pbmNsdWRlcygnL3BhY2thZ2VzL2hvb2tzJykpe1xuICAgICAgICAgICAgcmV0dXJuIFwiaG9va3NcIlxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihpZC5pbmNsdWRlcygnL3BhY2thZ2VzL3V0aWxzJykpe1xuICAgICAgICAgICAgcmV0dXJuIFwidXRpbHNcIlxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IoY29uc3QgbmFtZSBvZiBDT01QX05BTUVTKXtcbiAgICAgICAgICAgIGlmKGlkLmluY2x1ZGVzKGAvcGFja2FnZXMvY29tcG9uZW50cy8ke25hbWV9YCkpe1xuICAgICAgICAgICAgICByZXR1cm4gbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1ksU0FBUyxvQkFBb0I7QUFDN1osT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxhQUFXO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxJQUFPLHlCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFFLElBQUk7QUFBQSxJQUNsQixjQUFhO0FBQUEsSUFDYixRQUFPO0FBQUEsRUFDVCxDQUFDLENBQUM7QUFBQSxFQUNGLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDdEMsTUFBTTtBQUFBLE1BQ04sVUFBUztBQUFBLE1BQ1QsU0FBUSxDQUFDLElBQUk7QUFBQSxJQUNmO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sZ0JBQWUsQ0FBQyxjQUFZO0FBQzFCLGNBQUcsVUFBVSxTQUFTLGFBQVk7QUFDaEMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU8sVUFBVTtBQUFBLFFBQ25CO0FBQUEsUUFDQSxhQUFhLElBQUc7QUFDZCxjQUFHLEdBQUcsU0FBUyxjQUFjLEdBQUU7QUFDN0IsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBRyxHQUFHLFNBQVMsaUJBQWlCLEdBQUU7QUFDaEMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBRyxHQUFHLFNBQVMsaUJBQWlCLEdBQUU7QUFDaEMsbUJBQU87QUFBQSxVQUNUO0FBQ0EscUJBQVUsUUFBUSxZQUFXO0FBQzNCLGdCQUFHLEdBQUcsU0FBUyx3QkFBd0IsSUFBSSxFQUFFLEdBQUU7QUFDN0MscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUNBLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
