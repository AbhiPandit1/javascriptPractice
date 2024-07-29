const arr = [1, 2, 3, 4, 4, 5, 6];

const arr1 = () => {
  for (i = 0; i < arr.length; i++) {
    for (j = i+1; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
};
arr1();


