import { Double, IsMore, Plus } from "./math";

export type ToNumber<A extends string> = A extends `${infer U extends number}`
  ? U
  : never;

export type Inverse<A extends boolean> = A extends true ? false : true;

export type Equals<A, B> = A extends B ? (B extends A ? true : false) : false;
export type NotEquals<A, B> = Inverse<Equals<A, B>>;

type Prefix<
  T extends number,
  Acc extends number[] = []
> = Acc["length"] extends T ? Acc[number] : Prefix<T, [...Acc, Acc["length"]]>;

type Segment<A extends number, B extends number> = Exclude<
  Prefix<B>,
  Prefix<A>
>;

// We will use only with ok [l; r) queries
export type Take<
  Array extends number[],
  Start extends number,
  End extends number,
  Result extends number[] = [],
  Acc extends number[] = []
> = Acc["length"] extends End | Array["length"]
  ? Result
  : Acc["length"] extends Segment<Start, End>
  ? Take<Array, Start, End, [...Result, Array[Acc["length"]]], [...Acc, 1]>
  : Take<Array, Start, End, Result, [...Acc, 1]>;

export type Middle<Array extends number[], Acc extends number[] = []> = IsMore<
  Double<Acc["length"]>,
  Array["length"]
> extends true
  ? Acc["length"]
  : Middle<Array, [...Acc, 1]>;

export type Split<
  Array extends number[],
  Length extends number = Middle<Array>
> = {
  left: Take<Array, 0, Length>;
  right: Take<Array, Length, Array["length"]>;
};

export type Sum<
  Array extends number[],
  Acc extends number[] = [],
  Result extends number = 0
> = Acc["length"] extends Array["length"]
  ? Result
  : Sum<Array, [...Acc, 1], Plus<Result, Array[Acc["length"]]>>;
