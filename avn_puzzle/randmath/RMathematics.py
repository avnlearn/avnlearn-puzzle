import sys
import os
import datetime
from avn_puzzle.randmath.RArithmetic import RandArithmetic, RandOperation, RandUnit, Eval, TeX
from avn_puzzle.randmath.html_generator import json2html
import sympy




class RandMathematics:
    def __init__(self, name=None, *args, **kwargs):
        self.name = name
        if args:
            self.args = args
        if kwargs:
            self.kwargs = kwargs
            self.__dict__.update(kwargs)
        self.set_paper = self.RMathematics()

    def __str__(self):
        return str(self.number) if self.number != None else "0"

    def __len__(self):
        if isinstance(self.set_paper, list):
            if isinstance(self.set_paper[0], list):
                return len(self.set_paper)
            else:
                return 1
        return 0

    def __getitem__(self, i):
        if len(self):
            return self.set_paper[i]

    def Expre_Format(self, item, answer=False):
        match item:
            case list():
                question = []
                for i in item:
                    question.append(self.Expre_Format(i))
                return question
            case RandOperation():
                ans = repr(item)
                match self.mode_simplify:
                    case "radsimp":
                        match item.eval():
                            case sympy.Expr() as x:
                                ans = sympy.latex(x.radsimp())
                    case "expand":
                        match item.eval():
                            case sympy.Expr() as x:
                                ans = sympy.latex(x.expand())
                    case "factor":
                        match item.eval():
                            case sympy.Expr() as x:
                                ans = sympy.latex(x.factor())

                item = f"{TeX(item)}"
                if ans != None:
                    if self.newline:
                        ans = f"{item} \\newline= {ans}"
                    else:
                        ans = f"{item} = {ans}"

                if self.equal_sign_using:
                    item = f"{item} = "
                if self.answer or answer:
                    return [
                        {"math": item, "class": "question"},
                        {"math": ans, "class": "answer"},
                    ]
                return {"math": item, "class": "question"}

    def __iter__(self):
        page_question = []
        match len(self):
            case 0:
                return
            case 1:
                page_question.append({"ol": self.Expre_Format(self[0])})
            case _:
                header = ""
                question_heading = {"str": ""}
                if isinstance(self.question_heading, (dict, list, str)):
                    question_heading = self.question_heading

                for i in range(len(self)):
                    if isinstance(self.header, str):
                        header = {
                            "header": self.header
                            + str(i + 1)
                            + " D{}".format(
                                datetime.datetime.now().strftime("%d%m%y-%H%M%S")
                            )
                        }
                    else:
                        header = str(i + 1)
                    page_question.append(
                        [
                            header,
                            question_heading,
                            {"ol": self.Expre_Format(self[i])},
                            {"tag": "div", "div": "", "class": "break-page"},
                        ]
                    )
        return iter(page_question)

    def html(self, path=None, pwd=False, **kwargs):
        """
        title="Random Mathematics", css=None, js=None, body_attr=None, html5=True
        """
        question = json2html(list(self), **kwargs)
        if isinstance(path, str):
            return question.Html_file(path, pwd, html_attr=kwargs)
        else:
            return question.Html()

    def __getattr__(self, key):
        match key:
            case str():
                return self.__dict__.get(key)
            case int() if len(self.__dict__["args"]) > 0:
                return self.__dict__["args"][key]
            case _:
                raise AttributeError(f"can't get {key}")

    def __setattr__(self, key, item):
        self.__dict__[f"{key}"] = item

    def RMathematics(self):
        match str(self.name).lower() if isinstance(self.name, str) else self.name:
            case "arithmetic":
                if isinstance(self.arithmetic, dict) and self.arithmetic:
                    arithmetic = self.arithmetic
                else:
                    arithmetic = {
                        "name": "N",
                        "level": 0,
                        "operators": "basic",
                        "terms": 2,
                        "bodmas_rule": True,
                        "answer": True,
                    }

                match arithmetic.get("name"):
                    case "RATIONALIZE" | "QT":
                        self.mode_simplify = "radsimp"
                    case "(A + B)**2" | "(A + B)*(A - B)" | "(X + A)*(X + B)":
                        self.mode_simplify = "expand"
                    
                    case "X**2 + (A + B)*X + A*B" | "A**2 + 2*A*B + B**2":
                        self.mode_simplify = "factor"
                pages = RandArithmetic(**arithmetic)
                return list(pages)


if "__main__" == __name__:

    arithmetic = {
        "name": "N",
        "level": 1,
        "operators": "-",
        "terms": 2,
        "bodmas_rule": True,
        "number_of_question": 10,
        "number_of_page": 2,
    }
    a = RandMathematics(
        name="arithmetic",
        answer=True,
        header="आधुनिक विद्या निकेतन ट्यूशन सेंटर - ",
        question_heading={"div": "नाम :", "class": "name"},
        arithmetic=arithmetic,
    )
    html_attribute = {
        "css": ["css/a7_2.css"],
        "js": [
            [
                "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML",
                "async",
            ]
        ],
        "meta": [
            {
                "name": "viewport",
                "content": "width=device-width",
                "initial-scale": "1.0",
                "user-scalable": "yes",
            }
        ],
    }
    print(list(a))
    print(a)
    # a.html(script_pathdir + "/html/index.html", **html_attribute)
