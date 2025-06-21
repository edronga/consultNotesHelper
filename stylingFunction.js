'use strict'

let style = {
    subTitle: toBoldAndUpperCase
}

function toBoldAndUpperCase(string){
    let r = ''
    r = '<b>' + string.toUpperCase() + '</b>'
    return r
}

function initializeAllTagStyle(tag = 'textarea'){
    const objectOfTags = document.getElementsByTagName(tag)
    let keys = Object.keys(objectOfTags)
    keys.forEach((value) =>{
        objectOfTags[value].style.height = '25px'
    })
}

function convertLineBreakstoHtml(text){
    let r = ''
    r = text.replaceAll('\n', '<br>')
            .replaceAll('\r', '<br>')
    return r;
}