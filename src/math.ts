import { Inverse, ToNumber } from "./utlis";

type Abs<A extends number> = `${A}` extends `-${infer U extends number}`
  ? U
  : A;

export type IsPositive<A extends number> = A extends Abs<A> ? true : false;
export type IsNegative<A extends number> = Inverse<IsPositive<A>>;

export type Negate<A extends number> = A extends 0
  ? 0
  : IsPositive<A> extends true
  ? ToNumber<`-${A}`>
  : Abs<A>;

export type Increment<
  A extends number,
  Acc extends number[] = []
> = IsPositive<A> extends true
  ? Acc["length"] extends A
    ? [...Acc, 1]["length"]
    : Increment<A, [...Acc, 1]>
  : [...Acc, 1]["length"] extends Abs<A>
  ? Negate<Acc["length"]>
  : Increment<A, [...Acc, 1]>;

export type Decrement<A extends number, Acc extends number[] = []> = A extends 0
  ? -1
  : IsPositive<A> extends true
  ? [...Acc, 1]["length"] extends A
    ? Acc["length"]
    : Decrement<A, [...Acc, 1]>
  : Acc["length"] extends Abs<A>
  ? Negate<[...Acc, 1]["length"] & number>
  : Decrement<A, [...Acc, 1]>;

export type Plus<
  A extends number,
  B extends number,
  Acc extends number[] = []
> = Acc["length"] extends Abs<B>
  ? A
  : IsPositive<B> extends true
  ? Plus<Increment<A>, B, [...Acc, 1]>
  : Plus<Decrement<A>, B, [...Acc, 1]>;

export type Double<A extends number> = Plus<A, A>;

export type Minus<A extends number, B extends number> = Plus<A, Negate<B>>;

export type IsLess<A extends number, B extends number> = IsNegative<
  Minus<A, B>
>;
export type IsMore<A extends number, B extends number> = IsPositive<
  Minus<A, B>
>;

// @todo - too slow, optimize (possible?)
export type Multiple<
  A extends number,
  B extends number,
  Acc extends number[] = [],
  Actual extends number = A
> = [...Acc, 1]["length"] extends Abs<B>
  ? IsNegative<B> extends true
    ? Negate<A>
    : A
  : Multiple<Plus<A, Actual>, B, [...Acc, 1], Actual>;
