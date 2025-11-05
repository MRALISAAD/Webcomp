import { Fragment } from "react";

export function isFragment(node) {
  return Boolean(node && node.type === Fragment);
}

export default {
  isFragment,
};
