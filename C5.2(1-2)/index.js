const xmlString = `<list>
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
</list>`;
const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const students = xmlDOM.querySelectorAll("student");
const result = {
  list: []
};
for (student of students) {
  let name = student.querySelector("name");
  let entity = {
    name:
      name.querySelector("first").textContent +
      name.querySelector("second").textContent,
    age: student.querySelector("age").textContent,
    prof: student.querySelector("prof").textContent,
    lang: name.getAttribute("lang")
  };
  result.list.push(entity);
  delete entity;
}
console.log("task 1", result);

const jsonString = `{"list": [{"name": "Petr","age": "20","prof": "mechanic"}, {"name": "Vova","age": "60","prof": "pilot"}]}`;
console.log(jsonString);
const jObj = JSON.parse(jsonString);
console.log("task 2", jObj);
