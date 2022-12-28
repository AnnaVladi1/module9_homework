const  jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

const data = JSON.parse(jsonString);
const list = data.list,
    ob = {};

Array.from(list).map((el,index) => {
    let obj = {};
    for(let key in el) {
        obj[key] = +el[key] === +el[key] ? +el[key] : el[key];
    }
    ob[index] = obj;
})
data.list = ob;

console.log(data);