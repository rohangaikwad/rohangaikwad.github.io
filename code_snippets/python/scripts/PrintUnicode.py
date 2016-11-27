#FLM: Print Unicode
selection = []

def getSel(font, glyph, gindex):
	selection.append(gindex)
fl.ForSelected(getSel)

for gIndex in selection:
	g = fl.font[gIndex]
	u = str(g.unicode)
	if (u == "None") :
		print "Doesn't have Unicode"
	else :
		h = hex(g.unicode)
		h = h.replace("0x","")
		print u+ ", "+ h