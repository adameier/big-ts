/**
 * @since 0.1.0
 */
import { fromCompare, Ord } from 'fp-ts/lib/Ord'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Monoid } from 'fp-ts/lib/Monoid'

/**
 * @category model
 * @since 0.1.0
 */
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

/**
 * @category model
 * @since 0.1.0
 */
export type Sign = -1 | 1

/**
 * @category model
 * @since 0.1.0
 */
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/**
 * @category model
 * @since 0.1.0
 */
export enum RoundingMode {
  /**
   * Rounds towards zero, i.e. truncate.
   */
  Down = 0,
  /**
   * Rounds towards nearest neighbour. Rounds away from zero if equidistant.
   */
  HalfUp = 1,
  /**
   * Rounds towards nearest neighbour. Rounds towards even neighbour if equidistant.
   */
  HalfEven = 2,
  /**
   * Rounds away from zero.
   */
  Up = 3
}

/**
 * @category model
 * @since 0.1.0
 */
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

/**
 * @category model
 * @since 0.1.0
 */
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

/**
 * @category constructors
 * @since 0.1.0
 */
export function parse(n: number | string): Big {
  let ns: string
  if (n === 0 && 1 / n < 0) ns = '-0'
  else {
    ns = n + ''
    if (!/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i.test(ns)) throw Error('Invalid number')
  }

  // Determine sign.
  const xs: Sign = ns.charAt(0) == '-' ? ((ns = ns.slice(1)), -1) : 1

  // Decimal point?
  let e1 = ns.indexOf('.')
  if (e1 > -1) ns = ns.replace('.', '')

  // Exponential form?
  let i = ns.search(/e/i)
  if (i > 0) {
    // Determine exponent.
    if (e1 < 0) e1 = i
    e1 += +ns.slice(i + 1)
    ns = ns.substring(0, i)
  } else if (e1 < 0) {
    // Integer.
    e1 = ns.length
  }

  let nl = ns.length

  // Determine leading zeros.
  for (i = 0; i < nl && ns.charAt(i) == '0'; ) ++i

  let xc: Digit[]
  let xe: number

  if (i == nl) {
    // Zero.
    xc = [0]
    xe = 0
  } else {
    // Determine trailing zeros.
    for (; nl > 0 && ns.charAt(--nl) == '0'; );
    xe = e1 - i - 1
    xc = []

    // Convert string to array of digits without leading/trailing zeros.
    for (e1 = 0; i <= nl; ) xc[e1++] = +ns.charAt(i++) as Digit
  }

  return {
    _tag: 'Big',
    c: xc,
    e: xe,
    s: xs
  }
}

/**
 * @category constructors
 * @since 0.1.0
 */
export function copy(x: Big): Big {
  return {
    _tag: 'Big',
    c: [...x.c],
    e: x.e,
    s: x.s
  }
}

const DEFAULT_RM: RoundingMode = 1

const DEFAULT_DP = 20

const MAX_DP = 1e6

const MAX_POWER = 1e6

const NE = -7

const PE = 21

/**
 * Compare the value of two Bigs, returning 1 if x is greater than y, -1 if x is less than y, and 0 if equal.
 *
 * @category utils
 * @since 0.1.0
 */
export function cmp(x: Big, y: Big): -1 | 0 | 1 {
  // Either zero?
  if (!x.c[0] || !y.c[0]) return !x.c[0] ? (!y.c[0] ? 0 : (-y.s as Sign)) : x.s

  // Signs differ?
  if (x.s != y.s) return x.s

  const isneg = x.s < 0

  // Compare exponents.
  if (x.e != y.e) return x.e > y.e !== isneg ? 1 : -1

  const k = x.c.length,
    l = y.c.length

  const j = k < l ? k : l

  // Compare digit by digit.
  for (let i = -1; ++i < j; ) {
    if (x.c[i] != y.c[i]) return x.c[i] > y.c[i] !== isneg ? 1 : -1
  }

  // Compare lengths.
  return k == l ? 0 : k > l !== isneg ? 1 : -1
}

/**
 * @internal
 */
