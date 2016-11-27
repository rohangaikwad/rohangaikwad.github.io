#FLM: Remove Unicode from Selected Glyphs
selection = []

def getSel(font, glyph, gindex):
	selection.append(gindex)
fl.ForSelected(getSel)

backupUNI = False

for gIndex in selection:
	g = fl.font[gIndex]
	backupName = g.name+"-oldUNI_"+str(g.unicode)
	if (backupUNI == True) : g.name = backupName
	g.unicode = 0
fl.UpdateFont(fl.ifont)