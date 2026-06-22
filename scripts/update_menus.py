import os
import re

html_dir = r"d:\Darshan\Coding\Internship\dighe-kulkarni-org-advisory-main"

menu_items_def = [
    ("index.html", "HOME"),
    ("organisation-design.html", "ORG DESIGN"),
    ("leadership-impact.html", "LEADERSHIP IMPACT"),
    ("about.html", "ABOUT US"),
    ("insights.html", "INSIGHTS"),
    ("blogs.html", "Blogs"),
    ("faq.html", "FAQ"),
    ("contact.html", "CONTACT US")
]

def update_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the nav block
    # Matches <nav> ... </nav> including newlines
    nav_pattern = re.compile(r'(<nav>)(.*?)(</nav>)', re.DOTALL)
    
    match = nav_pattern.search(content)
    if not match:
        print(f"No nav found in {os.path.basename(file_path)}")
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
    insights_active = active_href in ["insights.html", "faq.html", "blogs.html"]
    
    for href, label in menu_items_def:
        if href in ["faq.html", "blogs.html"]:
            # Skip FAQ and Blogs as a top-level link because they are inside the dropdown now
            continue
            
        if href == "insights.html":
            active_class = 'class="dropdown-toggle active-link"' if insights_active else 'class="dropdown-toggle"'
            blogs_active_class = ' class="active-link"' if active_href == "blogs.html" else ''
            faq_active_class = ' class="active-link"' if active_href == "faq.html" else ''
            new_menu_lines.append(f'                    <li class="dropdown">\n                        <a href="#" {active_class}>INSIGHTS <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem; margin-left: 4px; vertical-align: middle;"></i></a>\n                        <ul class="dropdown-menu">\n                            <li><a href="blogs.html"{blogs_active_class}>BLOGS</a></li>\n                            <li><a href="faq.html"{faq_active_class}>FAQ</a></li>\n                        </ul>\n                    </li>')
        else:
            if href == active_href:
                new_menu_lines.append(f'                    <li><a href="{href}" class="active-link">{label}</a></li>')
            else:
                new_menu_lines.append(f'                    <li><a href="{href}">{label}</a></li>')
    
    new_menu_content = "\n" + "\n".join(new_menu_lines) + "\n                "
    new_nav_block = f"{prefix}\n                <ul class=\"nav-links\">{new_menu_content}</ul>\n            {suffix}"
    
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
