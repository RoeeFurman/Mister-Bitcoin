import { utilService } from "./utilService.js"

export const userService = {
    getUser,
    signUp,
    addMove,
    getMoves
}

const USER_KEY = 'user'

function getUser() {
    return utilService.load(USER_KEY)
}

function signUp(name) {
    let user = {
        name,
        coins: 100,
        moves: []
    }
    utilService.store(USER_KEY, user);
    return user
}

function addMove(contact, amount) {
    const user = getUser()
    if (user.coins < amount) return
    user.coins -= amount;
    contact.coins ? contact.coins += amount : contact.coins = amount
    const move = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    user.moves.unshift(move)
    utilService.store(USER_KEY, user)
}

function getMoves(contact) {
    const user = getUser()
    if (contact) return user.moves.filter(move => move.toId === contact._id)
    else {
        if (user.moves.length <= 3) return user.moves
        else return user.moves.slice(0, 3)
    }
}