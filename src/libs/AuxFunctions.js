module.exports = {

    RandomNum: (min, max) => {
        let numRandom = Math.floor(Math.random() * (max - min) + min);
        return numRandom;

    }

}