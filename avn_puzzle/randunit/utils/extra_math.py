#!/usr/bin/env python3
import math
import sympy
import functools
import fractions


def tridegree(value):
    return math.radians(value)


def percent(value, **kwargs):
    value = Eval(f"({value})/100")
    if kwargs.get("fraction"):
        return fractions.Fraction(str(value))


def FractionSlash(p, q):
    return fractions.Fraction(p, q)


cosec = csc = lambda x: 1 / sympy.sin(x)
# def cosec(value, **kwargs):
#     return 1 / sympy.sin(value)
sec = lambda x: 1 / sympy.cos(x)
cot = lambda x: 1 / sympy.tan(x)


def gcds(*args, **kwargs):
    return functools.reduce(sympy.gcd, args)


def lcms(*args, **kwargs):
    return functools.reduce(sympy.lcm, args)


FixUnit = integer = lambda x: x
