import Meta from "../../src/components/Meta";
import Navbar from "../../src/components/NavBar";
import PageLayout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import Link from "next/link";
import buttonStyles from "../../styles/Button.module.css";

export default function selectElements() {
  return (
    <>
      <Meta title="Select Elements" />
      <Navbar title="Select Elements" backPath={"/athlete"} />
      <PageLayout>
        <form className="text-center " action="/plan/setGoals">
          <div className="radio ">
            <label>
              <input
                type="radio"
                value="Calories & Macros"
                // checked={this.state.selectedOption === "Male"}
                // onChange={this.onValueChange}
              />
              Calories & Macros
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Water Intake"
                // checked={this.state.selectedOption === "Female"}
                // onChange={this.onValueChange}
              />
              Water Intake
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Bodyweight"
                // checked={this.state.selectedOption === "Other"}
                // onChange={this.onValueChange}
              />
              Bodyweight
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Steps"
                // checked={this.state.selectedOption === "Other"}
                // onChange={this.onValueChange}
              />
              Steps
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Sleep"
                // checked={this.state.selectedOption === "Other"}
                // onChange={this.onValueChange}
              />
              Sleep
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Hypertrophy Workout"
                // checked={this.state.selectedOption === "Other"}
                // onChange={this.onValueChange}
              />
              Hypertrophy Workout
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Cardio Workout"
                // checked={this.state.selectedOption === "Other"}
                // onChange={this.onValueChange}
              />
              Cardio Workout
            </label>
          </div>
          <button className="btn btn-default" type="submit">
            Submit
          </button>
        </form>
      </PageLayout>
    </>
  );
}
