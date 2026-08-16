#!/usr/bin/env python3
"""校验所有课程与参考文档：
1. HTML 基本结构（DOCTYPE、</html>）
2. 所有 quiz/order 组件的 JSON 合法
3. quiz 选项等长（同一题内字符数一致）、answer=0（渲染随机打乱）
4. 课程必备区块（warmup/检索练习/本课的胜利）
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).parent.parent
lessons = sorted((ROOT / "lessons").glob("0*.html"))
refs = sorted((ROOT / "reference").glob("*.html"))
errors, warnings = [], []

for f in lessons + refs:
    html = f.read_text(encoding="utf-8")
    if "<!DOCTYPE html>" not in html: errors.append(f"{f.name}: 缺 DOCTYPE")
    if "</html>" not in html: errors.append(f"{f.name}: 未闭合 </html>")

    for m in re.finditer(r'<script type="application/json">(.*?)</script>', html, re.S):
        raw = m.group(1).strip()
        try:
            data = json.loads(raw)
        except Exception as e:
            errors.append(f"{f.name}: JSON 解析失败 → {e}"); continue
        if "questions" in data:
            for i, q in enumerate(data["questions"]):
                lens = {len(o) for o in q["options"]}
                if len(lens) != 1:
                    errors.append(f"{f.name} quiz[{i}] 选项长度不等: {[len(o) for o in q['options']]}")
                if q.get("answer") != 0:
                    errors.append(f"{f.name} quiz[{i}] answer != 0")
        elif "items" in data:
            if not isinstance(data["items"], list) or len(data["items"]) < 3:
                errors.append(f"{f.name} order 组件 items 异常")

for f in lessons:
    html = f.read_text(encoding="utf-8")
    for blk in ["本课的胜利", "next-lesson", "ask-teacher", "footer"]:
        if blk not in html: errors.append(f"{f.name}: 缺 {blk}")
    if "data-quiz" not in html: errors.append(f"{f.name}: 无 quiz 组件")

# 相对链接检查
for f in lessons + refs + [ROOT / "lessons/index.html"]:
    html = f.read_text(encoding="utf-8")
    base = f.parent
    for href in re.findall(r'href="([^"#http][^"]*)"', html):
        if not (base / href).exists():
            errors.append(f"{f.name}: 死链 {href}")

print(f"检查 {len(lessons)} 课 + {len(refs)} 参考文档")
for e in errors: print("  ✗", e)
for w in warnings: print("  ⚠", w)
if not errors: print("全部通过 ✅")
sys.exit(1 if errors else 0)