function _round(dp: number, rm: RoundingMode = 1, more = false): (x: Big) => Big {
  return (x) => {
    const c = [...x.c]
    let i = x.e + dp + 1

    let e = x.e
    if (i < c.length) {
      if (rm === 1) {
        more = c[i] >= 5
      } else if (rm === 2) {
        more =
          c[i] > 5 ||
          (c[i] == 5 && (more || i < 0 || c[i + 1] !== undefined || Boolean(c[i - 1] & 1)))
      } else if (rm === 3) {
        more = more || !!c[0]
      } else {
        more = false
      }

      if (i < 1) {
        c.length = 1

        if (more) {
          // 1, 0.1, 0.01, 0.001, 0.0001 etc.
          e = -dp
          c[0] = 1
        } else {
          // Zero.
          c[0] = e = 0
        }
      } else {
        // Remove any digits after the required decimal places.
        c.length = i--

        // Round up?
        if (more) {
          // Rounding up may mean the previous digit has to be rounded up.
          for (; ++c[i] > 9; ) {
            c[i] = 0
            if (!i--) {
              ++e
              c.unshift(1)
            }
          }
        }

        // Remove trailing zeros.
        for (i = c.length; !c[--i]; ) c.pop()
      }
    }

    return {
      _tag: 'Big',
      c,
      e,
      s: x.s
    }
  }
}

/**
 * Round the value of a Big using the provided `RoundingOptions` and returns the result as a Big.
 *
 * @category combinators
 * @since 0.1.0
 */
export function round(ro: RoundingOptions): (x: Big) => Big {
  return _round(ro.dp, ro.rm)
}

/**
 * Return the absolute value of a Big as a new Big.
 *
 * @category combinators
 * @since 0.1.0
 */
export function abs(x: Big): Big {
  return {
    _tag: 'Big',
    c: [...x.c],
    e: x.e,
    s: 1
  }
}

/**
 * Divide one Big's value by another's and return the result as a Big.
 *
 * @category combinators
 * @since 0.1.0
 */
export function div(y: Big, ro: Partial<RoundingOptions> = {}): (x: Big) => Big {
  return (x) => {
    const a = [...x.c], // dividend
      b = [...y.c], // divisor
      k: Sign = x.s == y.s ? 1 : -1,
      rm = ro.rm ?? DEFAULT_RM,
      dp = ro.dp ?? DEFAULT_DP
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error('Invalid dp value.')

    // Divisor is zero?
    if (!b[0]) throw Error('Division by zero')

    // Dividend is 0? Return +-0.
    if (!a[0]) return parse(k * 0)

    let bt: Digit[],
      n: Digit,
      cmp: number | undefined = undefined,
      ri: number,
      ai = b.length,
      r = a.slice(0, b.length), // remainder
      rl = r.length,
      qi = 0,
      qe = x.e - y.e

    const bl = b.length,
      bz = b.slice(),
      al = a.length,
      qc: Digit[] = [],
      d = dp + qe + 1, // number of digits of the result
      qs = k

    let d1 = d < 0 ? 0 : d

    // Create version of divisor with leading zero.
    bz.unshift(0)

    // Add zeros to make remainder as long as divisor.
    for (; rl++ < bl; ) r.push(0)

    do {
      // n is how many times the divisor goes into current remainder.
      for (n = 0; n < 10; n++) {
        // Compare divisor and remainder.
        if (bl != (rl = r.length)) {
          cmp = bl > rl ? 1 : -1
        } else {
          for (ri = -1, cmp = 0; ++ri < bl; ) {
            if (b[ri] != r[ri]) {
              cmp = b[ri] > r[ri] ? 1 : -1
              break
            }
          }
        }

        // If divisor < remainder, subtract divisor from remainder.
        if (cmp < 0) {
          // Remainder can't be more than 1 digit longer than divisor.
          // Equalise lengths using divisor with extra leading zero?
          for (bt = rl == bl ? b : bz; rl; ) {
            if (r[--rl] < bt[rl]) {
              ri = rl
              for (; ri && !r[--ri]; ) r[ri] = 9
              --r[ri]
              r[rl] += 10
            }
            r[rl] -= bt[rl]
          }

          for (; !r[0]; ) r.shift()
        } else {
          break
        }
      }

      // Add the digit n to the result array.
      qc[qi++] = (cmp ? n : ++n) as Digit

      // Update the remainder.
      if (r[0] && cmp) r[rl] = a[ai] || 0
      else r = [a[ai]]
    } while ((ai++ < al || r[0] !== undefined) && d1--)

    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {
      // There can't be more than one zero.
      qc.shift()
      qe--
    }

    const q: Big = {
      _tag: 'Big',
      c: qc,
      e: qe,
      s: qs
    }

    // Round?
    if (qi > d) return _round(dp, rm, r[0] !== undefined)(q)

    return q
  }
}

