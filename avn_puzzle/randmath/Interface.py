import subprocess
import signal
from appJar import gui
from RMathematics import RandArithmetic, RandUnit, RandMathematics
from pdf_manipulation import Vivliostyle, PDFcpu
import os
import sys
import datetime
import shutil

script_pathdir = os.path.dirname(sys.argv[0])
_html_info_heading = {
    "div": [{"div": "नाम :", "class": "name"}, {"div": "", "class": "fill_name"}],
    "class": "info",
}
_header_question = "आधुनिक विद्या निकेतन ट्यूशन सेंटर - "


class RandInterface(gui):
    def __init__(self, cli=None, *args, **kwargs):
        super().__init__(title="Random Mathematics", geom="350x300")
        self.cli = cli
        self.html_file_path = script_pathdir + "/html/index.html"
        self.current_dir_path = os.getcwd()
        if args:
            self.args = args
        if kwargs:
            self.kwargs = kwargs

        self.startLabelFrame("Page Setting")
        self.addCheckBox("double_side", name="Double Side", row=0, column=0)
        self.addCheckBox("markdown", name="Markdown", row=0, column=1)

        self.addLabel("number_of_question", "Number of question", row=1, column=0)
        self.addSpinBoxRange("number_of_question", 1, 1000, row=1, column=1)
        self.setSpinBox("number_of_question", 25)

        self.addLabel("number_of_page", "Number of pages", row=2, column=0)
        self.addSpinBoxRange("number_of_page", 1, 1000, row=2, column=1)
        self.setSpinBox("number_of_page", 24)

        self.addLabel("page_size", "Page sizes", row=3, column=0)
        self.addOptionBox("page_size", ["A7", "A6", "A5", "A4"], row=3, column=1)

        self.addLabel("level", "Level", row=4, column=0)
        self.addSpinBoxRange("level", 0, 12, row=4, column=1)
        self.addLabel("name_of_number", "Number name", row=5, column=0)
        self.addOptionBox(
            "name",
            [
                "N",
                "Z",
                "F",
                "D+",
                "Q",
                "D",
                "QD+",
                "QD",
                "P+",
                "P",
                "T+",
                "T",
                "Rationalize",
                "R+",
                "R",
                "C+",
                "C",
                # "S+",
                "S",
                "A",
                "(a + b)**2",
                "a**2 + 2*a*b + b**2",
                "(a + b)*(a - b)",
                "(x + a)(x + b)",
                "x**2 + (a + b)*x + a*b",
                "Algebra_simplify"
            ],
            row=5,
            column=1,
        )
        self.stopLabelFrame()
        self.addStatusbar(fields=2)
        self.Status_Bar()
        self.Types_Mathematics()
        self.addButtons(["Arithmetic", "Algebra"], self.Launch)
        self.addButtons(
            ["Generator", "Preview", "Build", "Browser", "Close"], self.Launch
        )

    def Status_Bar(self, field=None, message=None):

        if field == None:
            message = (
                self.Operation_Type_Name
                if isinstance(self.Operation_Type_Name, str)
                else "None"
            )
            self.setStatusbar("Operation Type : " + message, 0)
            self.setStatusbar("Process : None", 1)
        elif isinstance(field, int):
            message = message if isinstance(message, str) else "None"
            match field:
                case 0:
                    self.setStatusbar("Operation Type : " + message, 0)
                case 1:
                    self.setStatusbar("Process :" + message, 1)

    def Launch(self, win):
        match win:
            case "Close":
                if os.path.exists(self.html_file_path):
                    os.remove(self.html_file_path)
                self.stop()
            case "exit_arithmetic" | "apply_arithmetic":
                self.hideSubWindow("Arithmetic")
            case "Generator":
                if self.Operation_Type_Name == None:
                    self.infoBox("Type Operation", "Plase operation type click")
                    return
                self.Status_Bar(1, "Generator Math ...")
                self.setStatusbarBg("purple", 1)
                self.Generator(self.Operation_Type_Name)
            case "Preview" | "Build" | "Browser":
                match win:
                    case "Preview":
                        self.Build(preview=True)
                    case "Browser":
                        self.Build(preview=None)
                    case "Build":
                        self.Build()
            case _:
                self.Operation_Type_Name = win
                self.Status_Bar()
                self.showSubWindow(win)

    def Generator(self, win):
        match win:
            case "Arithmetic":
                checkboxes = self.getAllCheckBoxes()
                optionboxes = self.getAllOptionBoxes()

                spinboxes = self.getAllSpinBoxes()
                arithmetic = {**optionboxes, **spinboxes}

                arithmetic = self.Attribute_Format(arithmetic)
                equal_sign_using = True
                newline = False
                match arithmetic.get("name"):
                    case "S" | "ALGEBRA_SIMPLIFY":
                        equal_sign_using = False
                        newline = True
                        html_attr = self.HTML_attributes(default_style="a7_algebra")
                    case "(A + B)*(A - B)" | "A**2 + 2*A*B + B**2" | "X**2 + (A + B)*X + A*B":
                        html_attr = self.HTML_attributes(default_style="a7_expend")
                    case "(A + B)**2":
                        html_attr = self.HTML_attributes(default_style="a7_identities")
                    case "RATIONALIZE" | "F":
                        html_attr = self.HTML_attributes(default_style="a7_rationalize")
                    
                    case _:
                        html_attr = self.HTML_attributes()
                rmath = RandMathematics(
                    name=win,
                    answer=True,
                    equal_sign_using=equal_sign_using,
                    newline=newline,
                    header=_header_question,
                    question_heading=_html_info_heading,
                    arithmetic=arithmetic,
                )

                self.Status_Bar(1, "Generator HTML")
                self.setStatusbarBg("darkgoldenrod1", 1)
                self.html_present = rmath.html(self.html_file_path, **html_attr)

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

    def Build(self, preview=False, pdfcpu=True):
        if not self.html_present and not os.path.exists(self.html_file_path):
            if self.yesNoBox(
                title="Vivliostyle",
                message="{} is not exit. and using current operation type".format(
                    self.html_file_path
                ),
            ):
                self.Launch("Generator")
                self.Build(preview, pdfcpu)
            else:
                return

            return
        Vivliostyle_html = Vivliostyle(self.html_file_path)
        if preview:
            Vivliostyle_html.Preview()
            return
        elif preview == None:
            Vivliostyle_html.webbrowser()
            return

        outFile = os.path.join(
            self.current_dir_path,
            "{}-{}".format(
                self.Operation_Type_Name,
                datetime.datetime.now().strftime("%d%m%y_%H%M%S"),
            ),
        )

        if not os.path.exists(outFile):
            os.mkdir(outFile)
        outFile = os.path.join(outFile, self.Operation_Type_Name)
        self.Status_Bar(1, "Generator PDF ...")
        self.setStatusbarBg("darkorchid1", 1)
        pdfcpu_path = Vivliostyle_html.Build(outFile=f"{outFile}.pdf")
        Vivliostyle_html.Replace("<body>", '<body class="ans">')
        self.Status_Bar(1, "Generator PDF Answer ...")
        self.setStatusbarBg("darkslateblue", 1)
        Vivliostyle_html.Build(outFile=f"{outFile}-Answer.pdf")
        if not os.path.exists(f"{outFile}.pdf"):
            self.errorBox(
                title="pdfcpu", message="{} is not exit!".format(f"{outFile}.pdf")
            )
            return
        pdfcpu_path = PDFcpu(f"{outFile}.pdf")
        self.Status_Bar(1, "Generator PDF Double Side ...")
        self.setStatusbarBg("darkviolet", 1)
        pdfcpu_path.nup_double(8)
        self.setStatusbarBg("red", 1)

    def HTML_attributes(self, css=[], js=[], default_style="a7_2"):
        attr = {"css": css}
        match default_style:
            case "a7_2" | "a7_algebra" | "a7_identities" | "a7_rationalize" | "a7_expend":
                attr["css"] += ["css/{}.css".format(default_style)]

        return attr

    def Attribute_Format(self, attr):
        attr = {
            str(key).lower().replace(" ", "_"): str(value).lower()
            for key, value in attr.items()
        }
        keys = list(attr.keys())
        for key in keys:
            match key:
                case "name":
                    attr.update({"name": str(attr[key]).upper()})
                case "operators" if attr[key] == "none":
                    attr[key] = "-"
                case _:
                    if isinstance(attr[key], str) and str(attr[key]).isdecimal():
                        attr[key] = int(attr[key])
        return attr

    def Types_Mathematics(self):
        self.startSubWindow("Arithmetic", modal=True)
        self.setSize(200, 100)
        self.addLabel("operator", "Operators :", row=0, column=0)
        self.addOptionBox(
            "operators",
            [
                "Beginner",
                "junior",
                "Basic",
                "+",
                "-",
                "*",
                "<<",
                ">>",
                "/",
                "*",
                "**",
                "~BODMAS",
                "as",
                "mas",
                "das",
                "dm" "dmas",
                "odmas",
                "~General",
                "s",
                "m",
                "b",
                "~Operator",
                "+-",
                "*<<",
                "+-*",
                "+-<<",
            ],
            disabled="~",
            row=0,
            column=1,
        )
        self.addLabel("terms", "Terms :", row=1, column=0)
        self.addSpinBoxRange("terms", 2, 20, row=1, column=1)
        self.addCheckBox("bodmas_rule", name="BODMAS Rule", row=2, column=0, colspan=2)
        print(self.getAllCheckBoxes())
        self.addNamedButton("Cancel", "exit_arithmetic", self.Launch, row=3, column=0)
        self.addNamedButton("Apply", "apply_arithmetic", self.Launch, row=3, column=1)
        self.stopSubWindow()

    def Change_PageSides(self, option):
        match self.getOptionBox("Page sides"):
            case "1":
                self.setSpinBox("Number of question", 18)
            case "2":
                self.setSpinBox("Number of question", 25)
            case "3":
                self.setSpinBox("Number of question", 35)
            case "4":
                self.setSpinBox("Number of question", 45)


if "__main__" == __name__:
    a = RandInterface()
    a.go()
