'use strict'

/*
*
*
*
*/

function generateOutputNewPatient(intro = '', history = '', lifestyle = '', drugs = '', allergies = '', medicalHistory = '', gynecologicHistory = '', familyHistory = '', symptoms = '', exam = '', tests = '', geriatricEvaluation = '', synthesis = '', protocolDetails = '', others = '', nextAppointment = ''){
    let r = ''
    const underline = '<br/>'
    const breakLine = '<br/><br/>'

    r = intro + breakLine
    if (history !== ''){r = r + style.subTitle('historique :') + underline + convertLineBreakstoHtml(history) + breakLine}
    if (lifestyle !== ''){r = r + style.subTitle('mode de vie :') + underline + convertLineBreakstoHtml(lifestyle) + breakLine}
    if (drugs !== ''){r = r + style.subTitle('traitements :') + underline + convertLineBreakstoHtml(drugs) + breakLine}
    if (allergies !== ''){r = r + style.subTitle('allergies:') + underline + convertLineBreakstoHtml(allergies) + breakLine}
    if (medicalHistory !== ''){r = r + style.subTitle('antécédents :') + underline + convertLineBreakstoHtml(medicalHistory) + breakLine}
    if (gynecologicHistory !== ''){r = r + style.subTitle('antécédents gynécologiques :') + underline + convertLineBreakstoHtml(gynecologicHistory) + breakLine}
    if (familyHistory !== ''){r = r + style.subTitle('antécédents familiaux :') + underline + convertLineBreakstoHtml(familyHistory) + breakLine}
    if (symptoms !== ''){r = r + style.subTitle('evaluation symptomatique :') + underline + convertLineBreakstoHtml(symptoms) + breakLine}
    if (exam !== ''){r = r + style.subTitle('examen clinique :') + underline + convertLineBreakstoHtml(exam) + breakLine}
    if (tests !== ''){r = r + style.subTitle('Examens Complementaires :') + underline + convertLineBreakstoHtml(tests) + breakLine}
    if (geriatricEvaluation !== ''){r = r + style.subTitle('evaluation oncogériatrique simplifiée :') + underline + convertLineBreakstoHtml(geriatricEvaluation) + breakLine}
    if (synthesis !== ''){r = r + style.subTitle('synthese :') + underline + convertLineBreakstoHtml(synthesis) + breakLine}
    if (protocolDetails !== ''){r = r + style.subTitle('détails du protocole :') + underline + convertLineBreakstoHtml(protocolDetails) + breakLine}
    if (others !== ''){r = r + style.subTitle('par ailleurs:') + underline + convertLineBreakstoHtml(others) + breakLine}
    if (nextAppointment !== ''){r = r + style.subTitle('prochain(s) rendez-vous :') + underline + convertLineBreakstoHtml(nextAppointment) + breakLine}

    return r;
}

