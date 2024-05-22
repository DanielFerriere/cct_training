function random_int(max) {
    return Math.floor(Math.random() * max);
}
  
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function array_sample(array, n) {
    let sample = [];
    let numbers = [];
    for (let i=0; i<array.length; i++) numbers.push(i);

    for (let i=0; i<n; i++) {
        let r = random_int(numbers.length);
        let index = numbers.indexOf(r);
        sample.push(array[numbers[r]]);
        numbers.splice(index, 1);
    }

    return sample;
}

export {random_int, shuffle, array_sample};