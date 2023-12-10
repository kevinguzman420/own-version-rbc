import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

const dayInEnglish = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayInSpanish = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercóles",
  "Jueves",
  "Viernes",
  "Sábado",
];
// const allMonths = [
//   { label: "Enero", index: 1 },
//   { label: "Febrero", index: 2 },
//   { label: "Marzo", index: 3 },
//   { label: "Abril", index: 4 },
//   { label: "Mayo", index: 5 },
//   { label: "Junio", index: 6 },
//   { label: "Julio", index: 7 },
//   { label: "Agosto", index: 8 },
//   { label: "Septiembre", index: 9 },
//   { label: "Octubre", index: 10 },
//   { label: "Noviembre", index: 11 },
//   { label: "Diciembre", index: 12 },
// ];

export default function ReactBigCalendar({
  areaName = "Templo",
  events = [],
  colors,
  handleDay = null,
  handleEvent = null,
}) {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // selected month
  const [year, setYear] = useState(new Date().getFullYear()); // selected year
  const [monthDays, setMonthDays] = useState([]); // days in the selected month
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

  const manageMonths = (direction) => {
    if (direction === "+") {
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
  }, [month, year]);

  // handle day
  const handleDayFunction = (day, month, year) => {
    // handleDay(day);
    console.log(day, month, year);
  };

  // handle event
  const handleEventFunction = (eventId) => {
    // handleEvent(eventId);
    console.log(eventId);
  };

  return (
    <div className={` w-full h-full pb-[20px] ${colors.bg} ${colors.text} `}>
      <div className=" mb-[20px] text-center ">
        <h1 className=" text-3xl ">{areaName}</h1>
      </div>
      <div className=" px-[20px]">
        {/* controls */}
        <div
          className={` flex items-center h-[50px] ${colors.bg} overflow-x-auto `}
        >
          {/* month */}
          <div className=" flex mr-[50px] h-[40px] ">
            <Button
              color="primary"
              size="sm"
              radius="none"
              className={` min-w-[40px] min-h-[40px] ${colors.control} `}
              onPress={() => manageMonths("-")}
            >
              {"<"}
            </Button>
            <div
              className={` flex items-center justify-center w-[150px] h-[40px] ${colors.control} border-x border-slate-500/50 `}
            >
              <p className=" text-white mx-[20px] ">{getNameMonth(month)}</p>
            </div>
            <Button
              color="primary"
              size="sm"
              radius="none"
              className={` min-w-[40px] min-h-[40px] ${colors.control} `}
              onPress={() => manageMonths("+")}
            >
              {">"}
            </Button>
          </div>
          {/* year */}
          <div className={` flex h-[40px] `}>
            <Button
              size="sm"
              radius="none"
              className={` min-w-[40px] min-h-[40px] ${colors.control} `}
              onPress={() => manageYears("-")}
            >
              {"<"}
            </Button>
            <div
              className={` flex items-center justify-center w-[75px] h-[40px] ${colors.control} border-x border-slate-500/50 `}
            >
              <p className=" mx-[20px] ">{year}</p>
            </div>
            <Button
              size="sm"
              radius="none"
              className={` min-w-[40px] min-h-[40px] ${colors.control} `}
              onClick={() => manageYears("+")}
            >
              {">"}
            </Button>
          </div>
        </div>
        {/* calendar */}
        <div className={` ${colors.bgGrid} `}>
          {/* days week */}
          <div className=" grid grid-cols-7 ">
            {dayInSpanish.map((day) => (
              <p className={` text-center border ${colors.border} `} key={day}>
                {day}
              </p>
            ))}
          </div>
          {/* days */}
          <div className=" grid grid-cols-7 w-full justify-start gap-0 ">
            {emptyDays.map((i, index) => (
              <div
                className={` h-[107px] bg-transparent border ${colors.border} `}
                key={index}
              ></div>
            ))}
            {monthDays.map((_month) => {
              // all days by seleted month and year
              const date = new Date(_month);
              const dia = date.getDate();
              // events
              const eventsByDay = events.filter(
                (event) =>
                  event.day === dia &&
                  event.month === month &&
                  event.year === year
              );
              // current date
              const fechaActual = new Date();
              const today = fechaActual.getDate();
              const mes = fechaActual.getMonth() + 1; // 0-11, por lo que hay que sumar 1 para obtener el mes real
              const año = fechaActual.getFullYear();
              const currentDay = `${today}/${mes}/${año}`;
              return (
                <div
                  className={` h-[107px] cursor-pointer duration-300  border ${
                    colors.border
                  } ${
                    currentDay === date.toLocaleDateString() && "bg-pink-400"
                  } `}
                  onClick={() => {
                    handleDayFunction(dia, month, year);
                  }}
                  key={_month}
                >
                  {dia}
                  {eventsByDay.map((event) => (
                    <p
                      onClick={(e) => {
                        handleEventFunction(event.id);
                        e.stopPropagation();
                      }}
                      className=" mb-1 bg-[#2a75a1] text-white "
                      key={event.id}
                    >
                      {event.title}
                    </p>
                  ))}
                </div>
              );
            })}
            {emptyDays2.map((i, ind) => (
              <div className=" h-[107px] bg-transparent " key={ind}></div>
            ))}
          </div>
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
