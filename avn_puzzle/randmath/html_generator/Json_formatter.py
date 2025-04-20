#!/usr/bin/env python3
import os

# try:
#     from utils import Sympy
# except ModuleNotFoundError as e:
#     print(e)

# from sympy.parsing.sympy_parser import *
# from sympy.parsing.mathematica import mathematica
# from sympy.parsing.sym_expr import SymPyExpression
# from sympy.parsing.latex import parse_latex
# from sympy import *
# import os
import sys, sympy

script_pathdir = os.path.dirname(sys.argv[0])
current_pwd = os.getcwd()


class json2html:
    def __init__(self, item=None, *args, **kwargs):
        self.item = item
        if args:
            self.args = args
        if kwargs:
            self.kwargs = kwargs
            self.__dict__.update(kwargs)

        self.contants = self.Jhtml_format(item)

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

    def __str__(self):
        contants = ""
        if self.contants:
            contants = self.Jhtml_Str(self.contants)
        return str(contants)

    def Meta(self, meta=None):
        default_metas = [
            {
                "name": "viewport",
                "content": "width=device-width",
                "initial-scale": "1.0",
                "user-scalable": "yes",
            },
            {"charset": "UTF-8"},
            {"name": "Json Formatter", "content": "Randmath Generator for HTML"},
        ]
        if isinstance(meta, list):
            metas = []
            for default_meta in default_metas:
                if default_meta not in meta:
                    meta.append(default_meta)
            for item in meta:
                metas.append(self.Meta(item))
            return metas
        elif isinstance(meta, dict):
            return {"tag": "meta", "attr": meta, "meta": ""}
        elif isinstance(meta, str):
            return {"meta": "", "tag": "meta", "attr": {f"{meta}": str(meta)}}
        elif isinstance(self.meta, (list, dict, str)):
            return self.Meta(self.meta)
        else:
            return self.Meta(default_metas)
        return ""

    def Css(self, css=None):
        if isinstance(css, (list, tuple, set)):
            css = "\n".join(
                ['<link rel="stylesheet" href="{}">'.format(i) for i in css]
            )
        elif isinstance(css, str):
            css = self.Css([css])
        elif isinstance(self.css, (list, tuple, set)):
            css = self.Css(self.css)
        elif isinstance(self.css, str):
            css = self.Css([self.css])

        return css if isinstance(css, str) else ""

    def Js(self, js=None):
        math_js = [
            "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML",
            "async",
        ]

        if isinstance(js, (list, tuple, set)):
            if self.math_exist:
                if math_js not in js:
                    js.append(math_js)
            js = "\n".join(
                [
                    (
                        '<script {attr} src="{src}"></script>'.format(
                            src=i[0], attr=" ".join(i[1:])
                        )
                        if isinstance(i, list)
                        else '<script src="{}"></script>'.format(str(i))
                    )
                    for i in js
                ]
            )
        elif isinstance(js, str):
            js = self.Js([js])
        elif isinstance(self.js, (list, tuple, set)):
            js = self.Js(self.js)
        elif isinstance(self.js, str):
            js = self.Js([js])
        elif self.math_exist:
            js = self.Js([math_js])
        return js if isinstance(js, str) else ""

    def Body_attributes(self, body_attr=None):
        if isinstance(body_attr, dict):
            body_attr = {"tag": "body", "body": None, "attr": body_attr}
        elif isinstance(self.body_attr, dict):
            body_attr = self.Body_attributes(self.body_attr)

        return (
            body_attr if isinstance(body_attr, dict) else {"tag": "body", "body": None}
        )

    def Html(
        self, title=None, css=None, js=None, meta=None, body_attr=None, html5=True
    ):
        title = {"tag": "title", "title": "Random Mathematics"}
        if isinstance(title, str):
            title["title"] = title
        if isinstance(self.title, str):
            title["title"] = self.title

        css = self.Css(css)
        js = self.Js(js)
        meta = self.Meta(meta)

        body_attr = self.Body_attributes(body_attr)
        body_attr["body"] = self.contants
        html5_attr = ""
        if html5 or self.html5:
            html5_attr = {"tag": "str", "str": "<!DOCTYPE html>"}

        html_str = [
            html5_attr,
            {
                "tag": "html",
                "html": [{"tag": "head", "head": [meta, title, css, js]}, body_attr],
            },
        ]
        html_str = self.Jhtml_Str(html_str)
        return html_str

    def Html_file(self, path=None, pwd=False, html_attr={}):
        html_str = None
        if isinstance(html_attr, dict) and html_attr:
            html_str = self.Html(**html_attr)
        else:
            html_str = self.Html()
        file_path = ""
        if isinstance(pwd, bool) and pwd:
            file_path += current_pwd + "/"
        if isinstance(path, str):
            file_path += path

        if isinstance(html_str, str):
            html_file_json_formatter = open(file_path, "w")
            html_file_json_formatter.write(html_str)
            html_file_json_formatter.close()
            return True

    def Attribute_Str(self, attr):
        attr_str = []
        for item in attr:
            match item:
                case "class":
                    attr_str.append(
                        'class="{}"'.format(
                            " ".join(map(str, attr[item]))
                            if isinstance(attr[item], list)
                            else str(attr[item])
                        )
                    )
                case "data":
                    attr_str.append(
                        " ".join(
                            [
                                f'data-{key}="{value}"'
                                for key, value in attr[item].items()
                            ]
                        )
                    )
                case _:
                    attr_str.append('{}="{}"'.format(item, str(attr[item])))
        if attr_str:
            return " " + " ".join(attr_str)
        return ""

    def Jhtml_Str(self, contents):
        json_str = ""
        match contents:
            case list():
                contents = "".join([self.Jhtml_Str(item) for item in contents])
            case dict():

                tagname = contents["tag"]
                if contents.get("math") != None:
                    display_format = "\\({}\\)"
                    match self.math_format:
                        case "latex":
                            if contents.get("display"):
                                display_format = "\\[{}\\]"
                            contents.update(
                                {
                                    tagname: display_format.format(
                                        latex(Sympy(contents[tagname]))
                                    )
                                }
                            )
                        case "mathml":
                            contents.update({"math": mathml(Sympy(contents[tagname]))})
                            del contents[tagname]
                            contents["tag"] = "math"
                            tagname = "math"
                        case "$$" | "$" | False:
                            match self.math_format:
                                case "$$":
                                    contents[tagname] = "$${}$$".format(
                                        contents[tagname]
                                    )
                                case "$":
                                    contents[tagname] = "${}$".format(contents[tagname])
                            contents.update({"str": contents[tagname]})
                            del contents[tagname]
                            contents["tag"] = "str"
                            tagname = "str"
                        case _:
                            if contents.get("display"):
                                display_format = "\\[{}\\]"
                            contents[tagname] = display_format.format(contents[tagname])

                content = contents[tagname]
                if content != None:
                    content = self.Jhtml_Str(content)
                else:
                    content = ""

                match tagname:
                    case "str":
                        contents = f"{content}"
                    case _:
                        Attributes = ""
                        if contents.get("attr"):
                            Attributes = self.Attribute_Str(contents["attr"])

                        html_formatter = "<{tag}{attr}>{contents}</{tag}>"
                        if tagname in ("meta"):
                            html_formatter = "<{tag}{attr}>"
                        contents = html_formatter.format(
                            tag=tagname, contents=content, attr=Attributes
                        )
            case _:
                contents = str(contents)
        return contents

    def Attribute_format(self, jhtml, **kwargs):

        if isinstance(jhtml, list):
            return self.Hson(jhtml)
        elif not isinstance(jhtml, dict):
            return {"tag": "str", "str": str(jhtml)}

        jhtml = {str(i).lower(): jhtml[i] for i in jhtml}

        for key in jhtml.keys():
            match key:
                case "attribute" | "attributes" if "attr" not in jhtml:
                    jhtml.update({"attr": jhtml[key]})
                case "tag" | "tags" | "html_tag" if "tag" not in jhtml:
                    jhtml.update({"tag": jhtml[key]})
                case "str" | "string" | "contents" | "content":
                    jhtml.update({"str": jhtml[key]})

        attrs = ["class", "id", "data", "style"]
        match jhtml.get("attr"):
            case str() | list():
                jhtml.update({"attr": {"str": str(jhtml["attr"])}})
            case dict():
                for attr in attrs:
                    if attr in jhtml["attr"]:
                        match attr:
                            case "class" if not isinstance(jhtml["attr"][attr], list):
                                jhtml["attr"].update({attr: [str(jhtml["attr"][attr])]})
                            case "data" if not isinstance(jhtml["attr"][attr], dict):
                                if isinstance(jhtml["attr"][attr], list):
                                    attr_data = {}
                                    for item in jhtml["attr"][attr]:
                                        if isinstance(item, dict):
                                            attr_data.update(item)
                                        else:
                                            attr_data.update({str(item): str(item)})
                                    jhtml["attr"].update({attr: attr_data})
                                else:
                                    jhtml["attr"].update(
                                        {
                                            attr: {
                                                str(jhtml["attr"][attr]): str(
                                                    jhtml["attr"][attr]
                                                )
                                            }
                                        }
                                    )
                            case (
                                "id" | "style" | "rowspan" | "colspan"
                            ) if not isinstance(jhtml["attr"][attr], str):
                                jhtml["attr"].update({attr: str(jhtml["attr"][attr])})
            case None:
                jhtml.update({"attr": {}})

        if "attr" not in jhtml:
            jhtml.update({"attr": {}})

        for attr in attrs:
            if attr in jhtml:
                match attr:
                    case "class" if not isinstance(jhtml[attr], list):
                        jhtml.update({attr: [str(jhtml[attr])]})
                        if attr in jhtml.get("attr"):
                            jhtml["attr"][attr] += jhtml[attr]
                        else:
                            jhtml["attr"].update({attr: jhtml[attr]})

                        del jhtml[attr]
                    case "data" if isinstance(jhtml[attr], dict):
                        if jhtml["attr"].get(attr) == None:
                            jhtml["attr"].update({attr: {}})
                        jhtml["attr"][attr].update(jhtml[attr])
                    case "id" | "style" if not isinstance(jhtml[attr], str):
                        jhtml.update({attr: str(jhtml[attr])})
                        if attr in jhtml.get("attr"):
                            if attr == "id":
                                jhtml["attr"].update({attr: jhtml[attr]})
                            else:
                                jhtml["attr"][attr] += f";{jhtml[attr]}"
                        else:
                            jhtml["attr"].update({attr: jhtml[attr]})
                        del jhtml[attr]

        if jhtml.get("tag") == None:
            jhtml.update({"tag": None})
            html_tags = [
                "header",
                "table",
                "tr",
                "td",
                "th",
                "math",
                "div",
                "str",
                "body",
                "head",
                "ul",
                "ol",
                "li",
                "table",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "span",
                "p",
                "math",
                "meta",
                "ins",
                "b",
                "strong",
                "i",
            ]
            for html_tag in html_tags:
                if html_tag in jhtml:
                    jhtml.update({"tag": html_tag})
                    break
        if "math" in jhtml:

            self.math_exist = True  # Using Math in javascript

            mathml_format_html = False
            match self.math_format:
                case "mathml":
                    mathml_format_html = True

            if not isinstance(jhtml["attr"].get("class"), list):
                jhtml["attr"].update({"class": []})

            if mathml_format_html != True:
                if not isinstance(jhtml["attr"].get("data"), dict):
                    jhtml["attr"].update({"data": {}})
                if "math" not in jhtml["attr"]["class"]:
                    jhtml["attr"]["class"] += ["math"]

            if jhtml.get("display") and "display" not in jhtml["attr"]["class"]:
                if mathml_format_html == True:
                    jhtml["attr"].update({"display": "block"})
                else:
                    jhtml["attr"]["class"] += ["display"]
            elif "inline" not in jhtml["attr"]["class"]:
                if mathml_format_html == True:
                    jhtml["attr"].update({"display": "inline"})
                else:
                    jhtml["attr"]["class"] += ["inline"]

            if mathml_format_html != True:
                if (
                    "data-math-typeset" not in jhtml["attr"]
                    and "math_typeset" not in jhtml["attr"]["data"]
                ):
                    jhtml["attr"]["data"].update({"math-typeset": "true"})

            if self.sympy == True:
                jhtml.update({"span": latex(jhtml["math"])})
            else:
                jhtml.update({"span": str(jhtml["math"])})

            jhtml["math"] = True
            jhtml["tag"] = "span"

            if len(jhtml["attr"].get("class")) == 0:
                jhtml["attr"].pop("class")

        if len(jhtml.get("attr")) == 0:
            jhtml.pop("attr")

        if jhtml.get("tag") == None:
            jhtml["tag"] = "str"
        else:
            if not jhtml[jhtml["tag"]]:
                jhtml[jhtml["tag"]] = None

        return jhtml

    def Jhtml_format(self, items, tagname=None):

        if not items:

            return
        json_html = []
        default_tag = None
        match items:
            case list():
                match tagname:
                    case "tr":
                        json_html = {
                            "tag": tagname,
                            tagname: [
                                self.Jhtml_format(item, tagname="td") for item in items
                            ],
                        }
                    case _:
                        json_html = [self.Jhtml_format(item) for item in items]

            case dict():

                json_html = self.Attribute_format(items)
                item_tag = json_html["tag"]
                html_table_tags = ["thead", "tbody", "tfoot", "caption"]
                match item_tag:
                    case "table" if any(
                        json_html.get(i) != None for i in html_table_tags
                    ):
                        for html_table_tag in html_table_tags:
                            if json_html.get(html_table_tag):
                                json_html[html_table_tag] = self.Jhtml_format(
                                    json_html[html_table_tag], tagname=html_table_tag
                                )
                                json_html[html_table_tag] = self.Jhtml_format(
                                    json_html[html_table_tag]
                                )

                match item_tag:
                    case "ul" | "ol" | "tr" if isinstance(
                        json_html[item_tag], (list, tuple, set)
                    ):
                        match item_tag:
                            case "ul" | "ol":
                                tagname = "li"
                            case "tr":
                                tagname = "td"
                        json_html[item_tag] = [
                            (
                                {"tag": tagname, tagname: self.Jhtml_format(item)}
                                if isinstance(item, list)
                                else self.Jhtml_format(item, tagname=tagname)
                            )
                            for item in json_html[item_tag]
                            if item
                        ]
                    case "table":
                        tagname = "tr"
                        json_html[item_tag] = [
                            self.Jhtml_format(item, tagname=tagname)
                            for item in json_html[item_tag]
                            if item
                        ]
                    case "ul" | "ol" | "table":
                        json_html[item_tag] = [items]
                        json_html = self.Jhtml_format(json_html)
                    case "th" if isinstance(tagname, str):
                        json_html["tr"] = [
                            self.Jhtml_format(item, tagname="th")
                            for item in json_html[item_tag]
                        ]
                        del json_html[item_tag]
                        json_html["tag"] = "tr"
                    case "str" if isinstance(tagname, str):
                        json_html[tagname] = json_html["str"]
                        del json_html["str"]
                        json_html["tag"] = tagname
                    case _ if item_tag in html_table_tags:
                        json_html[item_tag] = {
                            "tag": "tr",
                            "tr": [
                                self.Jhtml_format(item, tagname="td")
                                for item in json_html[item_tag]
                                if item
                            ],
                        }
                    case _ if isinstance(tagname, str):
                        json_html = {"tag": tagname, tagname: json_html}
                    case _:
                        if isinstance(
                            json_html[item_tag], (dict, list, tuple, set, sympy.Basic)
                        ):
                            json_html[item_tag] = self.Jhtml_format(json_html[item_tag])

            case tuple():
                default_tag = tagname if isinstance(tagname, str) else "ol"
                items = list(items)
            case set():
                default_tag = tagname if isinstance(tagname, str) else "ul"
                items = list(items)
            case Basic():
                default_tag = tagname if isinstance(tagname, str) else "math"
            case _:
                default_tag = tagname if isinstance(tagname, str) else "str"
                items = str(items)

        if default_tag != None:
            json_html = self.Jhtml_format({"tag": default_tag, default_tag: items})
        self.contants = json_html
        return json_html


