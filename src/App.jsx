import { useState, useRef, useEffect } from 'react';
import arrowIcon from './assets/icon-arrow.svg';

function App() {
  const [age, setAge] = useState({
    year: '',
    month: '',
    day: ''
  })

  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const spanRef1 = useRef();
  const spanRef2 = useRef();
  const spanRef3 = useRef();
  const spanRef1a = useRef();
  const spanRef2a = useRef();
  const spanRef3a = useRef();
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDay = now.getDate();
  const [yourYears, setYourYears] = useState(null);
  const [yourMonths, setYourMonths] = useState(null);
  const [yourDays, setYourDays] = useState(null);
  const [result, setResult] = useState(false);

  const pattern = {
    day: /^[0-9]{1,2}$/,
    month: /^\d{1,2}$/,
    year: /^\d{4}$/
  }

  const calYear = ()=>{
    if(nowMonth >= age.month || nowYear >= age.year || (nowMonth == age.month && nowDay >= age.day)){
      setYourYears(nowYear - age.year);
    }
    else if(nowMonth < age.month || (nowMonth < age.month && nowDay < age.day)){
      setYourYears((nowYear - 1) - age.year);
    }
  }

  const calMonth = ()=>{
    if(nowMonth >= age.month){
      setYourMonths(nowMonth - age.month);
    }
    else if(nowMonth < age.month || nowDay < age.day){
      setYourMonths(12 - (age.month - nowMonth));
    }
  }

  const calDays = ()=>{
    if(nowDay >= age.day){
      setYourDays(nowDay - age.day);
    }
    else if(nowDay < age.day){
      setYourDays(30 - (age.day - nowDay));
    }else if(nowDay < age.day 
      && (age.month == 1 
        || age.month == 3 
        || age.month == 5 
        || age.month == 7 
        || age.month == 8 
        || age.month == 10 
        || age.month == 12)) {
          setYourDays(31 - (age.day - nowDay));
        }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(e.target[0].classList.contains('invalid')|| 
    e.target[1].classList.contains('invalid') ||
    e.target[2].classList.contains('invalid')||
    spanRef1a.current.classList.contains('visible') ||
    spanRef2a.current.classList.contains('visible') ||
    spanRef3a.current.classList.contains('visible')){
      console.log('invalid from submit');
    }else if(e.target[0].value.length == 0 || e.target[1].value.length == 0 || e.target[2].value.length == 0){
      if(e.target[0].value.length == 0){
        spanRef1.current.classList.add('visible');
        e.target[0].classList.add('invalid');
        dayRef.current.classList.add('visible')
      }else{
        spanRef1.current.classList.remove('visible');
        e.target[0].classList.remove('invalid');
        dayRef.current.classList.remove('visible');
      }

      if(e.target[1].value.length == 0){
        spanRef2.current.classList.add('visible');
         e.target[1].classList.add('invalid');
         monthRef.current.classList.add('visible');
      }else{
        spanRef2.current.classList.remove('visible');
         e.target[1].classList.remove('invalid');
         monthRef.current.classList.remove('visible');
      }

      if(e.target[2].value.length == 0){
        spanRef3.current.classList.add('visible');
         e.target[2].classList.add('invalid');
         yearRef.current.classList.add('visible');
      }else{
        spanRef3.current.classList.remove('visible');
         e.target[2].classList.remove('invalid');
         yearRef.current.classList.remove('visible');
      }

    }else{
      spanRef1.current.classList.remove('visible');
      spanRef2.current.classList.remove('visible');
      spanRef3.current.classList.remove('visible');
      calDays();
      calMonth();
      calYear();
      setResult(!result); 
      
    }
  }

  let validate = null;

  useEffect(()=>{
      validate = (regex, field)=>{
    if(age.month > 12 || (nowYear == age.year && nowMonth < age.month)){
      field.classList.add('invalid');
      spanRef2a.current.classList.add('visible');
      monthRef.current.classList.add('visible')
    }else{
      field.classList.remove('invalid');
      spanRef2a.current.classList.remove('visible')
      monthRef.current.classList.remove('visible')
    }

    if(age.year > nowYear){
      field.classList.add('invalid');
      spanRef3a.current.classList.add('visible');
      yearRef.current.classList.add('visible')
    }else{
      field.classList.remove('invalid');
      spanRef3a.current.classList.remove('visible')
      yearRef.current.classList.remove('visible')
    }

    if(age.day > 31 ||
       ((age.month == 1 ||
         age.month == 3 ||
          age.month == 5 ||
          age.month == 7 ||
          age.month == 8 ||
          age.month == 10 ||
          age.month == 12) &&
          age.day > 31) ||
          ((age.month == 4 || 
              age.month == 6 || 
              age.month == 9 || 
              age.month == 11) && 
              age.day > 30) || 
              (nowYear == age.year && nowMonth == age.month && nowDay <= age.day)){
                field.classList.add('invalid');
            spanRef1a.current.classList.add('visible');
            dayRef.current.classList.add('visible');
      }else{
        field.classList.remove('invalid');
        spanRef1a.current.classList.remove('visible');
        dayRef.current.classList.remove('visible');
      }
    
    if (age.month == 2) {
        if ((age.year % 4 == 0 && age.year % 100 != 0) || 
          age.year % 400 == 0 || 
          (nowYear == age.year && nowMonth == age.month && nowDay <= age.day)) {
          // Leap year
          if (age.day > 29) {
            field.classList.add('invalid');
            spanRef1a.current.classList.add('visible');
            dayRef.current.classList.add('visible')
          } else {
            field.classList.remove('invalid');
            spanRef1a.current.classList.remove('visible')
            dayRef.current.classList.remove('visible')
          }
        } else {
          // Non-leap year
          if (age.day > 28) {
            field.classList.add('invalid');
            spanRef1a.current.classList.add('visible');
            dayRef.current.classList.add('visible')
          } else {
            field.classList.remove('invalid');
            spanRef1a.current.classList.remove('visible')
            dayRef.current.classList.remove('visible')
          }
        }
      }
      if(!regex.test(field.value)){
        field.classList.add('invalid');
    }else{
        field.classList.remove('invalid');
      }
  }
  })


  return (
    <main className="main-wrapper">
      <form className="form" onSubmit={(e)=> handleSubmit(e)}>
        <div className="field-container">
          <div className="field-wrapper">
            <label ref={dayRef}>day</label>
            <input
              type="text"
              name='day'
              value={age.day}
              placeholder="DD"
              onChange={(e)=> setAge({... age, day: e.target.value})}
              onKeyUp={(e)=> validate(pattern[e.target.attributes.name.value], e.target)}
            />
            <span ref={spanRef1}>This field is required</span>
            <span ref={spanRef1a}>Must be a valid date</span>
          </div>
          <div className="field-wrapper">
            <label ref={monthRef}>month</label>
            <input 
              type="text"
              name='month'
              value={age.month}
              onChange={(e)=> setAge({... age, month: e.target.value})} 
              onKeyUp={(e)=> validate(pattern[e.target.attributes.name.value], e.target)}
              placeholder="MM"
            />
            <span ref={spanRef2}>This field is required</span>
            <span ref={spanRef2a}>Must be a valid month</span>
          </div>
          <div className="field-wrapper">
            <label ref={yearRef}>year</label>
            <input 
              type="text"
              name='year'
               value={age.year}
               onChange={(e)=> setAge({... age, year: e.target.value})}
               onKeyUp={(e)=> validate(pattern[e.target.attributes.name.value], e.target)}
              placeholder="YYYY"
            />
            <span ref={spanRef3}>This field is required</span>
            <span ref={spanRef3a}>Must be in the past</span>
          </div>
        </div>
        <div className="botton-container">
          <div className="empty"></div>
          <button type="submit" className="button">
            <div className="arrow-wrapper">
              <img src={arrowIcon} alt="arrow icon" className="arrow" />
            </div>
          </button>
        </div>
      </form>
      <section className='output'>
        <p className='para'>{result ? yourYears && <span>{yourYears}</span> : <span>- -</span>} years</p>
        <p className='para'>{result ? yourMonths && <span>{yourMonths}</span> : <span>- -</span>} months</p>
        <p className='para'>{result ? yourDays && <span>{yourDays}</span> : <span>- -</span>} days</p>
      </section>
    </main>
  )
}

export default App
