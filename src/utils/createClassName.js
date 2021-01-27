import { withNaming } from "@bem-react/classname";

const cn = withNaming({ n: "", e: "__", m: "_" });

export const createClassName = (block, element, modifier) => {
  if (element && modifier) {
    return cn(block, element)(modifier);
  } else if (!element && !modifier) {
    return cn(block)();
  } else if (element && !modifier) {
    return cn(block, element)();
  } else if (!element && modifier) {
    return cn(block)(modifier);
  }
};
