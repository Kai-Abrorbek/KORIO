import sys, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font = TTFont(sys.argv[1])
chars = sys.argv[2]
gs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font['head'].unitsPerEm
out = {}
for ch in chars:
    name = cmap.get(ord(ch))
    if not name:
        print('MISSING', ch, file=sys.stderr)
        continue
    pen = SVGPathPen(gs, ntos=lambda v: ('%.0f' % v))
    g = gs[name]
    g.draw(TransformPen(pen, (1, 0, 0, -1, 0, 0)))
    out[ch] = {'d': pen.getCommands(), 'w': g.width}
print(json.dumps({'upm': upm, 'asc': font['hhea'].ascent, 'desc': font['hhea'].descent, 'glyphs': out}, ensure_ascii=False))
