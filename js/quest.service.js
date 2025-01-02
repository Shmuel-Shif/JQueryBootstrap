'use strict'

const questionTree = {
    question: 'Is it a famous person?',
    yes: {
        question: 'Is the person an actor?',
        yes: { character: 'Brad Pitt' },
        no: { character: 'Albert Einstein' }
    },
    no: {
        question: 'Is it an animal?',
        yes: { character: 'Elephant' },
        no: { character: 'Carrot' }
    }
}

function getInitialQuestion() {
    return questionTree
}
