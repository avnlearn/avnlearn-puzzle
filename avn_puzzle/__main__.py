import os
from pathlib import Path
import json
from bottle import Bottle, route, run, request, static_file, template, response, debug
from avn_puzzle.randmath import Web_Interface


# from avn_puzzle.randmath

__root_path__ = Path(os.path.dirname(__file__))
# __root_path__ = os.getcwd()
# Initialize Bottle app
app = Bottle()
debug(True)


# Brotli Middleware for Compression
class BrotliMiddleware:
    def __init__(self, app):
        self.app = app
    def __call__(self, environ, start_response):
        # Custom start_response to include Content-Encoding header
        def custom_start_response(status, headers, exc_info=None):
            headers.append(("Content-Encoding", "br"))
            return start_response(status, headers, exc_info)

        # Get the app's original response
        body = b"".join(self.app(environ, custom_start_response))

        # Compress the response body using Brotli
        compressed_body = brotli.compress(body)
        return [compressed_body]


app = BrotliMiddleware(app)


# Route for the home page
@route("/")
def home():
    response.set_header("Cache-Control", "no-cache")
    # return static_file("index.html", root=__root_path__ / "static")
    return template(
        "index",
        template_lookup=[str(__root_path__) + "/", str(__root_path__ / "view/")],
    )


@route("/sudoku")
def sudoku():
    return static_file("sudoku.html", root=__root_path__ / "static")


@route("/randmath")
def sudoku():
    return static_file("randmath.html", root=__root_path__ / "static")
    # return template("index")


@route("/wordsearch")
def sudoku():
    return static_file("wordsearch.html", root=__root_path__ / "static")
    # return template("index")


@route("/randmath", method="POST")
def randmath():
    data = request.json
    data = Web_Interface(
        name=data.get("name_of_number", "N"),
        level=int(data.get("level", "0")),
        operators=data.get("operation", "+"),
        terms=int(data.get("terms", "2")),
        number_of_question=int(data.get("number_of_question", "10")),
        number_of_page=int(data.get("number_of_page", "1")),
    )
    response.content_type = "application/json"
    return json.dumps(data)


# Route for serving static files
@route("/assets/<filepath:path>")
def assets(filepath):
    response.set_header("Cache-Control", "no-cache")
    return static_file(filepath, root=__root_path__ / "static" / "assets")


@route("/sitemap.xml")
def sitemap():
    response.content_type = "application/xml"
    return """<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
        <url>
            <loc>http://localhost:8080/</loc>
        </url>
        <url>
            <loc>http://localhost:8080/sudoku</loc>
        </url>
    </urlset>"""


if __name__ == "__main__":
    # Run the server
    # run(host="localhost", port=8080, reloader=True)
    run(host="0.0.0.0", port=8080, reloader=True)
