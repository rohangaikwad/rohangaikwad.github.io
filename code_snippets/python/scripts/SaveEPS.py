#FLM: SAVE EPS
selection = []
def getSel(font, glyph, gindex):
	selection.append(gindex)
fl.ForSelected(getSel)
l = len(selection)
c = 1

fl.BeginProgress("Exporting as EPS: [" + str(l) + " Glyphs]", l)

for gIndex in selection:
	c += 1
	g= fl.font[gIndex]
	fileName = g.name + ".eps"
	print fileName
	
	g.SaveEPS( filename )
	fl.TickProgress(c)
	
fl.EndProgress()