/**
 * Add one Big with another and return the result as a Big
 *
 * @category combinators
 * @since 0.1.0
 */
export function add(y: Big): (x: Big) => Big {
  return (x) => {
    let t: Digit[],
      a: number = x.s,
      b: number = y.s

    // Signs differ?
    if (a != b) {
      return sub({ ...y, s: -y.s as Sign })(x)
    }

    const xe = x.e

    let xc = [...x.c],
      ye = y.e,
      yc = [...y.c]

    // Either zero? y is non-zero? x is non-zero? Or both are zero.
    if (!xc[0] || !yc[0]) return yc[0] ? copy(y) : xc[0] ? copy(x) : parse(a * 0)

    // Prepend zeros to equalise exponents.
    // Note: reverse faster than unshifts.
    if ((a = xe - ye)) {
      if (a > 0) {
        ye = xe
        t = yc
      } else {
        a = -a
        t = xc
      }

      t.reverse()
      for (; a--; ) t.push(0)
      t.reverse()
    }

    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
      t = yc
      yc = xc
      xc = t
    }

    a = yc.length

    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
    for (b = 0; a; xc[a] %= 10) b = ((xc[--a] = (xc[a] + yc[a] + b) as Digit) / 10) | 0

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0

    if (b) {
      xc.unshift(b as Digit)
      ++ye
    }

    // Remove trailing zeros.
    for (a = xc.length; xc[--a] === 0; ) xc.pop()

    return {
      _tag: 'Big',
      c: xc,
      e: ye,
      s: y.s
    }
  }
}

/**
 * Subtract one Big from another and return the result as a Big.
 *
 * @category combinators
 * @since 0.1.0
 */
export function sub(y: Big): (x: Big) => Big {
  return (x) => {
    let t: Digit[],
      a: number = x.s,
      b: number = y.s
    // Signs differ?
    if (a != b) {
      return add({ ...y, s: -y.s as Sign })(x)
    }

    let xc = [...x.c],
      yc = [...y.c],
      zs = y.s,
      ze = y.e

    const xe = x.e

    // Either zero?
    if (!xc[0] || !yc[0]) {
      // y is non-zero? x is non-zero? Or both are zero.
      return yc[0] ? { _tag: 'Big', c: yc, e: y.e, s: -b as Sign } : xc[0] ? copy(x) : constZero()
    }

    let xlty = false
    // Determine which is the bigger number. Prepend zeros to equalise exponents.
    if ((a = xe - ze)) {
      xlty = a < 0
      if (xlty) {
        a = -a
        t = xc
      } else {
        ze = xe
        t = yc
      }

      t.reverse()
      for (b = a; b--; ) t.push(0)
      t.reverse()
    } else {
      xlty = xc.length < yc.length
      // Exponents equal. Check digit by digit.
      const xyl = (xlty ? xc : yc).length

      for (a = b = 0; b < xyl; b++) {
        if (xc[b] != yc[b]) {
          xlty = xc[b] < yc[b]
          break
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xlty) {
      t = xc
      xc = yc
      yc = t
      zs = -y.s as Sign
    }

    let i = xc.length,
      j = yc.length
    /*
     * Append zeros to xc if shorter. No need to add zeros to zc if shorter as subtraction only
     * needs to start at zc.length.
     */
    if ((b = j - i) > 0) for (; b--; ) xc[i++] = 0

    // Subtract zc from xc.
    for (b = i; j > a; ) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; ) xc[i] = 9
        --xc[i]
        xc[j] += 10
      }

      xc[j] -= yc[j]
    }

    // Remove trailing zeros.
    for (; xc[--b] === 0; ) xc.pop()

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] === 0; ) {
      xc.shift()
      --ze
    }

    if (!xc[0]) {
      // n - n = +0
      zs = 1

      // Result must be zero.
      xc = [(ze = 0)]
    }

    return {
      _tag: 'Big',
      c: xc,
      e: ze,
      s: zs
    }
  }
}

/**
 * Multiply one Big's value by another's and return the result as a Big.
 *
 * @category combinators
 * @since 0.1.0
 */
