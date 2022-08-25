import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";
import Router from "next/router";
import { useState } from "react";

export default function BMICalculator() {
  const [BMIValue, setBMIValue] = useState();
  const [BMIStatus, setBMIStatus] = useState(0);

  const [gender, setGender] = useState(0);
  const [height, setHeight] = useState("");
  const [bodyweight, setBodyweight] = useState("");

  let value = null;
  let status = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = calculateBMI(height, bodyweight);
    const status = compareBMI(value);
    console.log(value, status);
    setBMIStatus(status);
    setBMIValue(value);
    return value, status;
  };

  return (
    <>
      <Meta title="BMI Calculator" />
      <Navbar title="BMI" backPath={"/plan/setHealthcare"} />
      <PageLayout>
        <div className=" ">
          <h3 className="px-2">Details</h3>
          <form
            className="justify-center "
            id="BMICalculatorForm"
            onSubmit={handleSubmit}
            method="post"
            data-validate="parsley"
          >
            {/* Choose Gender */}
            {/* <label className="flex items-center mb-2 ml-28">
              <input
                type="radio"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender("male");
                }}
              />
              Male
            </label>
            <label className="flex items-center ml-28 mb-5">
              <input
                type="radio"
                className="checked:bg-blue-500 w-10 h-10 mr-5 "
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender("female");
                }}
              />
              Female
            </label> */}
            {/* Input personal details */}
            <h3 className="w-full text-center">Height (Cm) :</h3>
            <input
              className="h-8 border-2 w-full mb-2 mt-1  flex justify-center text-center"
              type="number"
              placeholder="Height (cm)"
              name="height"
              id="height"
              data-required="true"
              data-error-message="Enter Height in cm"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
            />
            <h3 className="mt-3 w-full text-center">Weight (Kg) :</h3>
            <input
              className=" w-full h-8 border-2  mb-1 mt-1 flex justify-center text-center "
              type="number"
              placeholder="Bodyweight (Kg)"
              name="weight"
              id="weight"
              data-required="true"
              data-error-message="Enter Bodyweight in Kg"
              value={bodyweight}
              onChange={(e) => {
                setBodyweight(e.target.value);
              }}
            />

            <div className=" w-full flex justify-center">
              <input
                className={`mt-2 text-h2-mobile md:text-h2-medium bg-primary-bg border-2 border-black text-center ${buttonStyles.primary}`}
                type="submit"
                value="Calculate"
                onClick={handleSubmit}
              />
            </div>
          </form>

          <hr className="bg-primary-text"></hr>

          <div className=" columns-2 flex justify-center mt-5">
            <h3 className="h-10 w-1/3 text-center text-primary-fadedtext ">
              BMI Value
            </h3>
            <h3 className="h-10 w-1/3 text-center text-primary-fadedtext ">
              BMI Status
            </h3>
          </div>

          <div className=" columns-2 flex justify-center mb-4">
            <div className="  h-6 w-1/3 border-2 border-black rounded-lg px-2 text-center  ">
              {BMIValue}
            </div>
            <div className="  h-6 w-1/3 border-2 border-black rounded-lg px-2 text-center ">
              {BMIStatus}
            </div>
          </div>

          <Button path="/plan/setHealthcare" label="Back"></Button>
        </div>
      </PageLayout>
    </>
  );
}
function calculateBMI(height, bodyweight) {
  //Calculation according to 'WorldCancerResearchFund'
  //TODO - move to backend
  const result = bodyweight / ((height / 100) * (height / 100));
  console.log(result);
  return result;
}

function compareBMI(BMIValue) {
  let BMIStatus = null;
  if (BMIValue < 18.5) {
    BMIStatus = "Underweight";
    return BMIStatus;
  } else if (BMIValue < 24.9) {
    BMIStatus = "Healthy";
    return BMIStatus;
  } else if (BMIValue < 29.9) {
    BMIStatus = "Overweight";
    return BMIStatus;
  } else if (BMIValue < 39.9) {
    BMIStatus = "Obese";
    return BMIStatus;
  } else {
    BMIStatus = "High Obesity";
    return BMIStatus;
  }
}
