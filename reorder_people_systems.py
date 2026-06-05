import os
import re

dir_path = r'c:\Users\lenovo\Desktop\dkvercell'

# We want to find the dropdown-content div and reorder the links inside it.
# Current order (approximately):
# 1. Leadership & Succession
# 2. Culture Activation
# 3. People Systems
# 4. Talent Assessment & Strategy

# Desired order:
# 1. Leadership & Succession
# 2. Culture Activation
# 3. Talent Assessment & Strategy
# 4. People Systems

# Regex to find the dropdown content and its links
dropdown_pattern = re.compile(
    r'(<div\s+class="dropdown-content">)(.*?)(</div>)',
    re.DOTALL
)

# Regex to find specific links
leadership_link = re.compile(r'<a\s+href="leadership-assessments\.html">Leadership\s+&\s+Succession</a>', re.IGNORECASE)
culture_link = re.compile(r'<a\s+href="culture-activation\.html">Culture\s+Activation</a>', re.IGNORECASE)
people_link = re.compile(r'<a\s+href="people-systems\.html">People\s+Systems</a>', re.IGNORECASE)
talent_link = re.compile(r'<a\s+href="talent-assessment\.html">Talent\s+Assessment\s+&\s+Strategy</a>', re.IGNORECASE)

def reorder_dropdown(match):
    prefix = match.group(1)
    content = match.group(2)
    suffix = match.group(3)
    
    # Extract links
    l_match = leadership_link.search(content)
    c_match = culture_link.search(content)
    p_match = people_link.search(content)
    t_match = talent_link.search(content)
    
    if not (l_match and c_match and p_match and t_match):
        return match.group(0) # something is different, skip
        
    l_html = l_match.group(0)
    c_html = c_match.group(0)
    p_html = p_match.group(0)
    t_html = t_match.group(0)
    
    new_content = f'\n                            {l_html}\n                            {c_html}\n                            {t_html}\n                            {p_html}\n                        '
    return f'{prefix}{new_content}{suffix}'

files_updated = 0
for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content, count = dropdown_pattern.subn(reorder_dropdown, content)
        
        if count > 0 and new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
            files_updated += 1

print(f"Total files updated: {files_updated}")
