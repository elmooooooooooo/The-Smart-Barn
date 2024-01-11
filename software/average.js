function averageOfList(list) {
    const sumOfList = list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sumOfList / list.length;
}

var arr = [1, 2, 4]
arr.redu