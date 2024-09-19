fetch("data.json")
  .then((data) => data.json())
  .then((result) => {
    console.log(result);
  });
