import os
import re

dir_path = r'c:\Users\lenovo\Desktop\dkvercell'

# We want to rename "Leadership & Succession" to "Leadership & Assessment"
# And then reorder the dropdown-content div.
# Current order (after previous script):
# 1. Leadership & Succession
# 2. Culture Activation
# 3. Talent Assessment & Strategy
# 4. People Systems

# Desired final order:
# 1. Leadership & Assessment (Renamed from Leadership & Succession)
# 2. Talent Assessment & Strategy
# 3. People Systems
# 4. Culture Activation

# Regex for the dropdown content
dropdown_pattern = re.compile(
    r'(<div\s+class="dropdown-content">)(.*?)(</div>)',
    re.DOTALL
)

# Regex to find links (allowing for the previous renaming or variations)
leadership_link_pattern = re.compile(r'<a\s+href="leadership-assessments\.html">Leadership\s+&\s+Succession</a>', re.IGNORECASE)
culture_link_pattern = re.compile(r'<a\s+href="culture-activation\.html">Culture\s+Activation</a>', re.IGNORECASE)
people_link_pattern = re.compile(r'<a\s+href="people-systems\.html">People\s+Systems</a>', re.IGNORECASE)
talent_link_pattern = re.compile(r'<a\s+href="talent-assessment\.html">Talent\s+Assessment\s+&\s+Strategy</a>', re.IGNORECASE)

def reorder_and_rename(match):
    prefix = match.group(1)
    content = match.group(2)
    suffix = match.group(3)
    
    # Extract links
    l_match = leadership_link_pattern.search(content)
    c_match = culture_link_pattern.search(content)
    p_match = people_link_pattern.search(content)
    t_match = talent_link_pattern.search(content)
    
    # If standard match fails, it might have been partially changed or formatted differently.
    # Let's try more flexible matching to ensure we don't skip files.
    if not (l_match and c_match and p_match and t_match):
        # Even if some links aren't found, we should still try to rename Leadership & Succession if it exists.
        return match.group(0).replace('Leadership & Successsion', 'Leadership & Assessment').replace('Leadership & Succession', 'Leadership & Assessment')
        
    l_html = l_match.group(0)
    c_html = c_match.group(0)
    p_html = p_match.group(0)
    t_html = t_match.group(0)
    
    # Rename the leadership link text
    l_html_new = l_html.replace('Leadership & Succession', 'Leadership & Assessment').replace('Leadership & Successsion', 'Leadership & Assessment')
    
    # New Order: Leadership, Talent, People, Culture
    new_content = f'\n                            {l_html_new}\n                            {t_html}\n                            {p_html}\n                            {c_html}\n                        '
    return f'{prefix}{new_content}{suffix}'

files_updated = 0
for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # First, global replace for any "Leadership & Succession" text outside the dropdown just in case
        modified_content = content.replace('Leadership & Succession', 'Leadership & Assessment')
        
        # Then specifically target the dropdown reordering
        new_content, count = dropdown_pattern.subn(reorder_and_rename, modified_content)
        
        if count > 0 or new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
            files_updated += 1

print(f"Total files updated: {files_updated}")
