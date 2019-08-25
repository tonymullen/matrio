
let colors = {
    'east' : 'purple',
    'north' : 'yellow',
    'west' : 'orange',
    'player' : 'blue'
}

export function tableStyle(player) {
    return {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderSpacing : '0',
        backgroundColor: colors[player],
        padding: '10px'
    }
}