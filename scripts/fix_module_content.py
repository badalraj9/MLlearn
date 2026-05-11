import re

def fix_ocr_artifacts():
    filepath = 'src/content/modules.ts'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ligatures and common symbols
    replacements = {
        '\ufb01': 'fi',
        '\ufb00': 'ff',
        '\ufb02': 'fl',
        '\ufb03': 'ffi',
        '\ufb04': 'ffl',
        '\ue03e': '^T',
        '\ue058': '\\Sigma ',
        '\ue059': '\\prod ',
        '\u2019': "'",
        '\u201c': '"',
        '\u201d': '"',
        '\u2014': '-',
    }

    for old, new in replacements.items():
        content = content.replace(old, new)

    # Regex replacements for bad spacing
    regex_repls = [
        (r'\bb oth\b', 'both'),
        (r'\btak e\b', 'take'),
        (r'\blo wercase\b', 'lowercase'),
        (r'\bhav e\b', 'have'),
        (r'\bkno w\b', 'know'),
        (r'\bofit\b', 'of it'),
        (r'\bnotonly\b', 'not only'),
        (r'\bdonot\b', 'do not'),
        (r'\binv olving\b', 'involving'),
        (r'\binv olv es\b', 'involves'),
        (r'\bnum ber\b', 'number'),
        (r'\bnum bers\b', 'numbers'),
        (r'\barra ys\b', 'arrays'),
        (r'\bman y\b', 'many'),
        (r'\btyp ically\b', 'typically'),
        (r'\bt w o\b', 'two'),
        (r'\beac h\b', 'each'),
        (r'\bofit \b', 'of it '),
        (r'\bnotonly \b', 'not only '),
        (r'\bdonot \b', 'do not '),
        (r'\bofits\b', 'of its'),
        (r'\bforit\b', 'for it'),
        (r'\bisit\b', 'is it'),
    ]

    for pat, rep in regex_repls:
        content = re.sub(pat, rep, content)

    # Missing space before "of"
    words_before_of = [
        "presentation", "point", "kinds", "subset", "multiplication", 
        "distribution", "number", "elements", "part", "function", 
        "value", "series", "set", "form", "amount", "case", "example", 
        "result", "values", "concept", "type", "types", "use", "sum", 
        "product", "combination", "rules", "understanding", "array"
    ]
    for w in words_before_of:
        content = re.sub(rf'\b{w}of\b', f'{w} of', content)

    # Clear repetitive keyIdeas
    content = re.sub(
        r'"keyIdeas": \[\s*"[^"]+",\s*"[^"]+",\s*"[^"]+"\s*\]',
        r'"keyIdeas": []',
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Fixed OCR artifacts in {filepath}")

if __name__ == '__main__':
    fix_ocr_artifacts()
