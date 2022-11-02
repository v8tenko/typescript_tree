import { Split, Sum } from "./utlis";

type Node = {
  left: Node | null;
  right: Node | null;
  value: number;
  length: number;
};

export type BuildTree<Array extends number[]> = Array["length"] extends 1
  ? { left: null; right: null; value: Array[0]; length: 1 }
  : {
      left: BuildTree<Split<Array>["left"]>;
      right: BuildTree<Split<Array>["right"]>;
      value: Sum<Array>;
      length: Array["length"];
    };
