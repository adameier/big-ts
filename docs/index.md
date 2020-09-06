---
title: Introduction
permalink: /
nav_order: 1
has_children: false
has_toc: false
---

# Immutable arbitrary-precision arithmetic in TypeScript

`big-ts` is a port of the [big.js](https://mikemcl.github.io/big.js/) library, written in TypeScript using immutable and functional principles. 

**Disclaimer**. The majority of differences from `big.js` are present to ensure immutability and to follow functional principles, and all the logic for arbitrary-precision arithmetic is the same. The majority of test cases from `big.js` have been replicated to ensure correctness.

## fp-ts

`big-ts` has partly been written to work with the [`fp-ts`](https://gcanti.github.io/fp-ts/) ecosystem, and exports [`Ord`](https://gcanti.github.io/fp-ts/modules/Ord.ts.html), [`Semigroup`](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html), and [`Monoid`](https://gcanti.github.io/fp-ts/modules/Monoid.ts.html) instances (the latter two might not always be of use to you). Comparing of `Big` values should be done using `Ord`.

`big-ts` lists `fp-ts` as a peer dependency, so installation of it is left up to the user.

## Currying

Most of the exported functions in `big-ts` have been written to take advantage of currying. Other functions that aren't appropriately curried at the moment are likely to change. It is advised to make use of the [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#pipe) function from `fp-ts` or similar, such as [Ramda](https://ramdajs.com) `pipe` or [Lodash](https://lodash.com/) `flow`.
