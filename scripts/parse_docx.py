import os
import sys
import docx
import json

sys.stdout.reconfigure(encoding='utf-8')

doc = docx.Document('CẨM NANG LỪA ĐẢO CN 4.0.docx')

paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

print(f"Total non-empty paragraphs: {len(paragraphs)}")

# Let's write out all paragraphs to a text file so we can inspect easily
with open('scripts/all_paragraphs.txt', 'w', encoding='utf-8') as f:
    for idx, p in enumerate(paragraphs):
        f.write(f"[{idx}] {p}\n")

print("Saved scripts/all_paragraphs.txt")
