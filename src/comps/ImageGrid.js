import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
const ImageGrid = ({ setSelectedImg }) => {
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
export default ImageGrid;