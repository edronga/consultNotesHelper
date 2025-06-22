'use strict'



const settingInput = document.getElementById('settingInput')
settingInput.addEventListener('input', (e) =>{
    const content = document.getElementById('contentBasedOnSetting')
    content.innerHTML = ''
    switch(settingInput.value){
        case 'Consultation Suivi':
            content.appendChild(generateContentBasedOnSetting_FollowUp())
            break;
        case 'Consultation NM':
            content.appendChild(generateContentBasedOnSetting_NewPatient())
            break;
        case 'Consultation HDJ':
            break;
        default:
            break;
    }
    
})

const okButton = document.getElementById('okButton')
okButton.addEventListener('click', (e) =>{
    const output = document.getElementById('textOutput')
    const settingInput = document.getElementById('settingInput')
    
    switch(settingInput.value){
        case 'Consultation Suivi':
            output.innerHTML = function(){
                const intro = document.getElementById('introInput').value
                const history = document.getElementById('historyInput').value
                const drugs = document.getElementById('drugsInput').value
                const sinceLastTime = document.getElementById('sinceLastTimeInput').value
                const symptoms = document.getElementById('symptomsInput').value
                const exam = document.getElementById('examInput').value
                const imagingTests = document.getElementById('imagingTestsInput').value
                const biology = document.getElementById('biologyInput').value
                const synthesis = document.getElementById('synthesisInput').value
                const others = document.getElementById('othersInput').value
                const nextAppointment = document.getElementById('nextAppointmentInput').value

                return generateOutputFollowUp(intro, history, drugs, sinceLastTime, symptoms, exam, imagingTests, biology, synthesis, others, nextAppointment)
            }()
            navigator.clipboard.writeText(output.innerHTML)
            break;
        case 'Consultation NM':
            output.innerHTML = function (){
                const intro = document.getElementById('introInput').value
                const history = document.getElementById('historyInput').value
                const lifestyle = document.getElementById('lifestyleInput').value
                const drugs = document.getElementById('drugsInput').value
                const allergies = document.getElementById('allergiesInput').value
                const medicalHistory = document.getElementById('medicalHistoryInput').value
                const gynecologicHistory = document.getElementById('gynecologicHistoryInput').value
                const familyHistory = document.getElementById('familyHistoryInput').value
                const symptoms = document.getElementById('symptomsInput').value
                const exam = document.getElementById('examInput').value
                const tests = document.getElementById('testsInput').value
                const geriatricEvaluation = document.getElementById('geriatricEvaluationInput').value
                const synthesis = document.getElementById('synthesisInput').value
                const protocolDetails = document.getElementById('protocolDetailsInput').value
                const others = document.getElementById('othersInput').value
                const nextAppointment = document.getElementById('nextAppointmentInput').value

                return generateOutputNewPatient(intro, history, lifestyle, drugs, allergies, medicalHistory, gynecologicHistory, familyHistory, symptoms, exam, tests, geriatricEvaluation, synthesis, protocolDetails, others, nextAppointment) 
            }()
            navigator.clipboard.writeText(output.innerHTML)
            break;
        case 'Consultation HDJ':
            break;
        default:
            break;
    }
})
