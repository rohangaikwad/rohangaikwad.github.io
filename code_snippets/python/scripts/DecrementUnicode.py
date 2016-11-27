#FLM: Decr Unicode
selection = []

def getSel(font, glyph, gindex):
	selection.append(gindex)
fl.ForSelected(getSel)

for gIndex in selection:
	g = fl.font[gIndex]
	u = g.unicode
	s = str(u)
	if s != "None" :
		if u > 1 :
			u -= 1
			g.unicode = u
		else :
			print "ERROR: Glyph \""+g.name+"\"'s unicode will be set to ZERO"
	else :
		print "ERROR: Glyph \""+g.name+"\" doesn't have a unicode"

fl.UpdateFont(fl.ifont)