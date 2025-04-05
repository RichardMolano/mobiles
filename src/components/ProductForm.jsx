import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false); // Estado para determinar si el equipo es usado
  const [laptop, setIsLaptop] = useState(false); // Estado para determinar si el equipo es un portátil
  const [reference, setReference] = useState(); // Estado para la referencia del equipo
  const [OS, setOS] = useState("");
  const [entryDate, setEntryDate] = useState(""); // Estado para la fecha de ingreso


  const dic_OS = {
    "Windows": { "Windows 10": "Windows 10", "Windows 11": "Windows 11" },
    "Linux": { "Ubuntu": "Ubuntu", "Fedora": "Fedora" },
    "MacOS": { "MacOS": "MacOS" },
  };

  const dic_category = {
    "edificio_giordano": {
      "Sala 1E": "Sala 1E",
      "Lab. Software": "Lab. Software",
    },
    "edificio_santo_domingo": {
      "Sala 1F": "Sala 1F",
      "Sala 2F": "Sala 2F",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que la fecha no sea futura
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    if (entryDate > today) { // Compara la fecha de ingreso con la fecha actual
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }
    if (product.trim() && category.trim() && entryDate.trim()) {
      onAdd({ name: product, category, status: isUsed ? "Usado" : "Nuevo", lap: laptop ? "Portátil" : "Escritorio", reference: reference, OS });
      setProduct("");
      setCategory("");
      setIsUsed(false);
      setIsLaptop(false);
      setReference(Number);
      setOS("");
      setReference("")
      setEntryDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "row" , gap: "10px", marginBottom: "10px" }}>
      <InputElement value={product} setValue={setProduct} placeholder="Nombre del Equipo" type={"Text"} />
      <InputElement value={reference} setValue={setReference} placeholder="Referencia del Equipo" type={"Number"} />
      </div>  
      <div style={{ display: "flex", flexDirection: "row" , gap: "10px", marginBottom: "10px" }} >
      <SelectElement value={category} setValue={setCategory} dicCategory={dic_category} initialItem={"Seleccione la sala"} />
      <SelectElement value={OS} setValue={setOS} dicCategory={dic_OS} initialItem={"Seleccione el sistema operativo"} />
      
      </div>
      <div style={{ display: "flex", flexDirection: "row" , gap: "10px", marginBottom: "10px" , alignItems : "center" , alignContent : "center"  , width :"100%"}} >
     <section style={{ display: "flex", flexDirection: "row" }}>
        <CheckboxElement checked={isUsed} id="estado-equipo" setChecked={setIsUsed} text={"Computaador Usado "} />
        <CheckboxElement checked={laptop} id="laptop" setChecked={setIsLaptop} text={"Laptop"} />
      </section>
      <DateElement value={entryDate} setValue={setEntryDate} text={"Fecha de ingreso del equipo:"} />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
};

const DateElement = ({ value, setValue,text }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <label>{text}</label>
    <input
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      max={new Date().toISOString().split("T")[0]} // Establece la fecha máxima como la fecha actual  
      required
    />
    </div>
  );
}
const CheckboxElement = ({ checked, id, setChecked, text }) => {
  return (
    <label className="checkbox-container" style={{ marginRight: "10px" }}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      {text}
    </label>
  );
};

const SelectElement = ({ value, setValue, dicCategory, initialItem }) => {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="">{initialItem}</option>
      {Object.keys(dicCategory).map((building) => (
        <optgroup key={building} label={building.replace("_", " ")}>
          {Object.keys(dicCategory[building]).map((room) => (
            <option key={room} value={dicCategory[building][room]}>
              {dicCategory[building][room]}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

const InputElement = ({ value, setValue, placeholder, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
    />
  );
};

export default ProductForm;
