
function shifr(str, n, type) {
    const alfUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const alfLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let result = '';
    for (let i = 0; i < str.length; i++) {
        const el = str[i];
        let index = alfUp.indexOf(el);
        let arrOfLaters = alfUp;

        if (index === -1) {
            index = alfLower.indexOf(el);
            arrOfLaters = alfLower;
        }
        if (index === -1) {
            result += el;
            continue;
        }
        let j = 0;
        if (type === 'encode') {
            j += +n
        } else if (type === 'decode') {
            j -= +n
        }

        function getNewIndex() {
            if (j > 25) {
                j -= 26;
                return getNewIndex()
            } else if (j < 0) {
                j += 26;
                return getNewIndex()
            } else {
                let newIndex = index + j;
                newIndex > 25 ? newIndex -= 26 : newIndex;
                return newIndex;
            }
        }
        const newIndex = getNewIndex();
        result += arrOfLaters[newIndex];
    }
    return result;
}

module.exports.shifr = shifr;