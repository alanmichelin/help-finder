import moment from "moment";
import * as React from "react";
import Timetable from "react-timetable-events";

export const ServiceSchedule = ({ busyDates }) => {
  let avilableDate = moment().format("YYYY-MM-DD");
  let avilableDateFrom = avilableDate + "T09:00:00";
  let avilableDateTo = avilableDate + "T18:00:00";
  let eventsByDay = [[], [], [], [], [], [], []];

  busyDates &&
    busyDates.forEach((x) => {
      let arrayPos = moment(x).isoWeekday() - 1;
      eventsByDay[arrayPos].push({
        id: 1,
        name: "Ocupado",
        type: "error",
        startTime: new Date(moment(x).format("YYYY-MM-DD H:00")),
        endTime: new Date(moment(x).add(1, "hours").format("YYYY-MM-DD H:00")),
      });
    });
  return (
    <Timetable
      hoursInterval={{ from: 9, to: 18 }}
      renderEvent={EventPreview}
      events={{
        lunes: eventsByDay[0],
        // [
        //   {
        //     id: 1,
        //     name: "Libre",
        //     type: "custom",
        //     startTime: new Date(avilableDateFrom),
        //     endTime: new Date(avilableDateTo),
        //   },
        //   {
        //     id: 2,
        //     name: "Ocupado",
        //     type: "error",
        //     startTime: new Date(avilableDate + "T11:00:00"),
        //     endTime: new Date(avilableDate + "T12:00:00"),
        //   },
        // ],
        martes: eventsByDay[1],
        miercoles: eventsByDay[2],
        jueves: eventsByDay[3],
        viernes: eventsByDay[4],
        sabado: eventsByDay[5],
        domingo: eventsByDay[6],
      }}
      style={{ height: "500px" }}
    />
  );
};
const EventPreview = ({ event, defaultAttributes, classNames }) => {
  console.log();
  return (
    <div
      {...defaultAttributes}
      style={{
        ...defaultAttributes.style,
        background: event.type === "error" ? "#720000" : "#66B266",
      }}
      title={event.name}
      key={event.id}
      className={`${classNames.event}`}
      onClick={() => {
        event.type !== "error" && alert("Seleccionar horario");
      }}
    >
      <span className={classNames.event_info}>[ {event.name} ]</span>
      <span className={classNames.event_info}>
        {moment(event.startTime).format("HH:mm")} -
        {moment(event.endTime).format("HH:mm")}
      </span>
    </div>
  );
};

export default ServiceSchedule;