if "__main__" == __name__:
    html = [
        {
            "UL": [
                {
                    "math": "\\left(-14\\right) + \\left(-3\\right) - \\left(-2\\right) + 9 - 6",
                    "class": "question",
                    "id": 2,
                    "attr": {"class": "Hello", "id": 4},
                },
                {
                    "math": "\\left(-4\\right) + 2 - \\left(-8\\right) + 9 - \\left(-2\\right)",
                    "class": "question",
                },
                {
                    "math": "\\left(-6\\right) - \\left(-95\\right) + 83 + \\left(-70\\right) + 16",
                    "class": "question",
                },
                {
                    "math": "4 - 94 - 84 - \\left(-58\\right) + \\left(-85\\right)",
                    "class": "question",
                },
                {
                    "math": "83 + 6 - \\left(-6\\right) - 7 - \\left(-8\\right)",
                    "class": "question",
                },
            ]
        }
    ]
    # html = {"table": [[{"span": 1, "class": "header", "attr": {
    #     "colspan": "2"}}, 3, 3], [5, 7, 8], {"th": ['a', 'b', 'c']}]}
    # html = {"table": [1, 2], "tbody": {"str": [1, 2], "class": "Hello"}}
    # html = {"h1": "Hello world", "data": {
    #     "helo": "2"}, "attr": {"data": [{"go": "3"}]}}
    # html = {"math": "(-1) \\times 3"}
    html = {
        "div": [{"div": "नाम :", "class": "name"}, {"div": "", "class": "fill_name"}],
        "class": "info",
    }
    a = json2html(html, math_format="latex")
    print(a)
