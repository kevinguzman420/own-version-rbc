import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Calendar
              events={dataEvents}
              colors={{
                bg: "bg-slate-600",
                hover: "bg-slate-500",
                headControls: "bg-slate-700/70",
                control: "bg-slate-800",
                bgGrid: "bg-slate-800",
                text: "text-slate-200",
                border: "border-slate-700",
              }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const dataEvents = [
  {
    id: 1,
    title: "Event 1",
    description: " Event description 1",
    day: 10,
    month: 12,
    year: 2023,
    startHour: "12:30",
    endHour: "16:30",
  },
  {
    id: 2,
    title: "Concierto de rock",
    description:
      "Concierto de la banda de rock [nombre de la banda] en el [nombre del recinto]",
    day: 9,
    month: 12,
    year: 2023,
    startHour: "19:00",
    endHour: "23:00",
  },
];
