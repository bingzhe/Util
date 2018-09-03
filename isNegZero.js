//是不是-0

function isNegZero(n) {
    n = Number(n);
    return (n === 0) && (1 / n === -Infinity);
}

isNegZero(-0); //true