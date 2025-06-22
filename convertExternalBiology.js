'use strict'
 
/*
*
*
*
*/
 
function convertExternalBiology(copyFromPdf){
    let text = copyFromPdf
 
    const delimiter = '|'
    if (text.includes(delimiter)){
        console.log ('warning: source text includes delimiter |')
    }
 
    text = function (){
        let t = text
        let c = ''
        for (let i = 100; i > 1; i--){
            c = '.'.repeat(i)
            t = t.replaceAll(c, ' ')
        }
        return t
    }()
    text = text.replaceAll('-', ' - ')
    text = text.replaceAll('−', ' - ')
text = text.replaceAll('(', ' ( ')
text = text.replaceAll(')', ' ) ')
 
    const delimiterRegex = /\s/g;
    text = text.replaceAll(delimiterRegex, delimiter)
    
 
    const textInArrayFormat = function (){
        let r = []
        let currentWord = ''
        for (let i = 0, currentChar = ''; i < text.length; i++){
            currentChar = text[i]
            if (currentChar === delimiter){
                r.push(currentWord)
                currentWord = ''
            }
            else {
                currentWord = currentWord + currentChar
            }
        }
        r.push(currentWord)
 
        return r
    }()
 
    /*debugging */ console.log(textInArrayFormat)
 
    const searchedWords = {
        'prélevé' : {
            code : 'date',
            unit : ''
        },
        'prélèvement':  {
            code : 'date',
            unit : ''
        },
        'hémoglobine': {
            code: 'Hb',
            unit: 'g/dL'
        }, 
        'plaquettes': {
            code: 'Pq',
            unit: 'G/L'
        }, 
        'neutrophiles' : {
            code: 'PNN',
            unit: 'G/L'
        },
        'créatinine': {
            code: 'Créatinine',
            unit : 'µmol/L'
        },
'creatinine': {
            code: 'Créatinine',
            unit : 'µmol/L'
        },
        'ckd-epi': {
            code: 'DFG',
            unit : 'mL/min'
        },
        'ckd−epi': {
            code: 'DFG',
            unit : 'mL/min'
        },
        'mdrd':{
            code: 'DFG',
            unit : 'mL/min'
        },
        'bilirubine':{
            code: 'Bilirubine',
            unit : 'µmol/L'
        },
        'asat':{
            code: 'ASAT',
            unit : 'UI'
        },
        'alat':{
            code: 'ALAT',
            unit : 'UI'
        },
        'a.s.a.t.':{
            code: 'ASAT',
            unit : 'UI'
        },
        'a.l.a.t.':{
            code: 'ALAT',
            unit : 'UI'
        },
        'a.s.a.t':{
            code: 'ASAT',
            unit : 'UI'
        },
        'a.l.a.t':{
            code: 'ALAT',
            unit : 'UI'
        },
        'gamma':{
            code: 'GGT',
            unit : 'UI'
        },
        '(gamma':{
            code: 'GGT',
            unit : 'UI'
        },
        'ggt':{
            code: 'GGT',
            unit : 'UI'
        },
        'gamma-glutamyl':{
            code: 'GGT',
            unit : 'UI'
        },
        'phosphatases':{
            code: 'PAL',
            unit : 'UI'
        },
        'phosphatase':{
            code: 'PAL',
            unit : 'UI'
        },
        'ldh':{
            code: 'LDH',
            unit : 'UI'
        },
'l.d.h':{
            code: 'LDH',
            unit : 'UI'
        },
'l.d.h.':{
            code: 'LDH',
            unit : 'UI'
        },
        'deshydrogénase':{
            code: 'LDH',
            unit : 'UI'
        },
        'lactate-déshydrogénase':{
            code: 'LDH',
            unit : 'UI'
        },
'crp':{
            code: 'CRP',
            unit : 'mg/L'
        },
        'réactive':{
            code: 'CRP',
            unit : 'mg/L'
        },
        'albumine':{
            code: 'Albumine',
            unit : 'g/L'
        },
        'corrigée':{
            code: 'Calcémie',
            unit : 'mmol/L'
        },
        'corrigé':{
            code: 'Calcémie',
            unit : 'mmol/L'
        },
        'TSH':{
            code: 'TSH',
            unit : 'UI/L'
        },
        'T3':{
            code: 'T3',
            unit : 'UI'
        },
        'T3L':{
            code: 'T3L',
            unit : 'UI'
        },
        'T4':{
            code: 'T4',
            unit : 'UI'
        },
        'T4L':{
            code: 'Glycémie',
            unit : 'g/L'
        },
        '15-3':{
            code: 'CA 15-3',
            unit : 'UI'
        },
        '125':{
            code: 'CA 125',
            unit : 'UI'
        },
        'PSA':{
            code: 'PSA',
            unit : 'ng/mL'
        },
        'ACE':{
            code: 'ACE',
            unit : 'UI'
        },
        '19-9':{
            code: 'CA 19-9',
            unit : 'UI'
        },
        
    }
 
    const extractedData = function (){
        let r = {}
        let currentValueBeingCompleted = ''
        let lookingForCompletion = false
        let counter = 0
 
        
        textInArrayFormat.forEach((value, index, array) =>{
            if (Object.keys(searchedWords).includes(value.toLowerCase())){
                if (r[searchedWords[value.toLowerCase()]['code']] === undefined || r[searchedWords[value.toLowerCase()]['code']]['numericalValue'] === '' ){
                    r[searchedWords[value.toLowerCase()]['code']] = {
                    'numericalValue': '',
                    'unit' : searchedWords[value.toLowerCase()]['unit']
                    }
                    currentValueBeingCompleted = searchedWords[value.toLowerCase()]['code']
                    lookingForCompletion = true
                }
            }
            
            if (lookingForCompletion){
                let condition = function(){
                    if (array[index +1] === '%'){
                        return false
                    }
                    const temp = ['1','2','3','4','5','6','7','8','9','0',',','.','/','-','−']
                    for (let i = 0; i <value.length; i++){
                        if (!temp.includes(value[i])){
                            return false
                        }
                    }
                    return true
                }()
 
                if (condition){
                    if (r[currentValueBeingCompleted]['numericalValue'] === ''){
                        r[currentValueBeingCompleted]['numericalValue'] = value
                    }
                    if (r[currentValueBeingCompleted]['numericalValue'] !== '' && r[currentValueBeingCompleted]['lowerBound'] === undefined){
                        r[currentValueBeingCompleted]['lowerBound'] = value
                    }   
                    if (r[currentValueBeingCompleted]['numericalValue'] !== '' && r[currentValueBeingCompleted]['lowerBound'] !== undefined &&  r[currentValueBeingCompleted]['upperBound'] === undefined){
                        r[currentValueBeingCompleted]['upperBound'] = value
                    }  
                }
 
                if (['-', 'à'].includes(value)){
                    r[currentValueBeingCompleted]['lowerBound'] = array[index - 1]
                    r[currentValueBeingCompleted]['upperBound'] = array[index + 1]
                    lookingForCompletion = false
                }
 
if (['<', '(<'].includes(value)){
r[currentValueBeingCompleted]['upperBound'] = array[index + 1]
if (r[currentValueBeingCompleted]['numericalValue'] !== ''){
lookingForCompletion = false
}
}
 
                counter++
                if (counter === 100 || Object.keys(searchedWords).includes(array[index + 1].toLowerCase())){
                    lookingForCompletion = false
                    counter = 0
                }
            }
        })
 
        return r
    }()
 
    /*debugging */ console.log(extractedData)
    Object.keys(extractedData).forEach((value) =>{
        if (extractedData[value]['numericalValue'] === undefined) {return;}
        extractedData[value]['numericalValue'] = extractedData[value]['numericalValue'].replaceAll(',', '.')
    })
 
 
    const finalOutput = function(){
        let r = ''
        
        if (extractedData['date'] !== undefined){
let date = extractedData['date']['numericalValue']
date = date.replaceAll('-', '/')
date = date.replaceAll('−', '/')
            r = '<b>' + '- BILAN BIOLOGIQUE DU ' + date + ' :' + '</b>' + '\n'
        }
        if (extractedData['Hb'] !== undefined){
        const hb = extractedData['Hb']['numericalValue']
        const pq = extractedData['Pq']['numericalValue']
        const pnn = extractedData['PNN']['numericalValue']
        r = r + `Hb ${hb} g/L, Pq ${pq} G/L, PNN ${pnn} G/L`
        }
        if (extractedData['Créatinine'] !== undefined){
            const creat = Number(extractedData['Créatinine']['numericalValue'])
            const dfg = extractedData['DFG']['numericalValue']
            const CONVERSION_FACTOR = 8.84
const cleverCreat = creat < 20? Math.round(creat * CONVERSION_FACTOR): creat;
            r = r + `\nCréatinine ${cleverCreat} µmol/L, DFG ${dfg} mL/min`
        }
        if (extractedData['Bilirubine'] !== undefined){
            let alat = '??'
            if (extractedData['ALAT'] !== undefined){
                alat = (Number(extractedData['ALAT']['numericalValue']) <= Number(extractedData['ALAT']['upperBound']))? '': (Number(extractedData['ALAT']['numericalValue']) / Number(extractedData['ALAT']['upperBound'])).toFixed(1)
            }
            let asat = '??'
            if (extractedData['ASAT']!== undefined){
                asat = (Number(extractedData['ASAT']['numericalValue']) <= Number(extractedData['ASAT']['upperBound']))? '': (Number(extractedData['ASAT']['numericalValue']) / Number(extractedData['ASAT']['upperBound'])).toFixed(1)
            }
            let bili = (Number(extractedData['Bilirubine']['numericalValue']) <= Number(extractedData['Bilirubine']['upperBound']))? '': (Number(extractedData['Bilirubine']['numericalValue'])/ Number(extractedData['Bilirubine']['upperBound'])).toFixed(1)
            let ggt = '??'
            if (extractedData['GGT']!== undefined){
                ggt = (Number(extractedData['GGT']['numericalValue']) <= Number(extractedData['GGT']['upperBound']))? '': (Number(extractedData['GGT']['numericalValue']) / Number(extractedData['GGT']['upperBound'])).toFixed(1)
            }
            let pal = '??'
            if (extractedData['PAL']!== undefined){
                pal = (Number(extractedData['PAL']['numericalValue']) <= Number(extractedData['PAL']['upperBound']))? '': (Number(extractedData['PAL']['numericalValue']) / Number(extractedData['PAL']['upperBound'])).toFixed(1)
            }
            let ldh = '??'
            if (extractedData['LDH']!== undefined){
                ldh = (Number(extractedData['LDH']['numericalValue']) <= Number(extractedData['LDH']['upperBound']))? '': (Number(extractedData['LDH']['numericalValue']) / Number(extractedData['LDH']['upperBound'])).toFixed(1)
            }
            r = r + `\nBilan hépatique : ALAT ${alat}N, ASAT ${asat}N, bilirubine ${bili}N, GGT ${ggt}N, PAL ${pal}N ; LDH ${ldh}N`
        }
        if (extractedData['Glycémie'] !== undefined){
            const glycemie = extractedData['Glycémie']['numericalValue']
            r = r + `\nGlycémie ${glycemie} g/L`
        }
        if (extractedData['CRP'] !== undefined){
            const crp = extractedData['CRP']['numericalValue']
            r = r + `\nCRP ${crp} mg/L`
        }
        if (extractedData['Calcémie'] !== undefined){
            const calcemia = Number(extractedData['Calcémie']['numericalValue'])
            const CONVERSION_FACTOR_CALCEMIA = 0.0250495
const cleverCalcemia = calcemia <4? calcemia: (calcemia * CONVERSION_FACTOR_CALCEMIA).toFixed(2);
            r = r + `, calcémie corrigée ${cleverCalcemia} µmol/L`
        }
        if (extractedData['Albumine'] !== undefined){
            const albumine = extractedData['Albumine']['numericalValue']
            r = r + `, Albumine ${albumine} g/L`
        }
        if (extractedData['TSH'] !== undefined){
            const tsh = extractedData['TSH']['numericalValue']
            r = r + `\nTSH ${albumine} g/L`
        }
if (extractedData['TSH'] !== undefined){
            const tsh = extractedData['TSH']['numericalValue']
            r = r + `\nTSH ${albumine} g/L`
        }
if (extractedData['CA 15-3'] !== undefined){
            const ca153 = extractedData['CA 15-3']['numericalValue']
            r = r + `\nCA 15-3 ${ca153} UI`
        }
 
        return r;
    }()
    
 
    return finalOutput;
}