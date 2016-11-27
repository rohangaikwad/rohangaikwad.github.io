#FLM: Categorize Glyphs by Unicode
selection = []
ucList = []

def getSel(font, glyph, gindex): selection.append(gindex)
fl.ForSelected(getSel)

for g in fl.font.glyphs: ucList.append(g.unicode)

si = 1001
isFresh = False
safety = 0

for gIndex in selection:
	g = fl.font[gIndex]
	
	while (isFresh == False) :
		if (si in ucList) :
			si += 1
			safety += 1
		else : isFresh = True			
		if(safety > 500) : isFresh = True
	
	safety = 0
	isFresh = False;
	
	fl.SetUndo(gIndex)
	g.unicode = si
	ucList.append(si)
	
fl.UpdateFont(fl.ifont)