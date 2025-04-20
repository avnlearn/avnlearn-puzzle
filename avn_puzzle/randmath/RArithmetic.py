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

from avn_puzzle.randmath.ROperation import RandOperation, RandUnit, Eval, TeX, sympify


class RandLevel:
    def __init__(self, name=None, level=None, operator=None, *args, **kwargs):
        self.name = name
        self.level = level
        self.operator = operator
        if args:
            self.args = args

        if kwargs:
            self.kwargs = kwargs
            self.__dict__.update(kwargs)

        if self.name == None:
            self.name = random.choice(
                [
                    "N",
                    "Z+",
                    "Z-",
                    "Z",
                    "F",
                    "Q",
                    "Q+",
                    "Q-",
                    "D",
                    "D+",
                    "D-",
                    "T",
                    "T-",
                    "T+",
                ]
            )

        self.number = self.NumberName()

    def __str__(self):
        return str(self.number) if self.number != None else "0"

    def __iter__(self):
        if self.name != None and self.number != None:
            return iter([self.number, self.name])
        return iter([0, self.name])

    def RNumber(self):
        if isinstance(self.number, dict) and self.number:
            if "standard_fraction" not in self.number:
                self.number.update({"standard_fraction": self.standard_fraction})
            return self.number
        elif self.number == 1:
            return {
                "name": self.name,
                "unit": self.number,
                "zero": None,
                "standard_fraction": self.standard_fraction,
            }
        else:
            return {
                "name": self.name,
                "unit": self.number,
                "standard_fraction": self.standard_fraction,
            }

    def __getattr__(self, key):
        match key:
            case str():
                return self.__dict__.get(key)
            case int() if len(self.args):
                return self.__dict__["args"][key]
            case _:
                raise AttributeError(f"can't get {key}")

    def __setattr__(self, key, item):
        self.__dict__[f"{key}"] = item

    def Choice(self, choice_number):

        if isinstance(choice_number, list):
            return random.choice(choice_number)
        elif isinstance(choice_number, dict):
            return choice_number
        elif isinstance(choice_number, set):
            return self.Choice(list(choice_number))
        elif isinstance(choice_number, (int, float, str)):
            return choice_number
        elif isinstance(choice_number, tuple):
            if len(choice_number) in (1, 2) and all(
                isinstance(i, int) for i in choice_number
            ):
                return random.randrange(*choice_number)
            else:
                return self.Choice(list(choice_number))

    def NumberName(self):

        match self.name:
            case "N" | "Z+" | "Z-" | "Z":
                num = self.Integer_Unit()
            case "F+":
                self.name = "Q+"
                return self.NumberName()
            case "F-":
                self.name = "Q"
                self.standard_fraction = True
                return self.NumberName()
            case "F":
                self.name = "Q+"
                return self.NumberName()
            case "Q" | "Q-" | "Q+":
                num = self.Rational_Unit()
            case "D" | "D-" | "D+":
                num = self.Decimal_Unit()
            case "QD" | "QD-" | "QD+":
                num = self.Repeated_decimals_Unit()
            case "T" | "T-" | "T+":
                num = self.Irrational_Unit()
            case "QT" | "RATIONALIZE":
                num = self.Irrational_Rationalize()
            case "R" | "R+" | "R-":
                num = self.Real_Unit()
            case "E" | "E+" | "E-":
                num = self.Exponentiation_Unit()
            case "P" | "P+" | "P-":
                num = self.Power_Unit()
            case "S" | "S+" | "S-":
                num = self.Symbol_Unit()
            case "A" | "A+" | "A-":
                num = self.Algebra_Unit()
            case "(A + B)**2" | "(A + B)*(A - B)" | "A**2 + 2*A*B + B**2":
                num = self.Algebraic_Identities_square()
            case "(X + A)*(X + B)":
                num = self.Algebraic_Identities_osquare()
            case "X**2 + (A + B)*X + A*B":
                num = self.Algebra_Fractorization()
            case "ALGEBRA_SIMPLIFY":
                num = self.Algebra_simplify()
            case _:
                print(self.name)
        return self.Choice(num)

    def Integer_Unit(self):
        match self.level:
            case 0:
                match self.operator:
                    case "+" | "-":
                        return (3, 6)
                    case "as":
                        return [1, 2]
                    case _:
                        return {"unit": 1, "name": self.name}
            case 1:
                match self.operator:
                    case "+" | "-":
                        return (4, 7)
                    case "*" | "<<" | ">>" if self.first_terms:
                        return {"unit": 2, "zero": None, "name": self.name}
                    case "<<" | ">>" | "*" | "/" | "**":
                        return {"unit": 1, "zero": 2, "name": self.name}
                    case _:
                        return (1, 3)
            case 2:
                match self.operator:
                    case "+":
                        return (4, 7)
                    case "-":
                        return 4
                    case "*" | "<<" | ">>" if self.first_terms:
                        return {"unit": 3, "zero": None, "name": self.name}
                    case "<<" | ">>" | "*" | "/" | "**":
                        return {"unit": 1, "zero": 2, "name": self.name}
                    case _:
                        return (1, 3)

            case 3:
                match self.operator:
                    case "+" | "-":
                        return 3
                    case "*" | "<<" | ">>" | "/":
                        return {
                            "unit": 4 if self.first_terms else 1,
                            "zero": 2,
                            "name": self.name,
                        }
            case 4:
                match self.operator:
                    case "+" | "-":
                        return 4
                    case "*" | "<<" | ">>" | "/":
                        return {
                            "unit": 5 if self.first_terms else 1,
                            "zero": 2,
                            "name": self.name,
                        }
            case 5 if self.operator in ("*", "<<", ">>", "/"):
                return {
                    "unit": 6 if self.first_terms else 1,
                    "zero": 2,
                    "name": self.name,
                }
            case 6 if self.operator in ("*"):
                if self.first_terms:
                    return random.randrange(5, 8)
                else:
                    return {
                        "unit": 1,
                        "zero": 2,
                        "name": self.name,
                    }
            case 7 if self.operator in ("*"):
                return 2
            case 8 if self.operator in ("*"):
                return {
                    "unit": random.randrange(1, 4) if self.first_terms else 2,
                    "zero": None,
                    "name": self.name,
                }

        match self.operator:
            case "<<" | ">>" | "/" if self.level in (6, 7, 8, 9, 10):
                number = random.randrange(2, 31)
                if self.first_terms:
                    unit = 2
                    match self.level:
                        case 7:
                            unit = 3
                        case 8:
                            unit = 4
                        case 9:
                            unit = 5
                        case 10:
                            unit = random.randrange(5, 8)
                        case 11:
                            unit = random.randrange(2, 8)
                    return {"unit": unit, "name": self.name, "zero": 2}
                match self.name:
                    case "I-":
                        number = number * (-1)
                    case "I":
                        number = random.choice([1, -1]) * number
                return {"number": number, "name": self.name, "zero": None}

        match self.operator:
            case "+" | "-":
                match self.level:
                    case 7 | 8:
                        return (3, 6)
                    case 10 | 11 | 12:
                        return (6, 9)
                return (4, 9)
            case "/" | "<<" | ">>" | "**" if self.first_terms:
                return (1, 9)
            case "/" | "**":
                return (1, 4)
            case "*":
                return (1, 7)
            case _:
                return (1, 4)

    def Decimal_Unit(self):
        Integer_Part = None
        Decimal_Part = None
        match self.level:
            case 0:
                match self.operator:
                    case "+":
                        Integer_Part = random.randrange(5)
                        Decimal_Part = random.randrange(1, 4)
                    case "-" if self.first_terms:
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(5), random.randrange(1, 4)
                            ),
                            "name": self.name,
                        }
                    case "-":
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(4), random.randrange(1, 3)
                            ),
                            "name": self.name,
                        }
                    case "*" if self.first_terms:
                        Integer_Part = random.randrange(5)
                        Decimal_Part = random.randrange(1, 4)
                    case "*":
                        if random.choice([True, False]):
                            Integer_Part = random.randrange(5)
                            Decimal_Part = random.randrange(1, 4)
                        else:
                            return (1, 2)
            case 1:
                match self.operator:
                    case "+":
                        Integer_Part = random.randrange(6)
                        Decimal_Part = random.randrange(3, 6)
                    case "-" if self.first_terms:
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(1, 6), random.randrange(1, 6)
                            ),
                            "name": self.name,
                        }
                    case "-":
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(5), random.randrange(1, 5)
                            ),
                            "name": self.name,
                        }
                    case "*" if self.first_terms:
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(2), random.randrange(1, 3)
                            ),
                            "name": self.name,
                        }
            case 2:
                match self.operator:
                    case "+":
                        Integer_Part = random.randrange(3, 5)
                        Decimal_Part = random.randrange(1, 5)
                    case "-" if self.first_terms:
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(1, 6), random.randrange(1, 6)
                            ),
                            "name": self.name,
                        }
                    case "-":
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(5), random.randrange(1, 5)
                            ),
                            "name": self.name,
                        }
                    case "*" | "<<" if self.first_terms:
                        Integer_Part = random.randrange(5)
                        Decimal_Part = random.randrange(1, 4)
                    case "*" | "<<":
                        match random.choice([True, False]):
                            case True:
                                Integer_Part = random.randrange(2)
                                Decimal_Part = random.randrange(1, 3)
                            case _:
                                return {
                                    "name": "I+" if self.name == "D+" else "I-",
                                    "number": random.randrange(2, 31),
                                }
            case 3:
                match self.operator:
                    case "+" | "-":
                        Decimal_Part = random.randrange(2, 5)
                        Integer_Part = random.randrange(3)
                    case "*" if self.first_terms:
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(2), random.randrange(1, 3)
                            ),
                            "name": self.name,
                        }
            case 4:
                match self.operator:
                    case "+" | "-":
                        Decimal_Part = random.randrange(3, 5)
                        Integer_Part = random.randrange(4)
                    case "*" if self.first_terms:
                        return {
                            "unit": "{}.{}".format(
                                random.randrange(2), random.randrange(1, 3)
                            ),
                            "name": self.name,
                        }

        if Integer_Part and Decimal_Part:
            return {
                "unit": "{}.{}".format(Integer_Part, Decimal_Part),
                "name": self.name,
            }
        return {"unit": "1.1", "name": self.name}

    def Rational_Unit(self):
        match self.level:
            case 0:
                match self.operator:
                    case "+" | "-" if self.denominator:
                        return {
                            "unit": "{}/{}".format(
                                random.randrange(1, 4), self.denominator
                            ),
                            "denominator": False,
                            "name": self.name,
                            "zero": False,
                        }
                    case "+" | "-":
                        return {
                            "unit": "{}/{}".format(
                                random.randrange(1, 4), random.randrange(2, 200)
                            ),
                            "denominator": False,
                            "name": self.name,
                            "zero": False,
                        }
                return {"unit": "1/1", "name": self.name, "zero": False}
            case 1 | 2 if self.first_terms:
                unit = 1
                if self.level == 2:
                    unit = random.randrange(2, 6)
                match self.name:
                    case "Q":
                        return {"unit": unit, "name": "I", "zero": False}
                    case "Q-" | "F-":
                        return {"unit": unit, "name": "I-", "zero": False}
                return {"unit": unit, "name": "N", "zero": False}
            case 3 | 4 if not self.first_terms:
                unit = 1
                name = "N"
                if self.level == 4:
                    unit = random.randrange(2, 6)
                match self.name:
                    case "Q":
                        name = "I"
                    case "Q-" | "F-":
                        name = "I-"
                return {"unit": unit, "name": name, "zero": False}
            case 5 if self.first_terms:
                return [
                    {
                        "unit": random.randrange(1, 4),
                        "zero": 2,
                        "name": "N",
                        "zero": False,
                    },
                    {
                        "unit": "{}/{}".format(
                            random.randrange(1, 3), random.randrange(1, 3)
                        ),
                        "name": self.name,
                        "zero": False,
                    },
                ]
            case 5:
                return {
                    "unit": "{}/{}".format(
                        random.randrange(1, 3), random.randrange(1, 3)
                    ),
                    "name": self.name,
                    "zero": False,
                }
            case 6:
                return {
                    "unit": "{}/{}".format(
                        random.randrange(1, 3), random.randrange(1, 3)
                    ),
                    "name": self.name,
                    "zero": False,
                }
            case 7:
                return {
                    "unit": "{}/{}".format(
                        random.randrange(1, 4), random.randrange(1, 4)
                    ),
                    "name": self.name,
                    "zero": False,
                }
            case _:
                match self.operator:
                    case _:
                        return {"unit": "1/1", "name": self.name, "zero": False}

    def Repeated_decimals_Unit(self):
        return {"unit": "0.[1]", "name": self.name}

    def Irrational_Unit(self):
        match self.level:
            case 0:
                return {
                    "unit": "sqrt({})".format(random.randrange(1, 3)),
                    "name": self.name,
                    "perfect_square": True,
                }
            case 1:
                return {
                    "unit": "sqrt({})".format(random.randrange(1, 6)),
                    "name": self.name,
                    "perfect_square": True,
                }
        return {"unit": "sqrt(1)", "name": self.name}

    def Irrational_Rationalize(self):

        match self.level:
            case 0:
                unit = [
                    "{}/sqrt({})".format(
                        random.randrange(1, 4), random.randrange(1, 3)
                    ),
                    "{}/sqrt({})".format(
                        random.randrange(1, 4), random.randrange(1, 3)
                    ),
                    "{}/({}*sqrt({}))".format(
                        random.randrange(1, 3),
                        random.randrange(1, 3),
                        random.randrange(1, 3),
                    ),
                    "sqrt({})/sqrt({})".format(
                        random.randrange(1, 3), random.randrange(1, 3)
                    ),
                    "sqrt({})/({}*sqrt({}))".format(
                        random.randrange(1, 3),
                        random.randrange(1, 3),
                        random.randrange(1, 3),
                    ),
                    "(1*sqrt(1))/(1*sqrt(1))",
                ]
                unit = random.choice(unit)
                return {"unit": unit, "eval_BinOp": False, "prime": True, "zero": False}
            case 1:
                real_unit = ["1", "sqrt(1)"]
                random.shuffle(real_unit)
                real_unit = [
                    (random.choice(["+", "-"])).join(real_unit),
                    (random.choice(["+", "-"])).join(real_unit),
                ]
                unit = [
                    "{}/({})".format(
                        random.choice([random.randrange(1, 3), "sqrt(1)"]),
                        random.choice(real_unit),
                    ),
                    "({})/({})".format(real_unit[0], real_unit[1]),
                ]
                unit = random.choice(unit)
                return {"unit": unit, "eval_BinOp": False, "prime": True, "zero": False}
            case _:
                self.level = random.randrange(3)
                return self.Irrational_Rationalize()

    def Real_Unit(self):
        unit_sqrt = [
            "1 - sqrt(2)",
            "1 - 2*sqrt(2)",
            "sqrt(2) - 1",
            "2*sqrt(2) - 1",
            "2 + sqrt(2)",
            "2*sqrt(2)",
            "3*sqrt(2)",
            "2 + 2*sqrt(2)",
        ]
        unit_cbrt = [
            "1 + sqrt(3)",
            "1 + 2*sqrt(3)",
            "sqrt(3) + 1",
            "2*sqrt(3) + 1",
            "2 + sqrt(3)",
            "2*sqrt(3)",
            "3*sqrt(3)",
            "2 + 2*sqrt(3)",
        ]
        unit_fifth_root = [
            "1 + sqrt(5)",
            "1 + 2*sqrt(5)",
            "sqrt(5) + 1",
            "2*sqrt(5) + 1",
            "2 + sqrt(5)",
            "2*sqrt(5)",
            "3*sqrt(5)",
            "2 + 2*sqrt(5)",
        ]
        match self.level:

            case 0:
                unit = unit_sqrt
            case 1:
                unit = unit_cbrt
            case 2:
                unit = unit_fifth_root
            case 3:
                unit = unit_sqrt + unit_cbrt
            case 4:
                unit = unit_sqrt + unit_fifth_root
            case 5:
                unit = unit_sqrt + unit_cbrt + unit_fifth_root

        if self.level in (0, 1, 2, 3, 4, 5):
            unit = random.choice(unit)
            return {"unit": unit, "name": self.name, "root_change": False, "zero": None}
        else:
            unit = ["1 + sqrt(2)", "1"]

        return {"unit": r"1 + sqrt(1)", "name": self.name}

    def Exponentiation_Unit(self):
        return {"unit": "1 * 10**2", "name": self.name}

    def Power_Unit(self):
        return {"unit": "Symbol('2')**2", "name": self.name, "base_change": False}

    def Symbol_Unit(self):
        Algebra_Symbols = ["a", "b", "x", "y"]
        match self.operator:
            case "*":
                match self.level:
                    case 0:
                        unit = random.choice(
                            [
                                random.choice(Algebra_Symbols),
                                "{}*{}".format(
                                    random.randrange(1, 3),
                                    random.choice(Algebra_Symbols),
                                ),
                            ]
                        )
                    case 1 if self.first_terms:
                        unit = random.choice(
                            [
                                random.choice(Algebra_Symbols),
                                "{}*{}".format(
                                    random.randrange(1, 3),
                                    random.choice(Algebra_Symbols),
                                ),
                            ]
                        )

                    case 2 if not self.first_terms:
                        unit = random.choice(
                            [
                                random.choice(Algebra_Symbols),
                                "{}*{}".format(
                                    random.randrange(1, 3),
                                    random.choice(Algebra_Symbols),
                                ),
                            ]
                        )
                    case 1 | 2:
                        a = random.choice(
                            [
                                random.choice(Algebra_Symbols),
                                "{}*{}".format(
                                    random.randrange(1, 3),
                                    random.choice(Algebra_Symbols),
                                ),
                            ]
                        )
                        sign = random.choice(["+", "-"])
                        b = random.choice(
                            [
                                random.choice(Algebra_Symbols),
                                "{}*{}".format(
                                    random.randrange(1, 3),
                                    random.choice(Algebra_Symbols),
                                ),
                            ]
                        )
                        unit = f"({a} {sign} {b})"
                    case _:
                        match self.level:
                            case 3:
                                terms = 2
                            case _:
                                terms = random.randrange(2, 5)
                        unit = []
                        for i in range(terms):
                            unit.append(
                                random.choice(
                                    [
                                        random.choice(Algebra_Symbols),
                                        "{}*{}".format(
                                            random.randrange(1, 3),
                                            random.choice(Algebra_Symbols),
                                        ),
                                    ]
                                )
                            )
                            if i != terms - 1:
                                unit.append(random.choice(["+", "-"]))

                        unit = "({})".format("".join(unit))
                        print(unit)
            case "/":
                match self.level:
                    case _:
                        unit = random.choice(
                            [
                                random.choice(Algebra_Symbols),
                                "{}*{}".format(
                                    random.randrange(1, 3),
                                    random.choice(Algebra_Symbols),
                                ),
                            ]
                        )
            case _:
                unit = random.choice(
                    [
                        random.choice(Algebra_Symbols),
                        "{}*{}".format(
                            random.randrange(1, 4),
                            random.choice(Algebra_Symbols),
                        ),
                    ]
                )

        return {"unit": unit, "zero": False}

    def Zero_Unit(self):
        return {"unit": "10", "name": self.name}

    def Algebra_Unit(self):
        return {"unit": "x + 1*x + 3*y", "name": self.name}

    def Algebraic_Identities_square(self):
        a = ["x", "y", "z", "a", "b", "u", "v", "m", "n"]
        sign = ["+", "-"]
        b = random.randrange(1, 3)
        unit = None
        match self.level:
            case 0 | 1 | 2:
                a = random.choice(a)
                sign = random.choice(sign) if self.level == 2 else sign[self.level]
            case 3:
                if random.choice([True, False]):
                    a = random.choice(["x", "a", "u", "m"])
                    b = random.choice([["y", "b", "v", "n", b]])
                else:
                    a = random.choice([["x", "a", "u", "m", b]])
                    b = random.choice(["y", "b", "v", "n"])
            case 4 | 5:

                a = random.choice(
                    [
                        "x",
                        "a",
                        "u",
                        "m",
                        "{}*{}".format(
                            1 if self.level == 4 else random.randrange(1, 3),
                            random.choice(["x", "a", "u", "m"]),
                        ),
                    ]
                )
                b = random.choice(
                    [
                        "y",
                        "b",
                        "v",
                        "n",
                        b,
                        "{}*{}".format(
                            1 if self.level == 4 else random.randrange(1, 3),
                            random.choice(["y", "b", "v", "n"]),
                        ),
                    ]
                )
            case 6:
                a = random.choice(
                    [
                        "x",
                        "a",
                        "u",
                        "m",
                        "{}*{}".format(
                            1 if self.level == 4 else random.randrange(1, 3),
                            random.choice(["x", "a", "u", "m"]),
                        ),
                    ]
                )
                b = random.choice(
                    [
                        "1/1",
                        "y",
                        "b",
                        "v",
                        "n",
                        b,
                        "{}*{}".format(
                            1 if self.level == 4 else random.randrange(1, 3),
                            random.choice(["y", "b", "v", "n"]),
                        ),
                    ]
                )
            case 7:
                a = random.choice(a + ["{}*x".format(random.randrange(1, 3))])
                b = random.choice([b, "1/1", "1.1", "sqrt(1)", "1*sqrt(1)"])
            case 8:
                a = random.choice(
                    a
                    + [
                        "{}*v".format(random.randrange(1, 3)),
                        "{}*a".format(random.choice(["sqrt(1)", "1*sqrt(1)"])),
                        "1*x/2",
                    ]
                )
                b = random.choice([b, "1/1", "1.1", "sqrt(1)", "1*sqrt(1)"])
            case 9:
                a = random.choice(
                    a
                    + [
                        "{}*v".format(random.randrange(1, 3)),
                        "sqrt(1)*a",
                        "{}**{}".format(
                            random.choice(["x", "a", "b", "y"]),
                            random.randrange(1, 3),
                        ),
                    ]
                )
                b = random.choice([b, "sqrt(1)", "1*sqrt(1)"])

            case _:
                a = random.choice(
                    a
                    + [
                        "{}*v".format(random.randrange(1, 3)),
                        "{}*a".format(random.choice(["sqrt(1)", "1*sqrt(1)"])),
                        "1*x/2",
                        "{}.{}*x".format(random.randrange(4), random.randrange(1, 4)),
                    ]
                )
                b = (random.choice([b, "1/1", "1.1", "sqrt(1)", "1*sqrt(1)"]),)

        if isinstance(unit, list):
            unit = random.choice(unit)
        elif unit == None:
            if isinstance(a, list):
                a = random.choice(a)

            if isinstance(sign, list):
                sign = random.choice(sign)

            if isinstance(b, list):
                b = random.choice(b)

            match self.name:
                case "(A + B)**2":
                    unit = f"({a} {sign} {b})**FixUnit(2)"

                case "(A + B)*(A - B)" | "A**2 + 2*A*B + B**2":
                    sign = ["+", "-"]
                    random.shuffle(sign)
                    a, b = RandUnit(str(a), zero=False), RandUnit(str(b), zero=False)
                    match self.name:
                        case "(A + B)*(A - B)":
                            unit = f"({a} {sign[0]} {b})*({a} {sign[1]} {b})"
                            return {"number": unit, "zero": False, "eval_BinOp": False}
                        case "A**2 + 2*A*B + B**2":
                            unit = f"({a})**2 {sign[0]} 2*{a}*{b} + ({b})**2"

                            return {
                                "number": str(Eval(unit)),
                                "zero": False,
                                "eval_BinOp": True,
                            }

        return {"unit": unit, "zero": False, "eval_BinOp": False}

    def Algebraic_Identities_isquare(self):
        return {"unit": "(FixUnit(x) + FixUnit(2))*(FixUnit(x) - FixUnit(2))"}

    def Algebraic_Identities_osquare(self):
        return {"unit": "(FixUnit(x) + 2)*(FixUnit(x) + 2)"}

    def Algebra_Fractorization(
        self, x=["x", "y", "a", "b", "n", "m", "u", "v"], a="1", b="1", y="1"
    ):
        x, a, b, y = (RandUnit(i) for i in [x, a, b, y])

        # match self.level:
        #     case 0:
        #         x = random.choice(x)

        # match self.name:
        #     case "X**2 + (A + B)*X + A*B":
        #         unit = f"({x})**2 +"

        match self.level:
            case 0:
                unit = "({a})**2 + 2*({a})*({b}) + ({b})**2".format(
                    a=x, b=random.choice([a, b])
                )
            case 1:
                unit = "({x})**2 - ({a})**2".format(x=x, a=random.choice([a, b]))
            case 2:
                # unit = "({x})**2 + (({a}) + ({b}))*({var}) + ({a})*({b})".format(
                #     x=x, a=a, b=b
                # )
                unit = f"({x})**2 + ({a})*({x}) + ({b})*({x}) + ({a})*({b})"
            case 3:
                a = random.choice([a, f"-{a}"])
                b = random.choice([b, f"-{b}"])
                unit = f"({x})**2 + ({a})*({x}) + ({b})*({x}) + ({a})*({b})"
                # print(unit)
            case 4:
                # (x + a)*(y + b) = x*(y + b) + a*(y + b) = x*y + x*b + a*y + a*b
                unit = "({x})*({y}) + ({x})*({b}) + ({a})*({y}) + ({a})*({b})".format(
                    x=x, a=a, y=x * y, b=b
                )
            case 5:
                a = random.choice([a, f"-{a}"])
                b = random.choice([b, f"-{b}"])
                # (x + a)*(y + b) = x*(y + b) + a*(y + b) = x*y + x*b + a*y + a*b
                unit = "({x})*({y}) + ({x})*({b}) + ({a})*({y}) + ({a})*({b})".format(
                    x=x, a=a, y=x * y, b=b
                )
            case _:
                num = ["1/1", "1", "2"]
                a = RandUnit(unit=random.choice(num), zero=None)
                b = RandUnit(unit=random.choice(num), zero=None)
                a = random.choice([a, f"-{a}"])
                b = random.choice([b, f"-{b}"])
                unit = f"({x})**2 + ({a})*({x}) + ({b})*({x}) + ({a})*({b})"
            
        unit = str(Eval(unit).eval())
        return {"number": unit}

    def Algebra_simplify(self):

        match self.level:
            case 0:
                a = RandUnit(random.randrange(3, 5))
                b = RandUnit(random.randrange(3, 5))
            case _:
                a = RandUnit(random.randrange(3, 5))
                b = RandUnit(random.randrange(3, 5))
        unit = [
            # Group 1
            "({a}*{a} - {b}*{b})/({q})".format(
                a=a, b=b, q=random.choice([f"{a} + {b}", f"{a} - {b}"])
            ),
            # Group 2
            f"({a}*{a}*{a} + {b}*{b}*{b})/({a}*{a} - {a}*{b} + {b}*{b})",
            f"({a}*{a}*{a} - {b}*{b}*{b})/({a}*{a} + {a}*{b} + {b}*{b})",
            # Group 3
            f"({a}*{a} + 2*{a}*{b} + {b}*{b})/({a} + {b})",
            f"({a}*{a} - 2*{a}*{b} + {b}*{b})/({a} - {b})",
            # Group 4
            f"(({a} + {b})**2 - ({a} - {b})**2)/({a} * {b})",
            # Group 5
            f"(({a} + {b})**2 + ({a} - {b})**2)/({a} * {a} + {b} * {b})",
        ]

        return {"number": unit[random.randrange(7)]}


