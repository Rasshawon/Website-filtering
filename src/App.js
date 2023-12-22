import { useState } from "react";
import Nav from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
//Database import
import products from "./db/data";
import Card from "./components/Card";

function App() {
  const [selectedCategory,setSelectedCategory]= useState(null);
  const [query,setQuery]=useState("")
  //input Filter
  const handleInputChange = (event) =>{
    setQuery(event.target.value);
  }
  const filteredItems= products.filter(product => product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())!==-1
    );
     //radio Filter
     const handleChange = (event) =>{
      setSelectedCategory (event.target.value);
     }
//Button Filter
const handleClick = (event) =>{
  setSelectedCategory(event.target.value);
}
function filteredData(products,selected,query){
  let filteredProducts=products;
  //Filtering Input Item
  if(query){
    filteredProducts = filteredItems;
  }
  //selected Filter
  if(selected){
    filteredProducts = filteredProducts.filter(
    ({category,color,company,newPrice,title}) =>
       category ===selected ||
       color ===selected ||   
       company ===selected || 
       newPrice ===selected ||
       title ===selected
       );

  }
  return filteredProducts.map(({img,title,star,reviews,newPrice,prevPrice})=>(
    <Card key={Math.random()}
    img={img}
    title={title}
    star={star}
    reviews={reviews}
    newPrice={newPrice}
    prevPrice={prevPrice }
    />
  ))
}
const result= filteredData(products,selectedCategory,query)
  return <> 
    <Sidebar handleChange={handleChange}/>
    <Nav query={query} handleInputChange={handleInputChange}/>
    <Recommended handleClick={handleClick}/>
    <Products result={result}/>
    <footer className="footer">@copyright This website build by <h2>SHAWON</h2></footer>
    
</>
    
}

export default App; 