export function mult(y: Big): (x: Big) => Big {
  return (x) => {
    let c: Digit[],
      xc = [...x.c],
      zc = [...y.c],
      a = xc.length,
      b = zc.length,
      i = x.e,
      j = y.e

    // Determine sign of result.
    const zs: Sign = x.s == y.s ? 1 : -1

    // Return signed 0 if either 0.
    if (!xc[0] || !zc[0]) return parse(zs * 0)

    // Initialise exponent of result as x.e + y.e.
    let ze = i + j

    // If array xc has fewer digits than zc, swap xc and zc, and lengths.
    if (a < b) {
      c = xc
      xc = zc
      zc = c
      j = a
      a = b
      b = j
    }

    // Initialise coefficient array of result with zeros.
    for (c = new Array((j = a + b)); j--; ) c[j] = 0

    // Multiply.

    // i is initially xc.length.
    for (i = b; i--; ) {
      b = 0

      // a is yc.length.
      for (j = a + i; j > i; ) {
        // Current sum of products at this digit position, plus carry.
        b = c[j] + zc[i] * xc[j - i - 1] + b
        c[j--] = (b % 10) as Digit

        // carry
        b = (b / 10) | 0
      }

      c[j] = b as Digit
    }

    // Increment result exponent if there is a final carry, otherwise remove leading zero.
    if (b) ++ze
    else c.shift()

    // Remove trailing zeros.
    for (i = c.length; !c[--i]; ) c.pop()
    zc = c

    return {
      _tag: 'Big',
      c: zc,
      e: ze,
      s: zs
    }
  }
}

/**
 * Return one Big's value modulo the value of another Big as a Big.
 *
 * @category combinators
 * @since 0.1.0
 */
export function mod(y: Big): (x: Big) => Big {
  return (x) => {
    if (!y.c[0]) throw Error('Division by zero.')

    if (cmp({ ...y, s: 1 }, { ...x, s: 1 }) == 1) return copy(x)

    const z = div(y, { dp: 0, rm: 0 })(x)
    return sub(mult(y)(z))(x)
  }
}

/**
 * Return the value of a Big raised to the power n as a Big.
 *
 * If n is negative, round using provided `RoundingOptions`.
 *
 * @category combinators
 * @since 0.1.0
 */
export function pow(n: number, ro: Partial<RoundingOptions> = {}): (x: Big) => Big {
  return (x) => {
    const one = constOne(),
      isneg = n < 0
    let y = one,
      z = x

    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) throw Error('Invalid exponent.')
    if (isneg) n = -n

    for (;;) {
      if (n & 1) y = mult(z)(y)
      n >>= 1
      if (!n) break
      z = mult(z)(z)
    }

    return isneg ? div(y, ro)(one) : y
  }
}

/**
 * Return the square root of a Big's value as a Big, rounding using provided `RoundingOptions`.
 *
 * @category combinators
 * @since 0.1.0
 */
export function sqrt(ro: Partial<RoundingOptions> = {}): (x: Big) => Big {
  return (x) => {
    let r: Big,
      c: string,
      t: Big,
      e = x.e,
      dp = ro.dp ?? DEFAULT_DP
    const rm = ro.rm ?? DEFAULT_RM,
      half: Big = {
        _tag: 'Big',
        c: [5],
        e: -1,
        s: 1
      }

    // Zero?
    if (!x.c[0]) return x

    // Negative?
    if (x.s < 0) throw Error('No square root possible.')

    // Estimate.
    let s: number | string = Math.sqrt(Number(toString(x)))

    // Math.sqrt underflow/overflow?
    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
    if (s === 0 || s === 1 / 0) {
      c = x.c.join('')
      if (!((c.length + e) & 1)) c += '0'
      s = Math.sqrt(Number(c))
      e = (((e + 1) / 2) | 0) - ((e < 0 || e & 1) as number)
      r = parse((s == 1 / 0 ? '1e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e)
    } else {
      r = parse(s)
    }

    e = r.e + (dp += 4)

    // Newton-Raphson iteration.
    do {
      t = r
      r = mult(half)(add(t)(div(t, { dp, rm })(x)))
    } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''))

    return _round((dp -= 4), rm)(r)
  }
}

/**
 *
 * @internal
 */
interface StringifyOpts {
  ne: number
  pe: number
  rm: RoundingMode
}

