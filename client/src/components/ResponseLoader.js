import {motion} from 'framer-motion'
const ResponseLoader = () => {
    return(
  <div className="response-loader flex flex-col gap-3">
    <motion.div initial={{opacity:0, width:'0px'}} animate={{opacity:1, width:'100%'}} exit={{opacity:0, width:'0px'}} className="loader-lumiq  w-96 h-5 rounded-full"></motion.div>
    <motion.div initial={{opacity:0, width:'0px'}} animate={{opacity:1, width:'100%'}} exit={{opacity:0, width:'0px'}} className="loader-lumiq1 w-96 h-5 rounded-full"></motion.div>
    <motion.div initial={{opacity:0, width:'0px'}} animate={{opacity:1, width:'50%'}} exit={{opacity:0, width:'0px'}} className="loader-lumiq2 w-40 h-5 rounded-full"></motion.div>
  </div>)
};
export default ResponseLoader;