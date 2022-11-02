import { BuildTree } from "./src/tree";
import { Equals } from "./src/utlis";

type Root = BuildTree<[1, 2, 3, 4, 5, 6]>;

type CheckResult = Equals<21, Root["value"]>;
type CheckLeftValue = Equals<6, Root["left"]["value"]>;
type CheckRightValue = Equals<15, Root["right"]["value"]>;
