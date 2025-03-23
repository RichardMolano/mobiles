import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false); // Estado para determinar si el equipo es usado
  const [laptop, setIsLaptop] = useState(false); // Estado para determinar si el equipo es un portátil
  const [reference, setReference] = useState(); // Estado para la referencia del equipo
  const [OS, setOS] = useState("");

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
    if (product.trim() && category.trim()) {
      onAdd({ name: product, category, status: isUsed ? "Usado" : "Nuevo", lap: laptop ? "Portátil" : "Escritorio", reference: reference, OS });
      setProduct("");
      setCategory("");
      setIsUsed(false);
      setIsLaptop(false);
      setReference(Number);
      setOS("");
      setReference("")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputElement value={product} setValue={setProduct} placeholder="Nombre del Equipo" type={"Text"} />
      <InputElement value={reference} setValue={setReference} placeholder="Referencia del Equipo" type={"Number"} />
      <SelectElement value={category} setValue={setCategory} dicCategory={dic_category} initialItem={"Seleccione la sala"} />
      <SelectElement value={OS} setValue={setOS} dicCategory={dic_OS} initialItem={"Seleccione el sistema operativo"} />
      <section style={{ display: "flex", flexDirection: "row" }}>
        <CheckboxElement checked={isUsed} id="estado-equipo" setChecked={setIsUsed} text={"Computaador Usado "} />
        <CheckboxElement checked={laptop} id="laptop" setChecked={setIsLaptop} text={"Laptop"} />
      </section>
      <button type="submit">Agregar</button>
    </form>
  );
};

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
    />
  );
};

export default ProductForm;
