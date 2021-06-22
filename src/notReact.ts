/**
 * This stuff is based on https://pomb.us/build-your-own-react/
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      p: any;
      img: any;
      h1: any;
      h2: any;
    }
  }
}

export function createElement(type: any, props: any, ...children: any) {
  console.log("calling createElement");
  console.log(`type: ${type}`);
  return {
    type,
    props: {
      ...props,
      children: children.map((child: any) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text: string) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element: any, container: any) {
  console.log(element);
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  const isProperty = (key: any) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child: any) => render(child, dom));
  container.appendChild(dom);
}

export const NotReact = {
  createElement,
  render,
};
