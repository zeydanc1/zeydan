import os
import re

def bundle_css():
    base_dir = r"c:\Users\Zeydan\Desktop\tum web sayfalarim\zeydan\css"
    main_css_path = os.path.join(base_dir, "styles.css")
    output_path = os.path.join(base_dir, "bundled.css")
    
    if not os.path.exists(main_css_path):
        print(f"Error: {main_css_path} not found.")
        return

    bundled_content = "/* Bundled CSS for Performance */\n"
    
    with open(main_css_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    for line in lines:
        # Check for @import url('...');
        match = re.search(r"@import\s+url\(['\"]?([^'\"]+)['\"]?\);", line)
        if match:
            import_file = match.group(1)
            import_path = os.path.join(base_dir, import_file)
            if os.path.exists(import_path):
                print(f"Bundling {import_file}...")
                with open(import_path, "r", encoding="utf-8") as imp_f:
                    bundled_content += f"\n/* --- {import_file} --- */\n"
                    bundled_content += imp_f.read()
            else:
                print(f"Warning: Imported file {import_file} not found.")
        else:
            # Keep comments or other non-import lines from styles.css if any
            bundled_content += line
            
    # Explicitly add scroll-top.css if it exists
    scroll_top_path = os.path.join(base_dir, "scroll-top.css")
    if os.path.exists(scroll_top_path):
        print("Bundling scroll-top.css...")
        with open(scroll_top_path, "r", encoding="utf-8") as f:
             bundled_content += "\n/* --- scroll-top.css --- */\n"
             bundled_content += f.read()

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(bundled_content)
    
    print(f"Successfully created {output_path}")

if __name__ == "__main__":
    bundle_css()
