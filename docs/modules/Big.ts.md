---
title: Big.ts
nav_order: 1
parent: Modules
---

## Big overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [abs](#abs)
  - [add](#add)
  - [div](#div)
  - [mod](#mod)
  - [mult](#mult)
  - [pow](#pow)
  - [round](#round)
  - [sqrt](#sqrt)
  - [sub](#sub)
- [constructors](#constructors)
  - [copy](#copy)
  - [parse](#parse)
- [destructors](#destructors)
  - [toExponential](#toexponential)
  - [toFixed](#tofixed)
  - [toPrecision](#toprecision)
  - [toString](#tostring)
  - [valueOf](#valueof)
- [instances](#instances)
  - [monoidProduct](#monoidproduct)
  - [monoidSum](#monoidsum)
  - [ordBig](#ordbig)
  - [semigroupProduct](#semigroupproduct)
  - [semigroupSum](#semigroupsum)
- [model](#model)
  - [Big (interface)](#big-interface)
  - [Digit (type alias)](#digit-type-alias)
  - [PrecisionOptions (interface)](#precisionoptions-interface)
  - [RoundingOptions (interface)](#roundingoptions-interface)
  - [Sign (type alias)](#sign-type-alias)
- [utils](#utils)
  - [cmp](#cmp)
  - [constOne](#constone)
  - [constZero](#constzero)

---

# combinators

## abs

Return the absolute value of a Big as a new Big.

**Signature**

```ts
export declare function abs(x: Big): Big
```

Added in v0.1.0

## add

Add one Big with another and return the result as a Big

**Signature**

```ts
export declare function add(y: Big): (x: Big) => Big
```

Added in v0.1.0

## div

Divide one Big's value by another's and return the result as a Big.

**Signature**

```ts
export declare function div(y: Big, ro: Partial<RoundingOptions> = {}): (x: Big) => Big
```

Added in v0.1.0

## mod

Return one Big's value modulo the value of another Big as a Big.

**Signature**

```ts
export declare function mod(y: Big): (x: Big) => Big
```

Added in v0.1.0

## mult

Multiply one Big's value by another's and return the result as a Big.

**Signature**

```ts
export declare function mult(y: Big): (x: Big) => Big
```

Added in v0.1.0

## pow

Return the value of a Big raised to the power n as a Big.

If n is negative, round using provided `RoundingOptions`.

**Signature**

```ts
export declare function pow(n: number, ro: Partial<RoundingOptions> = {}): (x: Big) => Big
```

Added in v0.1.0

## round

Round the value of a Big using the provided `RoundingOptions` and returns the result as a Big.

**Signature**

```ts
export declare function round(ro: RoundingOptions): (x: Big) => Big
```

Added in v0.1.0

## sqrt

Return the square root of a Big's value as a Big, rounding using provided `RoundingOptions`.

**Signature**

```ts
export declare function sqrt(ro: Partial<RoundingOptions> = {}): (x: Big) => Big
```

Added in v0.1.0

## sub

Subtract one Big from another and return the result as a Big.

**Signature**

```ts
export declare function sub(y: Big): (x: Big) => Big
```

Added in v0.1.0

# constructors

## copy

**Signature**

```ts
export declare function copy(x: Big): Big
```

Added in v0.1.0

## parse

**Signature**

```ts
export declare function parse(n: number | string): Big
```

Added in v0.1.0

# destructors

## toExponential

**Signature**

```ts
export declare function toExponential(ro: Partial<RoundingOptions>): (x: Big) => string
```

Added in v0.1.0

## toFixed

**Signature**

```ts
export declare function toFixed(ro: Partial<RoundingOptions>): (x: Big) => string
```

Added in v0.1.0

## toPrecision

**Signature**

```ts
export declare function toPrecision(po: Partial<PrecisionOptions>): (x: Big) => string
```

Added in v0.1.0

## toString

**Signature**

```ts
export declare function toString(x: Big): string
```

Added in v0.1.0

## valueOf

**Signature**

```ts
export declare function valueOf(x: Big): string
```

Added in v0.1.0

# instances

## monoidProduct

Big monoid under multiplication.

**Signature**

```ts
export declare const monoidProduct: Monoid<Big>
```

Added in v0.1.0

## monoidSum

Big monoid under addition.

**Signature**

```ts
export declare const monoidSum: Monoid<Big>
```

Added in v0.1.0

## ordBig

**Signature**

```ts
export declare const ordBig: Ord<Big>
```

Added in v0.1.0

## semigroupProduct

Big semigroup under multiplication.

**Signature**

```ts
export declare const semigroupProduct: Semigroup<Big>
```

Added in v0.1.0

## semigroupSum

Big semigroup under addition.

**Signature**

```ts
export declare const semigroupSum: Semigroup<Big>
```

Added in v0.1.0

# model

## Big (interface)

**Signature**

```ts
export interface Big {
  readonly _tag: 'Big'

  /**
   * The coefficient of the number when written in scientific notation as an array of digits.
   */
  readonly c: ReadonlyArray<Digit>

  /**
   * The exponent of the number when written in scientific notation.
   */
  readonly e: number

  /**
   * The sign of the number.
   */
  readonly s: Sign
}
```

Added in v0.1.0

## Digit (type alias)

**Signature**

```ts
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

Added in v0.1.0

## PrecisionOptions (interface)

**Signature**

```ts
export interface PrecisionOptions {
  /**
   * The rounding mode to use.
   */
  rm: RoundingMode
  /**
   * The number of significant digits.
   */
  sd: number
}
```

Added in v0.1.0

## RoundingOptions (interface)

**Signature**

```ts
export interface RoundingOptions {
  /**
   * The rounding mode to use.
   */
  rm: RoundingMode
  /**
   * The number of decimal places to round to.
   */
  dp: number
}
```

Added in v0.1.0

## Sign (type alias)

**Signature**

```ts
export type Sign = -1 | 1
```

Added in v0.1.0

# utils

## cmp

Compare the value of two Bigs, returning 1 if x is greater than y, -1 if x is less than y, and 0 if equal.

**Signature**

```ts
export declare function cmp(x: Big, y: Big): -1 | 0 | 1
```

Added in v0.1.0

## constOne

**Signature**

```ts
export declare const constOne: () => Big
```

Added in v0.1.0

## constZero

**Signature**

```ts
export declare const constZero: () => Big
```

Added in v0.1.0
