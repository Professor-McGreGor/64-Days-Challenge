// ASCII Art Characters
const ASCII_ART = {
    player: '🦸',
    treasure: '💎',
    monster: '👾',
    potion: '🧪',
    sword: '⚔️',
    dead: '💀'
};

// Game State
const gameState = {
    health: 100,
    gold: 0,
    inventory: [],
    level: 1,
    experience: 0
};

// Cool color console logging
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m'
};

// Cool text effect
const typeText = async (text, speed = 50) => {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    console.log();
};

// Generate random events
const generateEvent = () => {
    const events = [
        { type: 'monster', probability: 0.3 },
        { type: 'treasure', probability: 0.2 },
        { type: 'potion', probability: 0.2 },
        { type: 'nothing', probability: 0.3 }
    ];
    
    const roll = Math.random();
    let probabilitySum = 0;
    
    for (let event of events) {
        probabilitySum += event.probability;
        if (roll <= probabilitySum) return event.type;
    }
};

// Combat system
const combat = async (monsterLevel) => {
    const monster = {
        health: 50 + (monsterLevel * 10),
        damage: 5 + (monsterLevel * 2),
        name: ['Goblin', 'Orc', 'Dragon', 'Ghost', 'Demon'][Math.floor(Math.random() * 5)]
    };

    await typeText(`${colors.red}A wild ${monster.name} appears! ${ASCII_ART.monster}${colors.reset}`);
    
    while (monster.health > 0 && gameState.health > 0) {
        // Player attack
        const playerDamage = Math.floor(Math.random() * 20) + 10;
        monster.health -= playerDamage;
        await typeText(`${colors.green}You hit the ${monster.name} for ${playerDamage} damage!${colors.reset}`);
        
        // Monster attack
        if (monster.health > 0) {
            gameState.health -= monster.damage;
            await typeText(`${colors.red}${monster.name} hits you for ${monster.damage} damage!${colors.reset}`);
        }
        
        await typeText(`Your Health: ${gameState.health} | Monster Health: ${monster.health}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    if (gameState.health > 0) {
        const goldEarned = Math.floor(Math.random() * 50) + 20;
        gameState.gold += goldEarned;
        gameState.experience += 25;
        await typeText(`${colors.yellow}You defeated the ${monster.name}! Earned ${goldEarned} gold!${colors.reset}`);
        checkLevelUp();
    }
};

// Level up system
const checkLevelUp = async () => {
    if (gameState.experience >= gameState.level * 100) {
        gameState.level++;
        gameState.health = 100;
        await typeText(`${colors.magenta}Level Up! You are now level ${gameState.level}!${colors.reset}`);
    }
};

// Main game loop
const startAdventure = async () => {
    console.clear();
    await typeText(`${colors.bright}Welcome to the Terminal Adventure!${colors.reset}`);
    
    while (gameState.health > 0) {
        await typeText(`\n${ASCII_ART.player} Health: ${gameState.health} | Gold: ${gameState.gold} | Level: ${gameState.level}`);
        await typeText(`${colors.blue}Exploring...${colors.reset}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const event = generateEvent();
        
        switch (event) {
            case 'monster':
                await combat(gameState.level);
                break;
            case 'treasure':
                const gold = Math.floor(Math.random() * 30) + 10;
                gameState.gold += gold;
                await typeText(`${colors.yellow}Found treasure! ${ASCII_ART.treasure} +${gold} gold!${colors.reset}`);
                break;
            case 'potion':
                const healing = 30;
                gameState.health = Math.min(100, gameState.health + healing);
                await typeText(`${colors.green}Found a healing potion! ${ASCII_ART.potion} +${healing} health!${colors.reset}`);
                break;
            default:
                await typeText('Nothing interesting here...');
        }
        
        if (gameState.health <= 0) {
            await typeText(`${colors.red}Game Over! ${ASCII_ART.dead}${colors.reset}`);
            await typeText(`Final Score: ${gameState.gold} gold, Level ${gameState.level}`);
            break;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
};

// Start the game
startAdventure().catch(console.error);
