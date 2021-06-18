import React, { useState } from 'react';
import Title from './comps/Title';
import Modal from './comps/Modal';
import styled, {ThemeProvider} from 'styled-components';
import {lightTheme , darkTheme , GlobalStyles} from './themes.js';
import useFirestore from './hooks/useFirestore';
import { motion } from 'framer-motion';
import ProgressBar from './comps/ProgressBar';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [theme, setTheme] = useState("light");


  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <StyledApp>
    <div className="App">
      <Title/>
      <button className="toggle1" onClick={() => themeToggler()}><i class="fas fa-adjust fa-2x"></i></button>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
    </StyledApp>
    
    </ThemeProvider>
  );
}





function ImageGrid({ setSelectedImg }) {
  const { docs } = useFirestore('images');

  return (
    <div className="img-grid">
      {docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id} 
          layout
          whileHover={{ opacity: 1 }}s
          onClick={() => setSelectedImg(doc.url)}
        >
          <a href={doc.url} className="alt-grey"><motion.img src={doc.url} onError={(e)=>{e.target.onerror = null; e.target.src="2.png"}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }} 
          /></a>
        </motion.div>
      ))}
    </div>
  )
}



function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    let selected = e.target.files[0];
// File Type
    if (selected) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please Select a File)');
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBar file={file} setFile={setFile} /> }
      </div>
    </form>
  );
}

export default App;
