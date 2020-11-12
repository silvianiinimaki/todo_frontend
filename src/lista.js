import React from 'react';
 

 
const ListWithAddItem = () => {
  const [value, setValue] = React.useState('');
  const [list, setList] = React.useState([]);
 
  const handleChange = (event) => {
    setValue(event.target.value);
  };
 
  const handleSubmit = (event) => {
    if (value) {
      setList(list.concat(value));
    }
 
    setValue('');
 
    event.preventDefault();
  };

  const lista = () => {
      return (
        <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      )
  }
 
  return (
    <div>
        {lista()}
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Lisää listaan</button>
      </form>
    </div>
  );
};
 
export default ListWithAddItem;