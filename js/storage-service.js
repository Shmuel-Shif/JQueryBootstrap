'use strict'


function saveTreeToLocalStorage() {
    
    const flatTree = flattenTree(questionTree)
    localStorage.setItem('questionTree', JSON.stringify(flatTree))
}

function flattenTree(node) {

    if (node.character) {
        return { character: node.character }
    }

    return {
        question: node.question,
        yes: flattenTree(node.yes),
        no: flattenTree(node.no)
    }
}

function saveDataToLocalStorage(characterName, newQuestion) {
    const gameData = {
        character: characterName,
        question: newQuestion
    }

    localStorage.setItem("gameData", JSON.stringify(gameData))
}

function loadDataFromLocalStorage() {
    const gameData = localStorage.getItem("gameData")
    return gameData ? JSON.parse(gameData) : null
}

function loadTreeFromLocalStorage() {
    let savedTree = localStorage.getItem('questionTree')
    if (savedTree) {
        return JSON.parse(savedTree)
    } else {
        return getInitialQuestion()  
    }
}

function restoreTreeFromLocalStorage() {
    const flatTree = JSON.parse(localStorage.getItem('questionTree'))
    if (flatTree) {
        return restoreTree(flatTree)
    }
    return getInitialQuestion()
}

function restoreTree(node) {
    if (node.character) {
        return { character: node.character }
    }

    return {
        question: node.question,
        yes: restoreTree(node.yes),
        no: restoreTree(node.no)
    }
}
