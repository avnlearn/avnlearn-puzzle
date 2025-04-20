#!/usr/bin/env python3
from __future__ import division
import copy
import sys
import random
import math
import decimal
from string import Template
import re as py_re
from sympy import *
from avn_puzzle.randunit import RandUnit
from avn_puzzle.randunit.utils import (
    Eval,
    TeX,
    # Sympy,
    # Operator_type,
    to_ast,
    NumberName,
    precedence_arithmetic,
)


class RandOperation:
    def __init__(self, number=None, *args, **kwargs):
        self.number = number
        if args:
            self.args = args
        if kwargs:
            self.__dict__.update(kwargs)

        if number is not None and self.expression is None:
            self.number = self.RandUnit(number)
            self.expression = []
            self.expression.append(self.number)
        elif number is None and isinstance(self.expression, list) and self.expression:
            self.number = str(self)

    def __getattr__(self, key):
        if isinstance(key, str):
            return self.__dict__.get(key)
        elif isinstance(key, int):
            if len(self.__dict__["args"]) > 0:
                return self.__dict__["args"][key]
        else:
            raise AttributeError(f"can't get {key}")

    def __setattr__(self, key, item):
        self.__dict__[f"{key}"] = item

    def __iter__(self):
        return iter(self.expression) if isinstance(self.expression, list) else []

    def __setitem__(self, key, value):
        if not isinstance(key, int):
            raise Exception(f"{Key} is not int")
        if not isinstance(self.expression, list):
            self.expression = []
        self.expression[key] = value

    def __getitem__(self, key):
        if not isinstance(key, int):
            raise Exception(f"{Key} is not int")
        if isinstance(self.expression, list):
            return self.expression[key]

    def __len__(self):
        return len(self.expression) if isinstance(self.expression, list) else 0

    def __repr__(self):
        expr = str(self)
        return TeX(expr).__str__() if expr else ""

    def __str__(self):
        if isinstance(self.expression, list):
            match Eval(self.expression, floordiv=False, sympy=True).eval():
                case float() as num:
                    return str(decimal.Decimal(str(num)))
            return str(Eval(self.expression, floordiv=False, sympy=True))
        return ""

    def eval(self):
        number = str(self) if self.number else None
        return Eval(number).eval() if number else number

    def TeX(self):
        number = self.eval()
        if number:
            return TeX(number)

    def Sympy(
        self, number=None, transformations=None, evaluate=True, skip=True, **kwargs
    ):
        number = str(self) if number == None else number

        if number == None:
            return
        # number = Eval(number).eval()
        number = Sympy(number, transformations, evaluate, **kwargs)
        match number:
            case Float() | float():
                return float(decimal.Decimal(f"{number}"))
            case _:
                return number

    def RandUnit(self, num):
        match num:
            case dict():
                number = RandUnit(**num)
            case self.__class__():
                number = self.RandUnit(num.number)
            case _:
                number = RandUnit(number=str(num))
        return number

    # def Sympy(self, expression):
    def Marge(self, x, operator, y, reflected=False):
        if not isinstance(y, list):
            y = [y]

        if reflected:
            expression = y + [operator] + x
        else:
            expression = x + [operator] + y

        return expression

    def BODMAS_Rule(self, y, operator, reflected=False, **kwargs):
        y_operator = None
        if isinstance(y, self.__class__):
            if y.expression:
                y = y.expression
                return self.BODMAS_Rule(y, operator, reflected, **kwargs)
        elif isinstance(y, list):
            if len(y) == 1 and isinstance(y[0], RandUnit):
                return self.BODMAS_Rule(y[0], operator, reflected, **kwargs)
            elif len(y) > 1 and reflected:
                y_operator = str(y[2])
            elif len(y) > 1:
                y_operator = str(y[-2])
        elif isinstance(y, RandUnit):
            y_operator = Operator_type(y)
        elif isinstance(y, (str, int, float, complex, Basic)):
            y = self.RandUnit(y)
            y_operator = Operator_type(y)

        x_operator = None
        x_roperation = self.__dict__.copy()

        x = x_roperation.get("expression")
        if "expresssion" in x_roperation:
            del x_roperation["expression"]
        if isinstance(x, list):
            if len(x) == 1:
                x_operator = Operator_type(x[0])
            elif len(x) > 1 and reflected:
                x_operator = str(x[1])
            elif len(x) > 1:
                x_operator = str(x[-2])

        _operator = self.RandUnit({"unit": operator})
        expression = []
        match str(_operator):
            # (+,-, *, /) | ** | (+,-, *, /)
            case "**" if x_operator in ("+", "-", "*", "/") and y_operator in (
                "+",
                "-",
                "*",
                "/",
            ):
                expression = self.Marge([x], _operator, [y], reflected)
            # (+,-, *, /, **) | ** | (None, **)
            case "**" if x_operator in ("+", "-", "*", "/", "**") and y_operator in (
                None,
                "**",
            ):
                expression = self.Marge([x], _operator, y, reflected)
            # (None) | ** | (+, -, *, /)
            case "**" if x_operator == None and y_operator in ("+", "-", "*", "/"):
                expression = self.Marge(x, _operator, [y], reflected)
            # (+,-, *) | / | (None, /, **)
            case "/" if x_operator in ("+", "-", "*") and y_operator in (
                None,
                "/",
                "**",
            ):
                expression = self.Marge([x], _operator, y, reflected)
            # (None, /, ** ) | / | (+, -, *)
            case "/" if x_operator in (None, "/", "**") and y_operator in (
                "+",
                "-",
                "*",
            ):
                expression = self.Marge(x, _operator, [y], reflected)
            # (+,-) | * | (None, *, /, **)
            case "*" if x_operator in ("+", "-") and y_operator in (
                None,
                "*",
                "/",
                "**",
            ):
                expression = self.Marge([x], _operator, y, reflected)
            # (None, *, /, **) | * | (+, -)
            case "*" if x_operator in (None, "*", "/", "**") and y_operator in (
                "+",
                "-",
            ):
                expression = self.Marge(x, _operator, [y], reflected)
            # (+,-, *) | (/, **) | (+,-, *)
            case "/" | "**" if x_operator in ("+", "-", "*") and y_operator in (
                "+",
                "-",
                "*",
            ):
                expression = self.Marge([x], _operator, [y], reflected)
            # (None, +, -, *, /, **) | (+, -) | (None, +, -, *, /, **)
            case "+" | "-" if x_operator in (
                None,
                "+",
                "-",
                "*",
                "**",
            ) and y_operator in (None, "+", "-", "*", "**"):
                expression = self.Marge(x, _operator, y, reflected)
            # (+,-) | (*, /, **) | (+,-)
            case "*" | "/" | "**" if x_operator in ("+", "-") and y_operator in (
                "+",
                "-",
            ):
                expression = self.Marge([x], _operator, [y], reflected)
            case _:
                expression = self.Marge(x, _operator, y, reflected)

        x_roperation.update({"expression": expression})
        return self.__class__(**x_roperation)

    def Operation(self, y, operator, reflected=False, **kwargs):

        match operator:
            case "<<" if reflected:
                return self.__rlshift__(y)
            case "<<":
                return self.__lshift__(y)
            case ">>":
                return self.__rshift__(y)

        match y:
            case self.__class__():
                y = y.expression
            case _:
                y = self.RandUnit(y)
                

        if self.bodmas_rule == True:
            return self.BODMAS_Rule(y, operator, reflected, **kwargs)

        x_randoperation = self.__dict__.copy()
        _operator = self.RandUnit({"unit": operator})

        x = x_randoperation.get("expression", [])

        if kwargs.get("bracket"):
            if isinstance(x, list):
                if len(x) == 1 and isinstance(x[0], RandUnit):
                    if precedence_arithmetic(x[0]) not in (0, -1):
                        match Operator_type(x[0]):
                            case "+" | "-" | "*" | "**":
                                x = [x]
                else:
                    x = [x]

            if isinstance(y, list):

                if len(y) == 1 and isinstance(y[0], RandUnit):
                    if precedence_arithmetic(y[0]) not in (0, -1):
                        match Operator_type(y[0]):
                            case "+" | "-" | "*" | "**":
                                y = [y]
                else:
                    y = [y]
            else:
                match Operator_type(y):
                    case "+" | "-" | "*" | "**" if precedence_arithmetic(y) not in (
                        0,
                        -1,
                    ):
                        y = [[y]]
                    case _:
                        y = [y]

        x_randoperation["expression"] = self.Marge(x, _operator, y, reflected)

        return self.__class__(**x_randoperation)

    def ROperation(self, y, operator, reflected=False, **kwargs):

        operator_lst = {
            "as": ["+", "-"],
            "mas": ["+", "-", "*"],
            "das": ["+", "-", "<<"],
            "oas": ["+", "-", "^"],
            "omas": ["+", "-", "*", "^"],
            "odas": ["+", "-", "<<", "^"],
            "odmas": ["+", "-", "*", "/", "^"],
            "bodmas": ["+", "-", "*", "/", "^"],
            "s": ["+", "-", "*"],
            "m": ["+", "-", "*", "/"],
            "b": ["+", "-", "*", "/", "**"],
            "all": ["+", "-", "*", "/", "**", "&", "|", "@", "//", "^", ">>", "<<"],
        }
        if isinstance(operator, str):
            if operator in operator_lst:
                operator = operator_lst.get(operator)
            elif operator not in operator_lst["all"]:
                operator = operator_lst["all"]

        if isinstance(operator, list):
            operator = random.choice(operator)

        bracket = False
        if operator in ("&", "|", "@", "//", "^"):
            bracket = True

        if isinstance(y, list):
            y = random.choice(y)

        if reflected == None:
            reflected = random.choice([True, False])

        if operator in operator_lst["all"]:
            return self.Operation(y, operator, reflected, bracket=bracket, **kwargs)

    def __int__(self):
        return int(self.Sympy()) if len(self) else 0

    def __float__(self):
        return float(self.Sympy()) if len(self) else 0

    def __add__(self, x):
        """
        Addition (+)
        ============
        x = x + 2
        """
        return self.ROperation(x, "+")

    def __iadd__(self, x):
        """
        Addition (+)
        ============
        x += 2
        """
        return self.__add__(x)

    def __radd__(self, x):
        """
        Addition (+)
        ============
        x = 2 + x
        """
        return self.ROperation(x, "+", True)

    def __and__(self, x):
        """
        Addition (&)
        ============
        x = x & 2
        """
        return self.ROperation(x, "&")

    def __iand__(self, x):
        """
        Addition (&)
        ============
        x &= 2
        """
        return self.__and__(x)

    def __rand__(self, x):
        """
        Addition (&)
        ============
        x = 2 & x
        """
        return self.ROperation(x, "&", True)

    def __sub__(self, x):
        """
        Subtraction (-)
        ===============
        x = x - 2
        """
        return self.ROperation(x, "-")

    def __isub__(self, x):
        """
        Subtraction (-)
        ===============
        x -=  2
        """
        return self.__sub__(x)

    def __rsub__(self, x):
        """
        Subtraction (-)
        ==============
        x = 2 - x
        """
        return self.ROperation(x, "-", True)

    def __or__(self, x):
        """
        Subtraction (|)
        ===============
        x = x | 2
        """
        return self.ROperation(x, "|")

    def __ior__(self, x):
        """
        Subtraction (|)
        ===============
        x |= 2
        """
        return self.__or__(x)

    def __ror__(self, x):
        """
        Subtraction (|)
        ===============
        x = 2 | x
        """
        return self.ROperation(x, "|", True)

    def __mul__(self, x):
        """
        Multiplication (*)
        ==================
        x = x * 2
        """
        return self.ROperation(x, "*")

    def __imul__(self, x):
        """
        Multiplication (*)
        ==================
        x *=  2
        """
        return self.__mul__(x)

    def __rmul__(self, x):
        """
        Multiplication (*)
        ==================
        x = 2 * x
        """
        return self.ROperation(x, "*", True)

    def __matmul__(self, x):
        """
        Multiplication (@)
        ==================
        x = x @ 2
        """
        return self.ROperation(x, "@")

    def __imatmul__(self, x):
        """
        Multiplication (@)
        ==================
        x @= 2
        """
        return self.__lshift__(x)

    def __rmatmul__(self, x):
        """
        Multiplication (@)
        ==================
        x = 2 @ x
        """
        return self.ROperation(x, "@", True)

    def __truediv__(self, x):
        """
        Division (/)
        ============
        x = x / 2
        """
        return self.ROperation(x, "/")

    def __itruediv__(self, x):
        """
        Division (/)
        ============
        x /=  2
        """
        return self.__truediv__(x)

    def __rtruediv__(self, x):
        """
        Division (/)
        ============
        x = 2 / x
        """
        return self.ROperation(x, "/", True)

    def __floordiv__(self, x):
        """
        Division (//)
        ============
        x = x // 2
        """
        return self.ROperation(x, "//")

    def __ifloordiv__(self, x):
        """
        Division (//)
        ============
        x //= 2
        """
        return self.__floordiv__(x)

    def __rfloordiv__(self, x):
        """
        Division (//)
        ============
        x = 2 // x
        """
        return self.ROperation(x, "//", True)

    def LShift(self, x, k=-1, mul=True):
        if len(self) == 1:
            if isinstance(self[0], RandUnit) and self[0] % x != 0:
                self[0] = self[0] @ x
        else:
            match str(self[k - 1]):
                case "+" | "-" | "*" if isinstance(self[k], RandUnit) and mul:
                    if self.BODMAS_Rule:
                        if self.Sympy() % self.Sympy(x) != 0:
                            return self.__rmul__(x)
                    else:
                        self[k] = self[k] @ x
                case "+" | "-" | "*" | "/" if isinstance(self[k], list):
                    return self.__rmul__(x)
                case "/" if isinstance(self[k], RandUnit):
                    try:
                        if self[k - 3] != "/":
                            self[k - 2] = self[k - 2] * x
                        else:
                            self.LShift(x, k - 2, False)
                    except IndexError:
                        if isinstance(self[k - 2], list):
                            if self.Sympy() % self.Sympy(x) != 0:
                                self[k - 2] = [
                                    self[k - 2],
                                    self.RandNumber(unit="\\times"),
                                    x,
                                ]
                        else:
                            self[k - 2] = self[k - 2] * x
        return False

    def __lshift__(self, x):
        """
        Divison Absoulate (<<)
        ============
        x = x << 2
        """
        x = self.RandUnit(x)

        divisible = self.LShift(x)
        if divisible:
            return divisible / x
        return self.__truediv__(x)

    def __ilshift__(self, x):
        """
        Divison Absoulate (<<)
        ============
        x <<= 2
        """
        return self.__lshift__(x)

    def __rlshift__(self, x):
        """
        Divison Absoulate (<<)
        ============
        x = 2 << x
        """
        x = self.RandNumber(**x if isinstance(x, dict) else {"number": x})
        if x % self.Sympy() != 0:
            if x.number in ("N", "I", "D", "D-", "D+", "I-", "I+"):
                x = x * self.Sympy()
        return self.__rtruediv__(x)

    def __rshift__(self, x):
        """
        Divison Remainder (>>)
        ============
        x = 2 >> x
        """
        x = self.RandNumber(**x if isinstance(x, dict) else {"number": x})
        if self.Sympy() == x:
            x = x * self.Sympy()
            return self.__rtruediv__(x)
        elif self.Sympy() > x:
            return self.__truediv__(x)
        elif self.Sympy() < x:
            return self.__rtruediv__(x)

    def __irshift__(self, x):
        """
        Divison Remainder (>>)
        ============
        x = 2 >> x
        """
        return self.__rshift__(x)

    def __mod__(self, x):
        """
        Fraction (%)
        ============
        x = x % 2
        """
        return self.ROperation(x, "%")

    def __imod__(self, x):
        """
        Fraction (%)
        ============
        x %=  2
        """
        return self.__mod__(x)

    def __rmod__(self, x):
        """
        Fraction (%)
        ============
        x = 2 % x
        """
        return self.ROperation(x, "%", True)

    def __invert__(self):
        """
        Fraction (~)
        ============
        x = ~x
        """
        return self.__rmod__("1")

    def __pow__(self, x):
        """
        Power (**)
        ============
        x = x ** 2
        """
        return self.ROperation(x, "**")

    def __ipow__(self, x):
        """
        Power (**)
        ============
        x **=  2
        """
        return self.__pow__(x)

    def __rpow__(self, x):
        """
        Power (**)
        ============
        x = 2 ** x
        """
        return self.ROperation(x, "**", True)

    def __xor__(self, x):
        """
        Power Bracket (^)
        ============
        x = x ^ 2
        """
        return self.ROperation(x, "^")

    def __ixor__(self, x):
        """
        Power Bracket (^)
        ============
        x ^= 2
        """
        return self.__xor__(x)

    def __rxor__(self, x):
        """
        Power Bracket (^)
        ============
        x = 2 ^ x
        """
        return self.ROperation(x, "^", True)

    def __lt__(self, x):
        return self.eval() < Eval(x).eval() if Eval(x) else False

    def __le__(self, x):
        return self.eval() <= Eval(x).eval() if Eval(x) else False

    def __gt__(self, x):
        return self.eval() > Eval(x).eval() if Eval(x) else False

    def __ge__(self, x):
        return self.eval() >= Eval(x).eval() if Eval(x) else False

    def __eq__(self, x):
        return self.eval() == Eval(x).eval() if Eval(x) else False

    def __ne__(self, x):
        return self.eval() != Eval(x).eval() if Eval(x) else False

    def __hash__(self):
        return hash(repr(self))


if "__main__" == __name__:
    Unit = {"unit": "(1 + sqrt(1))/(1 + sqrt(1))", "eval_BinOp": False}
    # a = RandUnit(**Unit)
    # print(a)
    a = RandOperation(Unit)
    a += Unit
    print(TeX(a), "=", Eval(a))
    pass
