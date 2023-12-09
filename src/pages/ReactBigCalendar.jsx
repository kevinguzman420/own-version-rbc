import { useEffect, useState } from "react";
import { Button, Navbar, Select, SelectItem } from "@nextui-org/react";

const dayInEnglish = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const allMonths = [
  { label: "Enero", index: 1 },
  { label: "Febrero", index: 2 },
  { label: "Marzo", index: 3 },
  { label: "Abril", index: 4 },
  { label: "Mayo", index: 5 },
  { label: "Junio", index: 6 },
  { label: "Julio", index: 7 },
  { label: "Agosto", index: 8 },
  { label: "Septiembre", index: 9 },
  { label: "Octubre", index: 10 },
  { label: "Noviembre", index: 11 },
  { label: "Diciembre", index: 12 },
];

export default function ReactBigCalendar({ areaName = "Templo", dataEvents }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [day, setDay] = useState(new Date().getDay().toLocaleString());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthDays, setMonthDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(`${day}-${month}-${year}`);
  const [events, setEvents] = useState([]);
  const [emptyDays, setEmptyDays] = useState([]);
  const [emptyDays2, setEmptyDays2] = useState([]);

  const getAllDaysInMonth = (_month, _year) => {
    const monthDaysArr = Array.from(
      { length: new Date(_year, _month, 0).getDate() },
      (_, i) => new Date(_year, _month - 1, i + 1)
    );
    const startDay = String(monthDaysArr[0]).slice(0, 3);
    const amountEmptyDays = dayInEnglish.indexOf(startDay) + 1;

    const tempEmptyDays = [];
    for (let i = 0; i < amountEmptyDays - 1; i++) {
      tempEmptyDays.push("-");
    }
    setEmptyDays(tempEmptyDays);

    const amountEmptyDays2 = [];
    for (let i = 0; i < 35 - tempEmptyDays.length - monthDaysArr.length; i++) {
      amountEmptyDays2.push("-");
    }
    setEmptyDays2(amountEmptyDays2);

    setMonthDays(monthDaysArr);
  };

  const getEventByMonth = () => {
    const monthEvents = dataEvents.filter(
      (event) => event.month === month && event.year === year
    );
    setEvents(monthEvents);
  };

  const manageMonths = (direction) => {
    if (direction === "+") {
      console.log(month);
      if (month === 12) {
        setMonth(1);
        setYear(year + 1);
        return;
      }
      month < 12 && setMonth(month + 1);
    } else {
      if (month === 1) {
        setMonth(12);
        setYear(year - 1);
        return;
      }
      month > 1 && setMonth(month - 1);
    }
  };

  const manageYears = (direction) => {
    if (direction === "+") {
      // month < 12 &&
      setYear(year + 1);
    } else {
      // month > 1 &&
      setYear(year - 1);
    }
    setMonth(1);
  };

  useEffect(() => {
    getAllDaysInMonth(month, year);

    getEventByMonth();
  }, [month, year]);

  return (
    <div className=" w-full border-2 border-blue-400 ">
      <div className=" my-[20px] text-center ">
        <h1 className=" text-3xl ">{areaName}</h1>
      </div>
      <div className=" flex items-center mb-[30px] h-[56px] bg-blue-900 ">
        {/* month */}
        <div className=" flex mx-[50px] h-[40px] ">
          <Button
            color="primary"
            size="sm"
            radius="none"
            className=" min-w-[40px] min-h-[40px] "
            onPress={() => manageMonths("-")}
          >
            {"<"}
          </Button>
          {/* <button onClick={() => alert(selectedDate)}>{"<"}</button> */}
          <div className=" flex items-center justify-center w-[150px] h-[40px] ">
            <p className=" text-white mx-[20px] ">{getNameMonth(month)}</p>
          </div>
          <Button
            color="primary"
            size="sm"
            radius="none"
            className=" min-w-[40px] min-h-[40px] "
            onPress={() => manageMonths("+")}
          >
            {">"}
          </Button>
        </div>
        {/* year */}
        <div className=" flex mx-[50px] h-[40px] ">
          <Button
            size="sm"
            radius="none"
            className=" min-w-[40px] min-h-[40px] "
            onPress={() => manageYears("-")}
          >
            {"<"}
          </Button>
          <div className=" flex items-center justify-center w-[75px] h-[40px] ">
            <p className=" mx-[20px] ">{year}</p>
          </div>
          <Button
            size="sm"
            radius="none"
            className=" min-w-[40px] min-h-[40px] "
            onClick={() => manageYears("+")}
          >
            {">"}
          </Button>
        </div>
      </div>
      <div className=" bg-gray-800 ">
        <div className=" grid grid-cols-7 place-items-center border-2 border-black ">
          <p className=" w-[142px] border ">Domingo</p>
          <p className=" w-[142px] border ">Lunes</p>
          <p className=" w-[142px] border ">Martes</p>
          <p className=" w-[142px] border ">Miercoles</p>
          <p className=" w-[142px] border ">Jueves</p>
          <p className=" w-[142px] border ">Viernes</p>
          <p className=" w-[142px] border ">Sábado</p>
        </div>
        {/* days */}
        <div className=" grid grid-cols-7 place-items-center justify-items-center mt-5 border-2 border-pink-500 ">
          {emptyDays.map((i, index) => (
            <div
              className=" w-[142px] h-[107px] border bg-gray-200 "
              key={index}
            ></div>
          ))}
          {monthDays.map((month) => {
            const date = new Date(month);
            const dia = date.getDate();
            const eventsByDay = events.filter((event) => event.day === dia);
            return (
              <div
                className={` w-[142px] h-[107px] border border-gray-400 hover:bg-gray-100 cursor-pointer duration-300 ${
                  dia === new Date().getDate() && "bg-pink-400"
                } `}
                onClick={() => alert(dia)}
                key={month}
              >
                {dia}
                {eventsByDay.map((event, i) => (
                  <p className=" mb-1 bg-[#2a75a1] text-white " key={i}>
                    {event.title}
                  </p>
                ))}
              </div>
            );
          })}
          {emptyDays2.map((i, ind) => (
            <div
              className=" w-[142px] h-[107px] border bg-gray-200 "
              key={ind}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getNameMonth(month) {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return meses[month - 1];
}
