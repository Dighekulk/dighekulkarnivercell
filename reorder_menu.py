import os
import re

dir_path = r'c:\Users\lenovo\Desktop\dkvercell'

pattern = re.compile(
    r'(<a[^>]*href=["\']culture-activation\.html["\'][^>]*>(?:.*?)</a>\s*)'
    r'(<a[^>]*href=["\']people-systems\.html["\'][^>]*>(?:.*?)</a>\s*)'
    r'(<a[^>]*href=["\']leadership-assessments\.html["\'][^>]*>(?:.*?)</a>\s*)'
    r'(<a[^>]*href=["\']talent-assessment\.html["\'][^>]*>(?:.*?)</a>\s*)?',
    re.IGNORECASE | re.DOTALL
)

def replacer(match):
    m1 = match.group(1)
    m2 = match.group(2)
    m3 = match.group(3)
    m4 = match.group(4) or ''
    return m3 + m1 + m2 + m4

count = 0
for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content, num_subs = pattern.subn(replacer, content)
        if num_subs > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Updated {filename}")
        else:
            # Check if leadership is already first, or if it failed to match
            # If "Leadership & Succession" is before "Culture Activation", it's already updated.
            pass

print(f"Total files updated this run: {count}")
