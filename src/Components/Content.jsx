import {React,useState, useEffect} from 'react'
import quoteOpen from "../assets/quote-open.svg";
import quoteClose from "../assets/quote-close.svg";
import './Content.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {fetchQuote} from '../services/quoteApi'
function Content() {

  const [quotesData, setQuotesData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);

  const updateQuotes = async ()=>{
    const result = await fetchQuote();
    if(result && result?.quotes){
      setQuotesData(result?.quotes);
      setCurrentQuote(result.quotes[Math.floor(Math.random() * result.quotes.length)]);
      toast.info( <>
      <span role="img" aria-label="Swipe">👉</span> Swipe or drag <span role="img" aria-label="Drag">🖐️</span> left or right to change the quote!
    </>,{
      position:"top-center",style:{ backgroundColor: 'lightblue', color: 'black' }});
    }else{
        console.log("No Quote found in tha api");
    }
        
  }
  useEffect(() => {
    updateQuotes();
     
  }, [])
  const [isAnimating, setIsAnimating] = useState(false);
  const getRandomQuote = ()=>{
    return quotesData[Math.floor(Math.random() * quotesData.length)];
  }
  const triggerQuoteChange = () =>{
    setIsAnimating(true);
    setTimeout(()=>{
      setCurrentQuote(getRandomQuote());
      setIsAnimating(false);
    },300);
  }
  
  const handleDragEnd = (e)=>{
    const dragOffSet = e.pageX;
    if (dragOffSet < window.innerWidth / 2 || dragOffSet > window.innerWidth / 2 ){
      triggerQuoteChange();
    }
  }
  let touchStartX = 0
  const handleSwipeStart = (e)=>{
      touchStartX = e.touches[0].clientX;
  }
  const handleSwipeEnd = (e)=>{
    const touchEndX = e.changedTouches[0].clientX;
    if(touchStartX !==0 && Math.abs(touchStartX - touchEndX) > 50){
      triggerQuoteChange();
    }
  }
  return (
    <>
      <div className="container d-flex align-items-center justify-content-centre bg-light border-2 rounded shadow main-container" draggable
      onDragEnd = {handleDragEnd}
      onTouchStart = {handleSwipeStart}
      onTouchEnd = {handleSwipeEnd}>
        <div className={`quote-container ${isAnimating?'fade-out':'fade-in'}`}>
          <img src={quoteOpen}/>
          <p className="current-quote">{currentQuote?.quote}
          </p>
          <div className="font-author-container"> 

            <p className="font-author-text">{currentQuote?.author}</p>

          </div>
          <img src={quoteClose} className="quote-close"/>

        </div>
      </div>
      <ToastContainer autoclose={3000} />
    </> 
  )
}

export default Content
