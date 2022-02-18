// T1.1 
function arrange(str) {
  return str.split('').sort().join('');
}

// T1.2 
function encode(str) {
  const arr = str.split('');
  let current = arr[0];
  let count = 1;
  let new_str = '';

  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] === current)
      count += 1;
    else {
      numb = count === 1 ? '' : count;
      
      new_str += numb + current;
      
      current = arr[i];
      count = 1;
    }
  }
  return new_str;
}

// T1.3
function check(arr, k) {
  const n = arr.length;

  for (let i = 0; i < n - 1; ++i) {
    for (let j = i + 1; j < n; ++j) {
        if (arr[i] + arr[j] === k)
          return true;
    }
  }
  return false;
}
