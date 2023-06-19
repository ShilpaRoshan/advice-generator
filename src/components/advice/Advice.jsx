import { useState, useEffect } from "react";
import axios from "axios";
//import { LoaderSpinner } from "../loader/LoaderSpinner";
import "./advice.css";
import Divider from "../../assets/pattern-divider-desktop.svg";

export function Advice() {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      await axios.get("https://api.adviceslip.com/advice").then((response) => {
        console.log(response.data);
        console.log(isLoading);
        setResult(response.data);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!result) {
    return null;
  }
  return (
    <>
      {isLoading ? (
        <h1 className="loader">LOADING.....</h1>
      ) : (
        result && (
          <div className="advice-wrapper">
            <h3 className="title">
              {result ? `ADVICE # ${result.slip.id}` : "NO ID"}
              {/* Advice * 111 */}
            </h3>
            <h4 className="content">
              {result ? result.slip.advice : "No Advices"}
              {/* gdhgsdghcsdcsdcdscdghdcghcdgh */}
            </h4>
            <div className="divider-wrapper">
              {/* <hr className="divider-line" /> */}
              <img src={Divider} alt="Divider" />
              {/* <div className="divider-image"></div> */}
              {/* <hr className="divider-line-after" /> */}
            </div>
            <button
              className="dice"
              disabled={isLoading}
              onClick={() => fetchData()}
            ></button>
          </div>
        )
      )}
    </>
  );
}
