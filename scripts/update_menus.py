import os
import re

html_dir = r"d:\Darshan\Coding\dighe-kulkarni-org-advisory-main"

menu_items_def = [
    ("index.html", "Home"),
    ("organization-design.html", "Organisation Design & Effectiveness"),
    ("leadership-assessments.html", "Leadership Impact"),
    ("about.html", "About Us"),
    ("blogs.html", "Insights"),
    ("faq.html", "Frequently Asked Questions"),
    ("contact.html", "Contact")
]

def update_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the nav-links block
    # Matches <ul class="nav-links"> ... </ul> including newlines
    nav_pattern = re.compile(r'(<ul class="nav-links">)(.*?)(</ul>)', re.DOTALL)
    
    match = nav_pattern.search(content)
    if not match:
        print(f"No nav-links found in {os.path.basename(file_path)}")
        return False

    prefix = match.group(1)
    old_menu_content = match.group(2)
    suffix = match.group(3)

    # Determine which page is active based on old content
    # E.g., class="active-link" or class='active-link' or similar
    active_href = None
    # Look for href="filename.html" and active-link in the same <a> tag
    active_match = re.search(r'href="([^"]+)"[^>]*class="[^"]*active-link[^"]*"', old_menu_content)
    if active_match:
        active_href = active_match.group(1)
    else:
        # Try alternate quote style
        active_match = re.search(r"href='([^']+)'[^>]*class='[^']*active-link[^']*'", old_menu_content)
        if active_match:
            active_href = active_match.group(1)
        else:
            # Let's fallback to current file name if not found in active class
            filename = os.path.basename(file_path)
            # If the filename matches one of our hrefs, make it active
            for href, _ in menu_items_def:
                if href == filename:
                    active_href = href
                    break

    # Build new menu content
    new_menu_lines = []
    for href, label in menu_items_def:
        if href == active_href:
            new_menu_lines.append(f'                    <li><a href="{href}" class="active-link">{label}</a></li>')
        else:
            new_menu_lines.append(f'                    <li><a href="{href}">{label}</a></li>')
    
    new_menu_content = "\n" + "\n".join(new_menu_lines) + "\n                "
    new_nav_block = f"{prefix}{new_menu_content}{suffix}"
    
    updated_content = nav_pattern.sub(new_nav_block, content)
    
    # Also verify footer content
    # Look for: <li><i class="fa-solid fa-envelope fa-fw"></i> orgadvisors@dighekulkarni.com</li> etc
    # Let's check if the footer needs updating.
    # The details are already correct in the footers, but let's double check.
    
    if updated_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated menu in {os.path.basename(file_path)}")
        return True
    return False

# List all files in the directory
for filename in os.listdir(html_dir):
    if filename.endswith(".html"):
        update_html_file(os.path.join(html_dir, filename))

print("Menu update completed.")
