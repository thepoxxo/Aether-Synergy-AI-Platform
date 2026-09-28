import json

with open('channel_info.jsonl', 'r', encoding='utf-16') as f:
    videos = [json.loads(line) for line in f if line.strip()]

shorts = [v for v in videos if v.get('duration') is None]
longs = [v for v in videos if v.get('duration') is not None]

print(f"Total Shorts: {len(shorts)}, Average views: {sum([v.get('view_count',0) for v in shorts])/len(shorts) if shorts else 0:.2f}")
print(f"Total Longs: {len(longs)}, Average views: {sum([v.get('view_count',0) for v in longs])/len(longs) if longs else 0:.2f}")

print("\nRecent Shorts:")
for v in shorts[:3]:
    print(f"- {v.get('title')} ({v.get('view_count')} views)")

print("\nRecent Longs:")
for v in longs[:3]:
    print(f"- {v.get('title')} ({v.get('view_count')} views)")

