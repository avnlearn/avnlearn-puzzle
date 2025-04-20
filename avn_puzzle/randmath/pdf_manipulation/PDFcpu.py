#!/usr/bin/env python3
import subprocess
import json
import os
import sys
import fileinput
import pathlib
import tempfile
import shutil
import datetime
import webbrowser
from PyPDF2 import PdfFileReader, PdfFileWriter


def is_command(cmd_name):
    """Check whether `name` is on PATH and marked as executable."""
    if shutil.which(cmd_name):
        return True
    raise Exception(f"{cmd_name} is not exist!")


def run_command(cmd, *args, **kwargs):
    is_command(cmd)
    try:
        args = [cmd] + list(args)
        args = map(str, filter(None, args))
        result = subprocess.run(
            args, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
        )

        if result.returncode == 0:
            return result.stdout

        print("Error executing command (return code {}):".format(result.returncode))
        raise Exception(result.stderr)
    except FileNotFoundError as exc:
        raise Exception(
            f"Process failed because the executable could not be found.\n{exc}"
        )
    except subprocess.CalledProcessError as exc:
        raise Exception(
            f"Process failed because did not return a successful return code. "
            f"Returned {exc.returncode}\n{exc}"
        )
    except Exception as e:
        raise Exception(f"{e}")


def Assign_Value(*args, type_lst: tuple = None, default=None):
    for var in args:
        if isinstance(var, type_lst) and var:
            return var

    return default


class Vivliostyle:
    def __init__(self, source, outFile=None, *args, **kwargs):
        self.source = source
        self.outFile = outFile

    def vivliostyle(self, *args, stdout=False, **kwargs):
        result = run_command("vivliostyle", *args)
        return result if stdout else True

    def Preview(self, source=None, browser=False):
        inFile = Assign_Value(source, self.source, type_lst=str, default=None)
        if not os.path.exists(inFile):
            raise Exception("{} is not exist!".format(inFile))
        if browser:
            webbrowser.open(inFile)
        else:
            self.vivliostyle("preview", inFile)

    def webbrowser(self, source=None):
        self.Preview(source, browser=True)

    def Build(self, source=None, outFile=None, dirname=None):
        inFile = Assign_Value(source, self.source, type_lst=str, default=None)
        if not os.path.exists(inFile):
            raise Exception("{} is not exist!".format(inFile))

        if outFile in (None, False, True):
            if outFile in (None, True):
                filename = pathlib.Path(inFile).stem
            elif outFile == False:
                filename = datetime.datetime.now().strftime("%y%m%d_%H%M%S")
                filename = "vivliostyle-{filename}"
            if not isinstance(dirname, str) and not dirname:
                dirname = os.path.dirname(inFile)
            outFile = "{dirname}/{filename}.pdf".format(
                dirname=dirname, filename=filename
            )
        # print("build", inFile, "-o", outFile)
        result = self.vivliostyle("build", inFile, "-o", outFile, stdout=True)
        if result:
            print("Successful create - ", result)
            return outFile

    def Replace(self, old_str, new_str):
        if not isinstance(old_str, str):
            return False
        if not isinstance(new_str, str):
            return False
        if not isinstance(self.source, str):
            return False
        if os.path.exists(self.source):
            with open(self.source, "r") as file:
                content = file.read()
            update_content = content.replace(old_str, new_str)
            with open(self.source, "w") as file:
                file.write(update_content)


