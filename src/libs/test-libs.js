module.exports = async function () {
  let a = await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(123);
            }, 2000)
          });

  console.log(a);

  let b = await new Promise((resolve, reject) => {
    setTimeout(() => resolve(3444444444), 2000);
  })

  console.log(b);
}
