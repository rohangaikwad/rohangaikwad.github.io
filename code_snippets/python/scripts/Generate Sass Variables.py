#FLM: SCSS variables
selection = []

def getSel(font, glyph, gindex):
	selection.append(gindex)
fl.ForSelected(getSel)

f = open('D:\meramyfile.scss','w+')

for gIndex in selection:
	g = fl.font[gIndex]
	u = str(g.unicode)
	if (u == "None") :
		print "Doesn't have Unicode"
	else :
		h = hex(g.unicode)
		h = h.replace("0x","")
		f.write('$'+g.name+':"\\'+h+'";\n')
f.close()