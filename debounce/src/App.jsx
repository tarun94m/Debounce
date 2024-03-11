import { useEffect, useState } from "react";

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dealyedFetchData();
  }, [searchInput]);

  
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  
 const fetchData = async () => {
   console.log('hi')
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      const titles = data.map((item) => item.title);
  // console.log(data)
    //  const titles = data.title
   setSuggestions(titles);
 }
    const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchInput.toLowerCase())
  );
  const dealyedFetchData = throttle(fetchData,5000);
  
  return (
    <>
      <input type="text" value={searchInput} onChange={handleInputChange} />
     <ul>
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </>
  );
};

 export default App;