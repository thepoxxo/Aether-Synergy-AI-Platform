import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import glob

image_files = sorted(glob.glob('system_*.jpg'), key=lambda x: int(x.split('_')[1].split('.')[0]))

if not image_files:
    print("No system images found.")
    exit()

processed_systems = [cv2.imread(f) for f in image_files]

systems_per_page = 5
pages = []

for i in range(0, len(processed_systems), systems_per_page):
    page_systems = processed_systems[i:i+systems_per_page]
    
    while len(page_systems) < systems_per_page:
        white_padding = np.ones_like(processed_systems[0]) * 255
        page_systems.append(white_padding)
        
    page = np.vstack(page_systems)
    
    margin_x = 100
    margin_y = 150
    h, w, c = page.shape
    page_with_margin = np.ones((h + 2*margin_y, w + 2*margin_x, c), dtype=np.uint8) * 255
    page_with_margin[margin_y:margin_y+h, margin_x:margin_x+w] = page
    
    # Add title on the first page
    if i == 0:
        title = "Glimpse of Us - Joji"
        font = cv2.FONT_HERSHEY_DUPLEX
        font_scale = 2
        thickness = 3
        text_size = cv2.getTextSize(title, font, font_scale, thickness)[0]
        text_x = (w + 2*margin_x - text_size[0]) // 2
        text_y = margin_y // 2 + text_size[1] // 2
        cv2.putText(page_with_margin, title, (text_x, text_y), font, font_scale, (0, 0, 0), thickness, cv2.LINE_AA)
    
    page_rgb = cv2.cvtColor(page_with_margin, cv2.COLOR_BGR2RGB)
    pages.append(Image.fromarray(page_rgb))

if pages:
    pages[0].save('glimpse of us_final.pdf', save_all=True, append_images=pages[1:])
    print("Saved PDF with title to glimpse of us_final.pdf", flush=True)
