#FLM: Swap Unicode

selection = []

def getSel(font, glyph, gindex):
	selection.append(gindex)
fl.ForSelected(getSel)

if ( len(selection) == 2 ) :
	f1 = fl.font[selection[0]]
	f2 = fl.font[selection[1]]
	
	u1 = f1.unicode
	u2 = f2.unicode
	
	f1.unicode = u2
	fl.SetUndo(selection[0])
	
	f2.unicode = u1
	fl.SetUndo(selection[1])
	
else :
	print "ERROR: "+str(len(selection)) + " selected instead of 2"
	
fl.UpdateFont(fl.ifont)