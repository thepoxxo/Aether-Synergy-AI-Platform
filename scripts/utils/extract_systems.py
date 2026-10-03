import cv2
import numpy as np
import os
from PIL import Image, ImageDraw, ImageFont

video_path = 'video.mp4'
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("Error opening video")
    exit()

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

prev_crop = None
systems = []
current_group = []

print(f"Analyzing video of {total_frames} frames...", flush=True)

frame_count = 0
frame_skip = int(fps)
while True:
    for _ in range(frame_skip - 1):
        cap.grab()
        frame_count += 1
    ret, frame = cap.read()
    frame_count += 1
    if not ret:
        break
    
    crop = frame[0:340, 0:1920]
    
    if prev_crop is not None:
        diff = np.mean(np.abs(crop.astype(np.float32) - prev_crop.astype(np.float32)))
        if diff > 10:
            if len(current_group) > 2:
                systems.append(current_group)
            current_group = []
            
    current_group.append(crop)
    prev_crop = crop
        
    if frame_count % 1000 < frame_skip:
        print(f"Processed ~{frame_count} / {total_frames}", flush=True)

if len(current_group) > 2:
    systems.append(current_group)

cap.release()
print(f"Found {len(systems)} systems.", flush=True)

processed_systems = []
valid_idx = 0
for idx, group in enumerate(systems):
    # Only take the first 10 frames to avoid the frozen blue bar at the end of the video
    group = group[:10]
    stack = np.stack(group, axis=0)
    median_img = np.median(stack, axis=0).astype(np.uint8)
    
    if np.mean(median_img) > 200:
        processed_systems.append(median_img)
        cv2.imwrite(f'system_{valid_idx}.jpg', median_img)
        valid_idx += 1

print(f"Saved {valid_idx} valid systems.", flush=True)

# Create PDF
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
        # We can just putText using OpenCV
        title = "Glimpse of Us - Joji (TutorialsByHugo)"
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
    pages[0].save('glimpse of us_video.pdf', save_all=True, append_images=pages[1:])
    print("Saved PDF with title to glimpse of us_video.pdf", flush=True)
