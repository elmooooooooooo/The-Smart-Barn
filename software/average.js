function averageOfList(list) {
    var sumOfList = 0;
    for (index = 0; index < list.length; index++) {
        sumOfList += list[index]["y"];
    }
    return sumOfList / list.length;
}

var arr = [1, 2, 4]
arr.redu