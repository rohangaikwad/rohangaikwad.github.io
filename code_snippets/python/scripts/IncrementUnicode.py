#FLM: Incr Unicode
selection = []

def getSel(font, glyph, gindex):
	selection.append(gindex)
fl.ForSelected(getSel)
selection.reverse()

for gIndex in selection:
	g = fl.font[gIndex]
	u = g.unicode
	s = str(u)
	if s != "None" :
		u += 1
		g.unicode = u
	else :
		print "ERROR: Glyph \""+g.name+"\" doesn't have a unicode"

fl.UpdateFont(fl.ifont)