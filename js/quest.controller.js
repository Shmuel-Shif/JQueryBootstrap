'use strict'

let gCurrentNode = null
let gPrevQuest = null
let gLastRes = null

function displayQuestion(node) {
    if (node.character) {
        $('#question-text').text(`Is it ${node.character}?`)
        $('#yes-button').off('click').click(function () {
            alert('I guessed it!')
            resetGame()
        })
        $('#no-button').off('click').click(function () {
            resetGame()
            showModalForNewGuess()
        })
    } else {
        $('#question-text').text(node.question)
        gPrevQuest = node

        $('#yes-button').off('click').click(function () {
            gLastRes = 'yes'
            gCurrentNode = node.yes
            displayQuestion(gCurrentNode)
        })
        $('#no-button').off('click').click(function () {
            gLastRes = 'no'
            gCurrentNode = node.no
            displayQuestion(gCurrentNode)
        })
    }
}

function resetGame() {
    $('#question-text').text('')
    $('#start-button').show()
    $('.bth-answer').hide()
    gCurrentNode = loadTreeFromLocalStorage()
    displayQuestion(gCurrentNode)
}

$(document).ready(function () {

    gCurrentNode = loadTreeFromLocalStorage()
    displayQuestion(gCurrentNode)

    $('#start-button').click(function () {
        $('#start-button').hide()
        $('.bth-answer').show()
        startGame()
    })

    function startGame() {
        displayQuestion(gCurrentNode)
    }


    $('#save-button').click(function () {
        let characterName = $('#character-name').val()
        let newQuestion = $('#new-question').val()

        if (characterName && newQuestion) {
            let newNode = {
                question: newQuestion,
                yes: { character: characterName },
                no: gPrevQuest
            };

            if (gLastRes === 'yes') {
                gPrevQuest.yes = newNode
            } else {
                gPrevQuest.no = newNode
            }

            saveTreeToLocalStorage()
            $('#modal-new-guess').modal('show')
        } else {
            alert('Please fill in both the character name and the question.')
        }
    })
})

function showModalForNewGuess() {
    $('#modal-new-guess').modal('show')

    $('#save-button').off('click').click(function () {
        const characterName = $('#character-name').val()
        const newQuestion = $('#new-question').val()

        const newNode = {
            question: newQuestion,
            yes: { character: `${characterName}` }, 
            no: gPrevQuest, 
        };

        if (gLastRes === 'yes') {
            gPrevQuest.yes = newNode
        } else {
            gPrevQuest.no = newNode
        }

        saveTreeToLocalStorage(); 
        $('#modal-new-guess').modal('hide')
        resetGame()
    })
}
