const parser = new DOMParser();
//console.log('parser', parser);

const xmlString = `
  <list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
  </list>
`;

//console.log('xmlString', xmlString);

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
let parent = xmlDOM.querySelector('list'),
    students = parent.querySelectorAll('student'),
    obj = {
        [parent.nodeName]: Array.from(students).map(el => {
            let name = el.querySelector('name'),
                age = el.querySelector('age'),
                prof = el.querySelector('prof');
            return {
                name: `${name.children[0].textContent} ${name.children[1].textContent}`,
                age: age.textContent,
                lang: name.getAttribute('lang'),
                prof: prof.textContent,
            }
        })
    }

console.log(obj);




