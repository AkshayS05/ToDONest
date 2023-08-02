import { useState, useEffect } from "react";
const UseWeekDayGreets = () => {
  // set the initial greet to be an empty string
  const [greet, setGreet] = useState("");

  //hook will only run on the initial render
  useEffect(() => {
    //get the date
    const d = new Date();
    const weekday = new Array(7);
    weekday[0] = "Sunday 🖖";
    weekday[1] = "Monday 💪😀";
    weekday[2] = "Tuesday 😜";
    weekday[3] = "Wednesday 😉☕️";
    weekday[4] = "Thursday 🤗";
    weekday[5] = "Friday 🍻";
    weekday[6] = "Saturday 😴";
    const day = weekday[d.getDay()];

    //weekday + random message to show to the user.
    const randomWordArray = [
      "Oh my, it's a fantastic day!",
      "Whoop, it's time to celebrate!",
      "Happy moments ahead!",
      "Seems it's a joyful occasion!",
      "Wishing a wonderful day!",
      "Have a nice and relaxing day!",
      "Happy fabulous moments await!",
      "Enjoy your wonderful journey!",
    ];
    const randomWord =
      randomWordArray[Math.floor(Math.random() * randomWordArray.length)] + day;
    setGreet(randomWord);
  }, []);

  return { greet };
};

export default UseWeekDayGreets;
