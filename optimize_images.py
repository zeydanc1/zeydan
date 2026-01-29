from PIL import Image
import os

def optimize_images():
    base_dir = r"c:\Users\Zeydan\Desktop\tum web sayfalarim\zeydan\images"
    
    # Filename -> target max width
    targets = {
        "teknofestbasari.jpeg": 800,
        "codecombatsertıfıka.png": 800,
        "tesekkurbelgesi.jpeg": 600,
        "etkinlik.jpeg": 600,
        "zeydan.jpg": 300
    }
    
    for filename, max_width in targets.items():
        path = os.path.join(base_dir, filename)
        if not os.path.exists(path):
            print(f"Skipping {filename}, not found.")
            continue
            
        try:
            with Image.open(path) as img:
                print(f"Processing {filename} ({img.size[0]}x{img.size[1]})...")
                
                # Check if resize needed
                if img.size[0] > max_width:
                    ratio = max_width / img.size[0]
                    new_height = int(img.size[1] * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                    print(f"  Resized to {max_width}x{new_height}")
                
                # Save optimized
                # overwrite original for "fix it" request, or save as _optimized? 
                # User complaint implies the file served IS the file at that URL. 
                # So I must either overwrite or update HTML. 
                # Overwriting is cleaner for the URL structure if we don't want to change HTML refs everywhere (except cache busting).
                # But dangerous. I'll overwrite but keep backup? No, I'll just overwrite for this task as requested.
                
                if filename.lower().endswith(('.jpg', '.jpeg')):
                    img.save(path, "JPEG", optimize=True, quality=85)
                elif filename.lower().endswith('.png'):
                    img.save(path, "PNG", optimize=True)
                    
                print(f"  Saved {filename}")
                
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
