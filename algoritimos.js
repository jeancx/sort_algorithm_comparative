class Algoritimos {
  bubbleSort = new ParallelFunction(function (lista, percentage) {
    let beginTime = new Date(), endTime, orderedList;

    const _bubbleSort = (list) => {
      let trocado, i;

      do {
        trocado = false;

        for (i = 0; i < list.length; i++) {
          if (list[i] > list[i + 1]) {
            var temp = list[i];
            list[i] = list[i + 1];
            list[i + 1] = temp;

            trocado = true
          }
        }
      } while (trocado);

      return list;
    };

    orderedList = _bubbleSort(lista.slice());
    endTime = new Date() - beginTime;
    return { originalList: lista, orderedList, endTime, percentage };
  });

  insertionSort = new ParallelFunction(function (lista, percentage) {
    let beginTime = new Date(), endTime, orderedList;

    const _insertionSort = (list) => {
      let i, j, eleito;

      for (i = 0; i < list.length; i++) {
        eleito = list[i];
        j = i - 1;

        while (j >= 0 && eleito < list[j]) {
          list[j + 1] = list[j];
          j = j - 1;
        }

        if (j !== i - 1) {
          list[j + 1] = eleito;
        }
      }

      return list;
    };

    orderedList = _insertionSort(lista.slice());
    endTime = new Date() - beginTime;
    return { originalList: lista, orderedList, endTime, percentage };
  });

  quickSort = new ParallelFunction(function (lista, percentage) {
    let beginTime = new Date(), endTime, orderedList;

    const _quickSort = (list) => {
      if (list.length <= 1) {
        return list;
      } else {
        var left = [];
        var right = [];
        var newArray = [];
        var pivot = list.pop();
        var length = list.length;

        for (var i = 0; i < length; i++) {
          if (list[i] <= pivot) {
            left.push(list[i]);
          } else {
            right.push(list[i]);
          }
        }

        left = _quickSort(left);
        right = _quickSort(right);

        return newArray.concat(left, pivot, right);
      }
    };

    orderedList = _quickSort(lista.slice());
    endTime = new Date() - beginTime;
    return { originalList: lista, orderedList, endTime, percentage };
  });
}
