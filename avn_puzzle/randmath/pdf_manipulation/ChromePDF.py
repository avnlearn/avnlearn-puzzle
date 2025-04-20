#!/usr/bin/env python3
from chromepdf import generate_pdf

with open('/mnt/Develop/eBooks/Scripts/Portables/lib/Question/RandMath/html/index.html', 'r') as f:
    html_string = f.read()

pdf_kwargs = {
    'paperFormat': 'A5',
    'marginTop': '2.5cm',
    'marginLeft': '2cm',
    'marginRight': '2cm',
    'marginBottom': '3.5cm',
    'displayHeaderFooter': True,
    'headerTemplate': '',
    'footerTemplate': '''
        <div style='font-size: 12px; width: 100%; padding: 0; padding-left: 2cm; padding-bottom: 1cm; margin: 0; '>
            Page <span class='pageNumber'></span> of <span class='totalPages'></span>
        </div>
    ''',
}
pdf_bytes = generate_pdf(html_string, pdf_kwargs)

with open('myfile.pdf', 'wb') as file:
    file.write(pdf_bytes)
