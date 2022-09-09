/**
 *
 * Backend calculators
 */

/**
 *
 * @param {*} height  users height in cm
 * @param {*} bodyweight users bodyweight in Kg
 * @returns BMI value using calculation according to 'WorldCancerResearchFund'
 */
export function calculateBMI(height, bodyweight) {
  const result = bodyweight / ((height / 100) * (height / 100));
  console.log(result);
  return result.toPrecision(3);
}

/**
 *
 * @param {*} BMIValue calcualted from users inputs in calculateBMI function
 * @returns Classification of BMI value according to 'www.cdc.gov'
 */
export function compareBMI(BMIValue) {
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

/**
 *
 * @param {*} gender
 * @param {*} age
 * @param {*} height
 * @param {*} bodyweight
 * @param {*} activityLevel numerical value assigned to activity level
 * @returns Daily recommended calories for user using Mifflin-st Jeor Equation from
 * reference  https://www.calculator.net/calorie-calculator.html
 */
export function calculateCalories(
  gender,
  age,
  height,
  bodyweight,
  activityLevel
) {
  if (gender == "male") {
    const result =
      (5 + 10 * bodyweight + 6.25 * height - 5 * age) * activityLevel;
    return result.toPrecision(5);
  } else if (gender == "female") {
    const result =
      (10 * bodyweight + 6.25 * height - 5 * age - 161) * activityLevel;
    return result.toPrecision(5);
  } else {
    const result = 0;
    return result;
  }
}
/**
 *
 * @param {*} bodyweight
 * @param {*} activityLevel numerical value assigned to activity level - 0.7L daily per 60minute workout
 * @returns - daily recommended water intake
 * reference https://www.slenderkitchen.com/article/how-to-calculate-how-much-water-you-should-drink-a-day
 */
export function calculateWater(bodyweight, activityLevel) {
  const daily = (bodyweight * 2.2 * 2) / 3 / 33.814;
  if (activityLevel === 1.2) {
    return daily.toPrecision(3);
  } else {
    const activeWater = daily + 0.7;
    return activeWater.toPrecision(3);
  }
}

export function calculateCaloriesFromMacros(protein, carbs, fats) {
  return protein * 4 + carbs * 4 + fats * 9;
}