class RandArithmetic:
    def __init__(
        self, name=None, level=None, operators=None, terms=None, *args, **kwargs
    ):
        self.name = name
        self.level = level
        self.operators = operators
        self.terms = terms
        if args:
            self.args = args
        if kwargs:
            self.kwargs = kwargs
            self.__dict__.update(kwargs)

        if self.name == None:
            self.name = random.choice(
                ["N", "Z", "F", "Q", "D", "D-", "T", "T-", "R", "Im", "C", "L"]
            )

        match (
            str(self.operators).lower()
            if isinstance(self.operators, str)
            else self.operators
        ):
            case "+-":
                self.operator = ["+", "-"]
            case "*<<":
                self.operator = ["*", "<<"]
            case "+-*":
                self.operator = ["+", "-", "*"]
            case "+-<<":
                self.operator = ["+", "-", "<<"]
            case "beginner":
                self.operator = ["+", "-", "*", "<<"]
            case "junior":
                self.operator = ["+", "-", "*", "<<", ">>"]
            case "basic":
                self.operator = ["+", "-", "*", "/"]
            case "odmas":
                self.operator = ["+", "-", "*", "<<", "**"]
            case _:
                self.operator = self.operators

        self.position = self.level
        next(self)

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

    def __str__(self):
        return str(self.question) if isinstance(self.question, RandOperation) else ""

    def __repr__(self):
        return repr(self.question) if isinstance(self.question, RandOperation) else ""

    def Number_of_Question(self, len_question=None, **kwargs):
        len_que = 1
        if isinstance(len_question, int) and len_question:
            if len_question > 0:
                len_que = len_question
        elif isinstance(self.number_of_question, int) and self.number_of_question:
            if self.number_of_question > 0:
                len_que = self.number_of_question

        questions = set()
        while True:
            if len(questions) == len_que:
                break
            else:
                next(self)
                questions.add(self.question)

        len_que = len(questions)
        if len_que == 1:
            return questions.pop()
        elif len_que > 1:
            return list(questions)

    def Number_of_Page(self, len_page=None, **kwargs):
        len_papr = 1
        if isinstance(len_page, int) and len_page:
            if len_page > 0:
                len_papr = len_page
        elif isinstance(self.number_of_page, int) and self.number_of_page:
            if self.number_of_page > 0:
                len_papr = self.number_of_page

        papers = []
        for _ in range(len_papr):
            papers.append(self.Number_of_Question())

        len_papr = len(papers)
        if len_papr == 1:
            return papers.pop()
        elif len_papr > 1:
            return papers

    def __iter__(self):
        paper = self.Number_of_Page()
        if isinstance(paper, list):
            return iter(paper)
        return iter()

    def __next__(self):
        positive = None
        name = self.name

        operator = (
            random.choice(self.operator)
            if isinstance(self.operator, list)
            else self.operator
        )
        level = 0
        match (
            str(self.operators).lower()
            if isinstance(self.operators, str)
            else self.operators
        ):
            case "basic":
                match operator:
                    case "+" | "-":
                        level = random.randrange(0, 5)
                    case "*" if self.level in (0, 1):
                        level = random.randrange(0, 3)
                    case "*" if self.level in (2, 3):
                        level = random.randrange(3, 5)
                    case "<<" if self.level in (0, 1):
                        level = random.randrange(0, 2)
                    case _:
                        level = random.randrange(2, 5)

            case _:
                level = (
                    self.level
                    if isinstance(self.level, int)
                    else random.randrange(0, 5)
                )
        match name:
            case "F" | "Q+" if level == 0 and self.denominator == None:
                self.denominator = random.randrange(2, 200)
                positive = True
            case "Q" | "Q-" if level == 0 and self.denominator == None:
                self.denominator = random.randrange(2, 200)
            case "N" | "Z+" | "Q+" | "D+":
                positive = True

        terms = self.terms if isinstance(self.terms, int) else 1
        terms = terms if terms > 0 else 1
        first_terms = None
        match operator:
            case "+" | "-" | "/" if self.level in (1, 2, 3, 4, 5) and name in (
                "F",
                "Q",
                "Q+",
                "Q-",
                "F-",
            ):
                first_terms = True
            case "*" | "<<" | ">>":
                first_terms = True

        num_x = RandLevel(
            self.name,
            level,
            operator,
            first_terms=first_terms,
            denominator=self.denominator,
        ).RNumber()
        num_y = RandLevel(
            self.name, level, operator, denominator=self.denominator
        ).RNumber()

        dict_y = {
            "name": self.name,
            "level": self.level,
            "operator": operator,
            "denominator": self.denominator,
        }

        reflected = False
        self.denominator = None
        self.question = self.RArithmetic(
            num_x, operator, num_y, terms, positive, reflected, dict_y=dict_y
        )
        return self.question

    def RArithmetic(
        self,
        x,
        operator=None,
        y=None,
        terms=None,
        positive=None,
        reflected=False,
        **kwargs,
    ):
        y = y if isinstance(y, dict) else x
        expression = RandOperation(x)
        i = 1
        while i < terms:
            expression = expression.ROperation(y, operator, reflected)
            i += 1
            if isinstance(kwargs.get("dict_y"), dict):
                y = RandLevel(**kwargs["dict_y"]).RNumber()

        if positive == True:
            if expression < 0:
                return next(self)

        return expression

    def Questions_Set(self, number_of_question=None, number_of_page=None):
        self.__mul__(number_of_question)
        self.__pow__(number_of_page)
        return self

    def __mul__(self, x):
        """
        Number of Question (Random Question)
        =================================
        x = x * <number_of_question>
        """
        if isinstance(x, int):
            self.number_of_question = x
            return self

    def __imul__(self, x):
        """
        Number of Question (Random Question)
        =================================
        x *= <number_of_question>
        """
        if isinstance(x, int):
            self.number_of_question = x
            return list(self)

    def __rmul__(self, x):
        """
        Number of Question (Same Question)
        =================================
        x *= <number_of_question>
        """
        if isinstance(x, int):
            return list(self) * x

    def __pow__(self, x):
        """
        Number of Page (Random Question)
        ===============================
        x = x ** <number_of_page>
        """
        if isinstance(x, int):
            self.number_of_page = x
            return self

    def __ipow__(self, x):
        """
        Number of Page (Random Question)
        ===============================
        x **= <number_of_page>
        """
        if isinstance(x, int):
            self.number_of_page = x
            return list(self)

    def __rpow__(self, x):
        """
        Number of Page (Random Question)
        ===============================
        x = x ** <number_of_page>
        """
        if isinstance(x, int):
            self.number_of_page = x
            return list(self)




if "__main__" == __name__:
    a = RandArithmetic("P", level=2, operators="*", terms=2, zero=None)
    a = a.Questions_Set(10, 2)
    # print(list(a))
    for i in a:
        # print(TeX(i), repr(i))
        for j in i:
            print(j.eval(), j.eval())
    # a = RandLevel(name="S", level=3, operator="*")
    # print(a)
