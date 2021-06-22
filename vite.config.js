export default {
  esbuild: {
    jsxFactory: "NotReact.createElement",
    // jsxFragment: "Fragment",
    jsxInject: `import { NotReact } from "./notReact";`,
  },
};