/*
*
*
*
*/
function generateContentBasedOnSetting_NewPatient (){
    let r = document.createElement('div')

    const htmlText = `
    <div>
        <label for ="introSex">Mr/Mme....</label>
        <input list = "mrMrsDatalist" id = "introSex">
        <datalist id = "mrMrsDatalist">
            <option value = "Mr"></option>
            <option value = "Mme"></option>
    </div>
    <div>
        <label for ="firstNameInput">Nom..........</label>
        <input type = "text" id = "firstNameInput">
    </div>
    <div>
        <label for ="lastNameInput">Prénom......</label>
        <input type = "text" id = "lastNameInput">
    </div>
    <div>
        <label for ="ageInput">Age............</label>
        <input type = "number" id = "ageInput">
    </div>
    <div>
        <label for = "introInput">Motif de consultation</label>
        <textarea id = "introInput">Je vois ce jour en consultation *Mr/Mme* *Nom* *Prénom*, *Age* ans, dans le cadre de la prise en charge d'un </textarea>
    </div>
    <div>
        <label for = "historyInput">Historique oncologique</label>
        <textarea id = "historyInput"></textarea>
    </div>
    <div>
        <label for = "lifestyleInput">Mode de vie</label>
        <textarea id = "lifestyleInput"></textarea>
    </div>
    <div>
        <label for = "drugInput">Traitements</label>
        <textarea id = "drugsInput"></textarea>
    </div>
    <div>
        <label for = "allergiesInput">Allergies</label>
        <textarea id = "allergiesInput"></textarea>
    </div>
    <div>
        <label for = "medicalHistoryInput">Antécédents</label>
        <textarea id = "medicalHistoryInput"></textarea>
    </div>
    <div>
        <label for = "gynecologicHistoryInput">Antécédents gynécologiques</label>
        <textarea id = "gynecologicHistoryInput"></textarea>
    </div>
    <div>
        <label for = "familyHistoryInput">Antécédents familiaux</label>
        <textarea id = "familyHistoryInput"></textarea>
    </div>
    <div>
        <label for = "symptomsInput">Evaluation symptomatique</label>
        <textarea id = "symptomsInput"></textarea>
    </div>
    <div>
        <label for = "examInput">Examen clinique</label>
        <textarea id = "examInput"></textarea>
    </div>
    <div>
        <label for = "testsInput">Examens complémentaires</label>
        <textarea id = "testsInput"></textarea>
    </div>
    <div>
        <label for = "geriatricEvaluationInput">Evaluation oncogériatrique</label>
        <textarea id = "geriatricEvaluationInput"></textarea>
    </div>
    <div>
        <label for = "synthesisInput">Synthèse </label>
        <textarea id = "synthesisInput"></textarea>
    </div>
    <div>
        <label for = "protocolDetailsInput">Details du protocole</label>
        <textarea id = "protocolDetailsInput"></textarea>
    </div>
    <div>
        <label for = "othersInput">Par ailleurs</label>
        <textarea id = "othersInput"></textarea>
    </div>
    <div>
        <label for = "nextAppointmentInput">Prochain(s) rendez-vous</label>
        <textarea id = "nextAppointmentInput"></textarea>
    </div>
    `
    r.innerHTML = htmlText

    const textareaTag = r.getElementsByTagName('textarea')
    let keys = Object.keys(textareaTag)
    keys.forEach((value) =>{
        textareaTag[value].addEventListener('selectionchange', (e) =>{
            const numberOfLines = 15
            initializeAllTagStyle('textarea')
            textareaTag[value].style.height = `${numberOfLines * 10}px`
        })
    })

    r.querySelector('#introSex').addEventListener('keydown', (e) =>{
        if (e.key !== 'Tab'){
            return
        }
        const sex = document.getElementById('introSex').value.toUpperCase() === ('MR' || 'MONSIEUR') ? 'Monsieur' : 'Madame';
        const newString = document.getElementById('introInput').innerHTML.replace('*Mr/Mme*', sex)
        document.getElementById('introInput').innerHTML = newString
    })
    r.querySelector('#firstNameInput').addEventListener('keydown', (e) =>{
        if (e.key !== 'Tab'){
            return
        }
        const name = document.getElementById('firstNameInput').value
        const newString = document.getElementById('introInput').innerHTML.replace('*Nom*', toBold(name.toUpperCase()))
        document.getElementById('introInput').innerHTML = newString
    })
    r.querySelector('#lastNameInput').addEventListener('keydown', (e) =>{
        if (e.key !== 'Tab'){
            return
        }
        const name = document.getElementById('lastNameInput').value
        const newString = document.getElementById('introInput').innerHTML.replace('*Prénom*', toBold(name.toUpperCase()))
        document.getElementById('introInput').innerHTML = newString
    })
    r.querySelector('#ageInput').addEventListener('keydown', (e) =>{
        if (e.key !== 'Tab'){
            return
        }
        const age = function () {
            const n = document.getElementById('ageInput').value
            if (n.length === 2){
                return n;
            }
            if (n.length === 8){
                return function(){
                    const currentDate = new Date()
                    let age = currentDate.getFullYear() - Number(n.slice(4, 8))
                    if (currentDate.getMonth() + 1 < Number(n.slice(2, 4))){
                        return age - 1;
                    }
                    if (currentDate.getMonth() + 1 > Number(n.slice(2, 4))){
                        return age;
                    }
                    if (currentDate.getDate() < Number(n.slice(0, 2))){
                        return age - 1;
                    }
                    if (currentDate.getDate() >= Number(n.slice(0, 2))){
                        return age;
                    }
                }()
            }
            return '??'
        }()
            
        const newString = document.getElementById('introInput').innerHTML.replace('*Age* ans', toBold(age + ' ans'))
        document.getElementById('introInput').innerHTML = newString
        const length =  document.getElementById('introInput').value.length
        document.getElementById('introInput').setSelectionRange(length, length)
    })

    return r;
}