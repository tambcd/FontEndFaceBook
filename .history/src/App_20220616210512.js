import Header from "./Header";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Home from "./Home";
import Friend from "./Friend";
import Watch from "./Watch";
import Personalpage from "./Personalpage";
import Map from "./Map";




function App() {
  const [{ user }, dispatch] = useStateValue();



  return (

    <>
      {
        !user ? (<Login />) : (
          <>
            <div className="App">

              <Header />
              <div className="app_body">

                <BrowserRouter>
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/Friend" element={<Friend />} />
                    <Route path="/watch" element={<Watch />} />
                    <Route path="/personal_page" element={<Personalpage />} />
                    <Route path="/map" element={<Map />} />


                  </Routes>
                </BrowserRouter>




              </div>

            </div>

          </>
        )
      }

    </>
  );
}

export default App;
