function averageOfList(list) {
    const sumOfList = list.reduce((partialSum, a) => partialSum + a, 0);
    return sumOfList / list.length;
}