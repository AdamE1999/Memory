// Start The Game & Enter The Name When Click On Starting Control Button
document.querySelector('.control-buttons span').onclick = function() {
    
    // get the player name
    let playerName = prompt('What Is Your Name ?');
    
    if(playerName === null || playerName === "") {
        
        // if empty set unknown 
        document.querySelector('.name span').innerHTML = 'Unknown';
        
    } else {
        
        // else set as player name
        document.querySelector('.name span').innerHTML = playerName;
        
    }
    
    // remove splash screen
    document.querySelector('.control-buttons').remove();
    
    // play music 
    document.getElementById('end').play();
    
};


    // set card flip duration 
let duration = 1000,
    // get the blocks container
    blocksContainer = document.querySelector('.memory-game-blocks'), 
    // get blocks in Array
    blocks = Array.from(blocksContainer.children), 
    // make order range contains index blocks length
    orderRange = [...Array(blocks.length).keys()];
    
// trigger shuffle function
shuffle(orderRange);

// shuffle blocks randomly 
blocks.forEach((block, index) => {
    
    // set css order property to blocks elements randomly
    block.style.order = orderRange[index];
    
    // Add click event
    block.addEventListener('click', function() {
        
        // trigger the flipBlocks function 
        flipBlocks(block);
        
    });
    
});

// blocks flipped function
function flipBlocks(flippedBlock) {
    
    // add class is-flipped 
    flippedBlock.classList.add('is-flipped');
    
    // collect all flipped blocks 
    let allFlippedBlocks = blocks.filter(block => block.classList.contains('is-flipped'));
    
    if(allFlippedBlocks.length === 2) {
        
        // stop clicking function 
        stopClicking();
        
        // check matched blocks function 
        matchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    
    } 
    
}

// stop clicking function 
function stopClicking() {
    
    // add class no-clicking on main container 
    blocksContainer.classList.add('no-clicking');
    
    setTimeout(() => {
        
        // remove no-clicking class after the duration
        blocksContainer.classList.remove('no-clicking');
    
    }, duration);
    
}

// check matched blocks function 
function matchedBlocks(firstBlock, secondBlock) {
    
    // get tries element 
    let triesElement = document.querySelector('.tries span');
    
    if(firstBlock.dataset.technology == secondBlock.dataset.technology) {
        
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        
        
    } else {
        
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        setTimeout(() => {
            
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            
        }, duration);
        
    }
    
}

// shuffle function
function shuffle(array) {
    
    // settings vars
    let current = array.length,
        temp, 
        random;
        
    while(current > 0) {
        
        random = Math.floor(Math.random() * current);
        
        current--;
        
        // save current in stash
        temp = array[current];
        
        // assign random to current
        array[current] = array[random];
        
        // assign temporal to random
        array[random] = temp
    }
    
    return array;
    
}