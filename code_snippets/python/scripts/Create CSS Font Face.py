#FLM: CSS Font Face
selection = []

def getSel(font, glyph, gindex):
	selection.append(gindex)
fl.ForSelected(getSel)

f = open('D:\meramyfile.css','w+')

for gIndex in selection:
	g = fl.font[gIndex]
	u = str(g.unicode)
	if (u == "None") :
		print "Doesn't have Unicode"
	else :
		h = hex(g.unicode)
		h = h.replace("0x","")
		f.write('.'+g.name+'{content:"\\'+h+'"}\n')
f.close()