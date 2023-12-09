import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactBigCalendar from "./pages/ReactBigCalendar";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="react-big-calendar">React Big Calendar</Link>
        <br />
        <Link to="react-scheduler">React Scheduler</Link>
      </div>
      <Routes>
        <Route
          // path="/react-big-calendar"
          path="/"
          element={<ReactBigCalendar dataEvents={dataEvents} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

const dataEvents = [
  {
    title: "Event 1",
    description: " Event description 1",
    day: 21,
    month: 10,
    year: 2023,
    startHour: "12:30",
    endHour: "16:30",
  },
  {
    title: "Concierto de rock",
    description:
      "Concierto de la banda de rock [nombre de la banda] en el [nombre del recinto]",
    day: 22,
    month: 10,
    year: 2023,
    startHour: "19:00",
    endHour: "23:00",
  },
  {
    title: "Exposición de arte",
    description:
      "Exposición de arte contemporáneo de [nombre del artista] en el [nombre de la galería]",
    day: 23,
    month: 9,
    year: 2023,
    startHour: "11:00",
    endHour: "18:00",
  },
  {
    title: "Partido de fútbol",
    description:
      "Partido de fútbol entre el [nombre del equipo local] y el [nombre del equipo visitante] en el [nombre del estadio]",
    day: 24,
    month: 11,
    year: 2023,
    startHour: "17:00",
    endHour: "21:00",
  },
  {
    title: "Conferencia",
    description:
      "Conferencia sobre [tema de la conferencia] en el [nombre del recinto]",
    day: 24,
    month: 11,
    year: 2023,
    startHour: "10:00",
    endHour: "14:00",
  },
  {
    title: "Clase de cocina",
    description:
      "Clase de cocina de [tipo de cocina] en el [nombre del restaurante]",
    day: 26,
    month: 11,
    year: 2023,
    startHour: "18:00",
    endHour: "22:00",
  },
  {
    title: "Reunión de negocios",
    description:
      "Reunión de negocios con [nombre de la empresa] en el [nombre del lugar]",
    day: 27,
    month: 12,
    year: 2023,
    startHour: "10:00",
    endHour: "14:00",
  },
  {
    title: "Cumpleaños",
    description: "Cumpleaños de [nombre de la persona]",
    day: 28,
    month: 1,
    year: 2024,
    startHour: "20:00",
    endHour: "02:00",
  },
  {
    title: "Salida con amigos",
    description: "Salida con amigos al [nombre del lugar]",
    day: 29,
    month: 1,
    year: 2024,
    startHour: "22:00",
    endHour: "04:00",
  },
];
