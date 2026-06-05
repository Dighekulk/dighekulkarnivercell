import os
import re

dir_path = r'c:\Users\lenovo\Desktop\dkvercell'

# Target Final Order:
# 1. Leadership & Assessment
# 2. Talent Assessment & Strategy
# 3. People Systems
# 4. Culture Activation

# Regex for the dropdown content
dropdown_pattern = re.compile(
    r'(<div\s+class="dropdown-content">)(.*?)(</div>)',
    re.DOTALL
)

# Individual link regexes (flexible on label since we might have renamed already)
leadership_pattern = re.compile(r'<a\s+href="leadership-assessments\.html">Leadership\s+&\s+.*?</a>', re.IGNORECASE)
culture_pattern = re.compile(r'<a\s+href="culture-activation\.html">Culture\s+Activation</a>', re.IGNORECASE)
people_pattern = re.compile(r'<a\s+href="people-systems\.html">People\s+Systems</a>', re.IGNORECASE)
talent_pattern = re.compile(r'<a\s+href="talent-assessment\.html">Talent\s+Assessment\s+&\s+Strategy</a>', re.IGNORECASE)

def fix_order(match):
    prefix = match.group(1)
    content = match.group(2)
    suffix = match.group(3)
    
    l_match = leadership_pattern.search(content)
    c_match = culture_pattern.search(content)
    p_match = people_pattern.search(content)
    t_match = talent_pattern.search(content)
    
    if l_match and c_match and p_match and t_match:
        l_html = l_match.group(0).replace('Succession', 'Assessment')
        c_html = c_match.group(0)
        p_html = p_match.group(0)
        t_html = t_match.group(0)
        
        # Correct order: Leadership, Talent, People, Culture
        new_content = f'\n                            {l_html}\n                            {t_html}\n                            {p_html}\n                            {c_html}\n                        '
        return f'{prefix}{new_content}{suffix}'
    return match.group(0)

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Also handle renaming outside dropdown
        content = content.replace('Leadership & Succession', 'Leadership & Assessment')
        
        new_content = dropdown_pattern.sub(fix_order, content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {filename}")