/**
 * @internal
 */
function _stringify(
  x: Big,
  so: Partial<StringifyOpts> = {},
  id?: number,
  n?: number,
  k?: number
): string {
  const rm = so.rm ?? DEFAULT_RM,
    ne = so.ne ?? NE,
    pe = so.pe ?? PE,
    b = !x.c[0]

  let _x = x,
    _k = Number(k),
    zc: Digit[] = []

  if (n !== undefined) {
    if (n !== ~~n || (n == 0 && id == 3) || n > MAX_DP) {
      throw Error(id == 3 ? 'Invalid precision' : 'Invalid decimal places')
    }
    // The index of the digit that may be rounded up.
    const i = _k - x.e

    // Round?
    if (x.c.length > ++_k) _x = _round(i, rm)(_x)

    // toFixed: recalculate k as x.e may have changed if value rounded up.
    if (id == 2) _k = _x.e + i + 1

    zc = [..._x.c]
    // Append zeros?
    for (; zc.length < _k; ) zc.push(0)
  } else {
    zc = [...x.c]
  }

  let e = _x.e
  let s = zc.join('')
  const sl = s.length

  // Exponential notation?
  if (id != 2 && (id == 1 || (id == 3 && _k <= e) || e <= ne || e >= pe)) {
    s = s.charAt(0) + (sl > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e

    // Normal notation.
  } else if (e < 0) {
    for (; ++e; ) s = '0' + s
    s = '0.' + s
  } else if (e > 0) {
    if (++e > sl) for (e -= sl; e--; ) s += '0'
    else if (e < sl) s = s.slice(0, e) + '.' + s.slice(e)
  } else if (sl > 1) {
    s = s.charAt(0) + '.' + s.slice(1)
  }

  return _x.s < 0 && (!b || id == 4) ? '-' + s : s
}

/**
 * @category destructors
 * @since 0.1.0
 */
export function toString(x: Big): string {
  return _stringify(x)
}

/**
 * @category destructors
 * @since 0.1.0
 */
export function toExponential(ro: Partial<RoundingOptions>): (x: Big) => string {
  return (x) => {
    return _stringify(x, { rm: ro.rm }, 1, ro.dp, ro.dp)
  }
}

/**
 * @category destructors
 * @since 0.1.0
 */
export function toFixed(ro: Partial<RoundingOptions>): (x: Big) => string {
  return (x) => {
    return _stringify(x, { rm: ro.rm }, 2, ro.dp, ro.dp !== undefined ? x.e + ro.dp : undefined)
  }
}

/**
 * @category destructors
 * @since 0.1.0
 */
export function toPrecision(po: Partial<PrecisionOptions>): (x: Big) => string {
  return (x) => {
    return _stringify(x, { rm: po.rm }, 3, po.sd, po.sd ? po.sd - 1 : undefined)
  }
}

/**
 * @category destructors
 * @since 0.1.0
 */
export function valueOf(x: Big): string {
  return _stringify(x, {}, 4)
}

/**
 * @category instances
 * @since 0.1.0
 */
export const ordBig: Ord<Big> = fromCompare(cmp)

/**
 * Big semigroup under addition.
 *
 * @category instances
 * @since 0.1.0
 */
export const semigroupSum: Semigroup<Big> = {
  concat: (x, y) => add(x)(y)
}

/**
 * Big semigroup under multiplication.
 *
 * @category instances
 * @since 0.1.0
 */
export const semigroupProduct: Semigroup<Big> = {
  concat: (x, y) => mult(x)(y)
}

/**
 * @category utils
 * @since 0.1.0
 */
export const constZero: () => Big = () => ({
  _tag: 'Big',
  c: [0],
  e: 0,
  s: 1
})

/**
 * @category utils
 * @since 0.1.0
 */
export const constOne: () => Big = () => ({
  _tag: 'Big',
  c: [1],
  e: 0,
  s: 1
})

/**
 * Big monoid under addition.
 *
 * @category instances
 * @since 0.1.0
 */
export const monoidSum: Monoid<Big> = {
  concat: semigroupSum.concat,
  empty: constZero()
}

/**
 * Big monoid under multiplication.
 *
 * @category instances
 * @since 0.1.0
 */
export const monoidProduct: Monoid<Big> = {
  concat: semigroupProduct.concat,
  empty: constOne()
}
