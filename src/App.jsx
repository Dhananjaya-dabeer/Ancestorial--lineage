import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const NthChild = ({ child }) => {
  return (
    <div>
      <div>{child.name}</div>
      <ul>
        {child.child.map((child, index) => (
          <li key={index}>
            <NthChild child={child} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Child = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <NthChild key={index} child={item} />
      ))}
    </div>
  );
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          "https://raw.githubusercontent.com/Vibencode-Solutions/mock-api/main/api.json"
        );
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(data.map((item) => item.child));

  return (
    <>
      <div>
        <h1>Ancestral Lineage</h1>
        <Child data={data} />
      </div>
    </>
  );
}

export default App;
