import React, { useEffect } from 'react';
import {useState} from 'react';

interface Form {
  number:string,
  toSearch:string
}


function App() {

  //Values of the form
  const [Form, setForm] = useState<Form>({number:'',
                                    toSearch:''});

  //List stocking the information
  const [list, setList] = useState(new Map());

  //How many times we added a number
  const [Qsubmited, setQsubmited] = useState<number>(0);

  //Research's result
  const [toShow, setToShow] = useState<string>('');

  //Research's argument
  const [Searched, setSearched] = useState<string>('');

  //Show or not the information
  const [isOpen,setIsOpen] = useState<boolean>(false);

  //Form changes
  const onChange = (event:any) => {
    if(event.target.name==='toSearch'){
      setIsOpen(false);
    }
    setForm({
        ...Form,
        [event.target.name] : event.target.value
    });

    
  }

  const onSubmit = (event:any) => {
    event.preventDefault();


    //Element to add
    const element = Form.number;
    
    //Copy of liste
    const copyMap = new Map(list);

    //Does element exist in liste?
    const c = copyMap.get(element);


    if (copyMap.get(element)){
      copyMap.set(element, c+1)
    }else {
      copyMap.set(element, 1)
    }

    setList(copyMap);

    setQsubmited(Qsubmited+1);

  }

  const onGetNumber = (event:any) => {
    //We prevent reload the page
    event.preventDefault();

    
    //Element to search
    setSearched(Form.toSearch);

    //Research's result
    setToShow((list.get(Searched)!=undefined)? list.get(Searched) : '0');
    
    //console.log(Searched,toShow)
    
    //Show the results
    setIsOpen(true);
  }

  //If i add a same number than Searched , we have to modify the results
  useEffect(() => {
    setToShow(list.get(Form.toSearch));
  }, [list.get(Searched)]
  )
  
  return (
    <div className="container">
      <form className='form'>
          <h3>Add a number</h3>
          <input 
                type="text" 
                placeholder="Add a phone number"
                name="number"
                value={Form?.number}
                onChange={onChange}
                className='form-control mt-4'
            />
          <button
              className="btn btn-outline-primary mt-2"
              onClick={onSubmit}>
              Add
          </button>
    </form> 

    <hr/>

    <form className='mt-4'>
          <h3>How many times</h3>
          <input 
            type="text" 
            placeholder="Search a phone number"
            name="toSearch"
            value={Form.toSearch}
            onChange={onChange}
            className='form-control mt-4'
            />
          <button
            className="btn btn-outline-primary mt-2"
            onClick={onGetNumber}>
            Get
          </button>
      </form>

      {(!isOpen)?
          null : <span>The number: '{Searched}' appears {toShow} times </span>}
                      
    </div>
  );
}

export default App;
