import { useState } from 'react';
import './App.css';
import CropImage from './CropImage';
import ImageCompresser from './ImageCompresser';

function App() {

  const [uploadImage, setUploadImage] = useState(false);
  const [originalLink, setOriginalLink] = useState("");
  const [originalImage, setOriginalImage] = useState('');
  const [clicked, setClicked] = useState(false);
  const [compressedLink, setCompressedLink] = useState();
  const [outputFileName, setOutputFileName] = useState();

  const handle = e => {
    const imageFile = e.target.files[0];
    setOriginalLink(URL.createObjectURL(imageFile));
    setOriginalImage(imageFile);
    setUploadImage(true);
    setOutputFileName(imageFile.name);
  };

  return (
    <div className="App">
      <ImageCompresser
        originalImage={originalImage}
        originalLink={originalLink}
        uploadImage={uploadImage}
        outputFileName={outputFileName}
        compressedLink={compressedLink}
        setCompressedLink={setCompressedLink}
        handle={handle}
        clicked={clicked}
      />
      <CropImage src={originalLink} />
    </div>
  );
}

export default App;
