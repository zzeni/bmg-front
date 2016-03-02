bmg.filter('range', function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
})
.filter('uniq', function () {
    return function (input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
})
.filter('map', function () {
  return function (input, key) {
    var result = [];
    for (var i=0; i<input.length; i++) {
      result.push(input[i][key]);
    }
    return result;
  };
});
