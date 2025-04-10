import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editEntryDate, setEditEntryDate] = useState("");
  // Nuevos estados 
  const [editReference, setEditReference] = useState("");
  const [editOS, setEditOS] = useState("");
  const [editLaptop, setEditLaptop] = useState(false);
  //date config
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editImage, setEditImage] = useState(null); // Nuevo estado para imagen editada


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    if (editIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editIndex]); // Se ejecuta cuando editIndex cambia

  const handleEdit = (index, product) => {
    setEditIndex(index);
    setEditValue(product.name);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado");
    setEditEntryDate(product.entryDate);
    //Nuevos Estados
    setEditReference(product.reference);
    setEditOS(product.OS);
    setEditLaptop(product.lap === "Portátil");
    setEditImage(product.image); // Asigna la imagen del producto editado
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result); // Guarda la imagen como base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (index) => {
    const today = new Date().toISOString().split("T")[0];
    if (editEntryDate > today) {
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }

    if (editValue.trim() && editCategory.trim() && editEntryDate) {
      onEdit(index, {
        name: editValue,
        category: editCategory,
        status: editStatus ? "Usado" : "Nuevo",
        entryDate: editEntryDate,
        reference: editReference,
        OS: editOS,
        lap: editLaptop ? "Portátil" : "Escritorio",
        image: editImage, // Usa la imagen actual (vieja(cargada al registro) o nueva)
      });
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
    setEditCategory("");
    setEditStatus(false);
    setEditEntryDate("");
    setEditImage(null); // Limpia la imagen editada
    setEditReference("");
  };
  const handleClearSearch = () => { // Función que maneja la limpieza de la búsqueda
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
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

  const filteredProducts = products.filter((product) => { // Filtra los productos según el término de búsqueda y el rango de fechas
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Compara el nombre del producto con el término de búsqueda
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange =
      (!startDate || product.entryDate >= startDate) &&
      (!endDate || product.entryDate <= endDate);

    return matchesSearch && matchesDateRange;
  });

  return (
    <div>
      <h2>Lista de Productos</h2>
      <div className="filter-container">   {/* Contenedor de la barra de búsqueda y filtro de fechas */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <button onClick={handleClearSearch} className="clear-btn">Limpiar</button>
      </div>
      <ul>
        {filteredProducts.map((product, index) => (
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
                  <DateElement
                    value={editEntryDate}
                    setValue={setEditEntryDate}
                    text={"Fecha de ingreso del equipo:"}
                  />
                  <ImageElement
                    handleImageChange={handleImageChange}
                    imagePreview={editImage} // Usa la imagen editada
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
                <div>

                <img
                  src={product.image}
                  alt="Imagen del producto"
                  className="product-icon"
                  />
                <span>
                  {product.name} - Ref: {product.reference} -
                  <strong> {product.category}</strong> -
                  {product.status} - {product.lap} - SO: {product.OS}
                </span>
                  </div>
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
                  <button onClick={() => navigate("/detalle-producto", { state: { index, product } })}>
                    Ver Detalles
                  </button>
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

const ImageElement = ({ handleImageChange, imagePreview }) => {
  return (
    <div>
      <label>Imagen del producto:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {/* Vista previa de la imagen */}
      {imagePreview && (
        <div>
          <p>Vista previa de la imagen:</p>
          <img
            src={imagePreview}
            alt="Vista previa"
            style={{ width: "200px", height: "auto", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}


const DateElement = ({ value, setValue, text }) => {
  return (
    <>
      <label>{text}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        max={new Date().toISOString().split("T")[0]} // Establece la fecha máxima como la fecha actual  
        required
      />
    </>
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
    />
  );
};

export default ProductList;