
import  QuestionForm  from './Question.js';
import Detials from './Detials.js';
import Home from './Home.js';
import About from './About.js';
import Login from './Login.js';
import Register from './Register.js';
import { BrowserRouter,Route, Routes} from 'react-router-dom';



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
       <Route path="/home" element={<Home />}></Route>
       <Route path="/about" element={<About />}></Route>
       <Route path="/questions" element={<QuestionForm />}></Route>
       <Route path="/detials/:id" element={<Detials />}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;


