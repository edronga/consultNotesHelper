'use strict'

function correctShortCuts (string){
	const shortcutsLists = {
		'/examenNormal' : 'Examen cardio-thoracique, abdominal et rachidien sans particularité notable par ailleurs'
	}
	
	Object.keys(shortcutsLists).forEach((value) =>{
		const before = value 
		const after = shortcutsLists[value]
		string.replaceAll(before, after)
	})
	
	return string
}