class PDFcpu:
    def __init__(self, source=None, *args, **kwargs):
        self.source = source
        if args:
            self.args = args

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

    def pdfcpu(self, *args, stdout=False):
        result = run_command("/home/linuxbrew/.linuxbrew/bin/pdfcpu", *args)
        return result if stdout else True

    def info(self, source=None, information=None):
        inFile = None
        inFile = Assign_Value(source, self.source, type_lst=str, default=None)

        if not inFile.endswith(".pdf"):
            return None

        info = self.pdfcpu("info", "-json", inFile, stdout=True)
        if isinstance(info, (bytes, str)):
            info = json.loads(info)
        
        match information if isinstance(info, dict) else None:
            case True | "infos":
                
                info = info.get("infos")
                
                if isinstance(info, list) and info:
                    return info[0]
            case False | "header":
                info = info.get("header")
                if isinstance(info, dict) and info:
                    return info
            case _:
                return info

    def filename(self, source=None, dirname=None):
        info = self.info(source, information=True)
        
        if isinstance(info, dict) and info:
            source = info.get("source")

        if not isinstance(source, str):
            return None
        if dirname:
            return os.path.dirname(source)
        return source

    def __str__(self):
        return self.filename()

    def __len__(self):
        return self.page_number()

    def page_number(self, source=None):
        info = self.info(source, True)
        
        if not isinstance(info, dict) and not info:
            return 0
        return info.get("pageCount")

    def Output_generator(
        self, outFile, output=False, prefix=None, sufix=None, dirname=""
    ):
        if outFile != False:
            inFile = self.filename(outFile)
            if not isinstance(inFile, str) and not inFile:
                return None
            filename = "{prefix}{basename}{sufix}.pdf".format(
                basename=pathlib.Path(inFile).stem,
                sufix=sufix if sufix != None else "",
                prefix=prefix if prefix != None else "",
            )

        match output:
            case False:
                dirname = os.path.dirname(inFile)

            case "tmp":
                dirname = tempfile.mkdtemp()
            case "file":
                dirname = os.path.dirname(dirname)
            case "date":
                filename = datetime.datetime.now().strftime("%y%m%d_%H%M%S")
                filename = "{prefix}{filename}{sufix}".format(
                    filename=filename,
                    prefix=prefix if prefix != None else "",
                    sufix=sufix if sufix != None else "",
                )
        if dirname:
            outFile = os.path.join(dirname, filename)
            return outFile
        else:
            return filename

    def nup(
        self, n, outFile=None, description: str = "", source=None, page=None, sufix=None
    ):
        if not isinstance(n, int):
            return False

        if n not in (2, 3, 4, 8, 9, 12, 16):
            return False

        if outFile == None:
            if sufix == None:
                sufix = "-nup_" + str(n)
            outFile = self.Output_generator(outFile, sufix=sufix)
        elif not isinstance(outFile, str):
            return False

        if isinstance(description, str) and description:
            description = ["--", description]
        else:
            description = []

        if isinstance(page, (str, int)):
            page = ["-pages", page]
        else:
            page = []

        inFile = self.filename(source)
        if isinstance(inFile, str) and inFile:
            return self.pdfcpu(
                "nup", *page, *description, outFile, n, inFile, stdout=False
            )
        else:
            return False

    def booklet(
        self, n, outFile=None, description: str = "", source=None, page=None, sufix=None
    ):
        if not isinstance(n, int):
            return False

        if n not in (2, 4, 6, 8):
            return False

        if outFile == None:
            if sufix == None:
                sufix = "-booklet_" + str(n)
            outFile = self.Output_generator(outFile, sufix=sufix)
        elif not isinstance(outFile, str):
            return False

        if isinstance(description, str) and description:
            description = ["--", description]
        else:
            description = []

        if isinstance(page, (str, int)):
            page = ["-pages", page]
        else:
            page = []

        inFile = self.filename(source)
        if isinstance(inFile, str) and inFile:
            return self.pdfcpu(
                "booklet", *page, *description, outFile, n, inFile, stdout=False
            )
        else:
            return False

    def Collects(self, outFile=None, source=None, n=None):
        if isinstance(n, int) and n:
            if n < 0:
                return False
        elif not isinstance(n, str) and not n:
            return False

        inFile = self.filename(source)

        if outFile == None:
            outFile = self.Output_generator(outFile, output="tmp")
        elif outFile == False:
            outFile = ""

        if self.pdfcpu("collect", "-pages", n, inFile, outFile):
            return outFile

    def resize(self, source=None, outFile=False, description="form:A4"):
        inFile = self.filename(source)
        if not isinstance(outFile, str) and not outFile:
            outFile = ""
        return self.pdfcpu("resize", description, inFile, outFile)

    def rotate(self, rotation="90", source=None, outFile=None, page=None):
        rotation = str(rotation)
        if rotation not in ("-270", "-180", "-90", "90", "180", "270"):
            return False
        if not isinstance(outFile, str) and not outFile:
            outFile = ""

        if not isinstance(page, str) and not page:
            page = []
        else:
            page = ["-pages", page]
        inFile = self.filename(source)
        return self.pdfcpu("rotate", *page, inFile, rotation, outFile)

    def append(
        self, inFiles: list, outFile=None, mode="append", attr=[], shuffle=False
    ):
        
        if mode not in ("append", "create", "zip"):
            return False
        else:
            mode = ["-mode", mode]

        if not isinstance(inFiles, list) and not inFiles:
            return False
        if not all(os.path.exists(i) for i in inFiles):
            return False
        if outFile == None:
            outFile = self.Output_generator(
                False,
                output="date",
                prefix="Append_Output-",
                sufix=".pdf",
                dirname=os.path.dirname(inFiles[0]),
            )

        append_bool = self.pdfcpu("merge", *mode, *attr, outFile, *inFiles)
        if shuffle and append_bool:
            
            first_pdf_pagenumber = self.page_number(inFiles[0])
            outFile_pagenumber = self.page_number(outFile)
            
            if first_pdf_pagenumber and outFile_pagenumber:
                n = ",".join(
                    [
                        ",".join([str(i), str(i + first_pdf_pagenumber)])
                        for i in range(1, first_pdf_pagenumber + 1)
                    ]
                )
                
                shuffle_outFile = self.Output_generator(
                    outFile=outFile,
                    output="file",
                    sufix="-shuffle-nup",
                    dirname=outFile,
                )
                self.Collects(outFile=False, source=outFile, n=n)
                return shuffle_outFile
        elif append_bool:
            return True

    def Nup(self, n, outFile=None, source=None):
        description = "form:A4, margin:0, border:on"
        match n:
            case "a5" | 5 | 2:
                n = 2
            case "a6" | 6 | 4:
                n = 4
            case "a7" | 7 | 8:
                n = 8

        if n in (2, 4, 8):
            page_number = self.page_number(source)
            pages_collects = []
            if page_number < n:
                for i in range(1, page_number + 1):
                    pages_collects += [str(i) for j in range(n)]
                pages_collects = ",".join(pages_collects)
                outFile = self.Collects(outFile=outFile, source=None, n=pages_collects)
            self.resize(outFile)
            self.nup(n=n, description=description, source=outFile, page=page)
            shutil.rmtree(os.path.dirname(outFile))
            return True

    def nup_double(self, n, outFile=None, source=None):
        description = "form:A4, margin:0, border:on"
        match n:
            case "a5" | 5 | 2:
                n = 2
            case "a6" | 6 | 4:
                n = 4
            case "a7" | 7 | 8:
                n = 8
            case _:
                return None

        source = self.filename(source)
        resize = self.Output_generator(outFile, output="tmp", sufix="-resize_" + str(n))

        self.resize(source, resize)
        self.rotate(rotation="180", source=resize, page="even")
        even = self.Output_generator(resize, sufix="-even_" + str(n))

        self.nup(
            n=n,
            outFile=even,
            description=description + ",orientation:ld",
            source=resize,
            page="even",
        )

        odd = self.Output_generator(resize, sufix="-odd_" + str(n))

        self.nup(n=n, outFile=odd, description=description, source=resize, page="odd")

        outFile = self.Output_generator(
            None, output="file", sufix="-nup_double_" + str(n), dirname=source
        )

        inFile = self.append([odd, even], outFile=outFile, shuffle=True)

        shutil.rmtree(os.path.dirname(resize))

    def Booklet(self, n, outFile=None, source=None):
        description = "form:A4, margin:0, border:off"
        page_number = self.page_number(source)
        pages_collects = None
        match n:
            case 2 | "a5":
                n = 2
                match page_number:
                    case 1:
                        pages_collects = ["1"] * 4
                    case 2:
                        pages_collects = ["1"] + ["2"] * 2 + ["1"]
                pages_collects = (
                    ",".join(pages_collects)
                    if isinstance(pages_collects, list)
                    else pages_collects
                )
            case 4 | "a6":
                n = 4
                match page_number:
                    case 1:
                        pages_collects = ["1"] * 8
                        pages_collects = ",".join(pages_collects)
                    case 2:
                        pages_collects = "1,2,2,1,1,2,2,1"
                    case 4:
                        pages_collects = "1,2,3,4,1,2,3,4"
            case 6:
                n = 6
                match page_number:
                    case 1:
                        pages_collects = "1,1,1,1,1,1"
                    case 2:
                        pages_collects = "1,2,2,1,1,2,2,1,2,2,2"
                    case 4:
                        pages_collects = "1,2,,,,,3,4"
            case 8 | "a7":
                n = 8
                match page_number:
                    case 1:
                        pages_collects = "1,1,1,1,1,1"
                    case 2:
                        pages_collects = "1,2,2,2,2,2,2,2,2,1"
            case _:
                return
        outFile = self.filename(outFile)

        if isinstance(pages_collects, str):
            inFile = self.Collects(source=outFile, n=pages_collects)
            self.resize(inFile)
        else:

            inFile = self.Output_generator(outFile, output="tmp")

            self.resize(outFile, inFile)

        outFile = self.Output_generator(
            inFile, output="file", sufix="-booklet-" + str(n), dirname=outFile
        )

        self.booklet(n=n, outFile=outFile, source=inFile, description=description)

        shutil.rmtree(os.path.dirname(inFile))


if "__main__" == __name__:
    pdf_a = PDFcpu(
        "/mnt/Develop/eBooks/Textbooks/Dist/PDF/Exam/Class XII/Sc_10-09-2024.pdf"
    )
    
    pass
