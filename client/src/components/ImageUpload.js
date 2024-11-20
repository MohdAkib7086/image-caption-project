import { useContext, useRef, useState } from "react";
import messageContext from "../context/MessageContext";
import addImage from "../assets/images/add.svg";
import { validateImage } from "../utilities/validateImage";

import callFromImage from "../services/APIFunCall/callFromImage";

const ImageUpload = () => {
  const { divs, setDivs } = useContext(messageContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    console.log(file.name);
    if (file) {
      fileInputRef.current.value = null;
    }
    setSelectedImage(file);
    if (!validateImage(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      callFromImage(reader,setDivs);
    }
    reader.readAsDataURL(file);
  };
  return (
    <>
      <input
        id="input-file"
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <label htmlFor="input-file">
       
          <img src={addImage} alt="image" style={{width:"24px", height:"24px"}} />
        
      </label>
    </>
  );
};

export default ImageUpload;
