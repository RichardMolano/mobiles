import React, { useState } from "react";

const ProductList = ({ products, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  // Nuevos estados 
  const [editReference, setEditReference] = useState("");
  const [editOS, setEditOS] = useState("");
  const [editLaptop, setEditLaptop] = useState(false);

  const handleEdit = (index, product) => {
    setEditIndex(index);
    setEditValue(product.name);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado");
    //Nuevos Estados
    setEditReference(product.reference);
    setEditOS(product.OS);
    setEditLaptop(product.lap === "Portátil");
  };

  const handleSave = (index) => {
    if (editValue.trim() && editCategory.trim()) {
      onEdit(index, {
        name: editValue,
        category: editCategory,
        status: editStatus ? "Usado" : "Nuevo",
        reference: editReference,
        OS: editOS,
        lap: editLaptop ? "Portátil" : "Escritorio"
      });
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
    setEditCategory("");
    setEditStatus(false);
  };

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


  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="product-item">
            <div className="product-content">
              {editIndex === index ? (
                <>

                  <InputElement
                    value={editValue}
                    setValue={setEditValue}
                    placeholder="Nombre del Equipo"
                    type={"Text"} />
                  <InputElement
                    value={editReference}
                    setValue={setEditReference}
                    placeholder="Referencia del Equipo"
                    type={"Number"}
                  />


                  <SelectElement
                    value={editCategory}
                    setValue={setEditCategory}
                    dicCategory={dic_category}
                    initialItem={"Seleccione la sala"}
                  />
                  <SelectElement
                    value={editOS}
                    setValue={setEditOS}
                    dicCategory={dic_OS}
                    initialItem={"Seleccione el sistema operativo"}
                  />
                  <section style={{ display: "flex", flexDirection: "row" }}>
                    <CheckboxElement
                      checked={editStatus}
                      id="estado-equipo"
                      setChecked={setEditStatus}
                      text={"Computaador Usado "} />
                    <CheckboxElement
                      checked={editLaptop}
                      id="laptop"
                      setChecked={setEditLaptop}
                      text={"Laptop"} />
                  </section>
                </>
              ) : (
                <span>
                  {product.name} - Ref: {product.reference} -
                  <strong> {product.category}</strong> -
                  {product.status} - {product.lap} - SO: {product.OS}
                </span>
              )}
            </div>
            <div className="button-group">
              {editIndex === index ? (
                <>
                  <button className="save-btn" onClick={() => handleSave(index)}>Guardar</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancelar</button>
                </>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => handleEdit(index, product)}>Editar</button>
                  <button className="delete-btn" onClick={() => onDelete(index)}>Eliminar</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
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

export default ProductList;