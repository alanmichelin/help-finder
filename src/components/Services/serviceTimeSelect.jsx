import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import { useEffect } from "react";
import { Button } from "@mui/material";

const defaultMenuItems = [
  {
    time: "09",
    disabled: false,
  },
  {
    time: "10",
    disabled: false,
  },
  {
    time: "11",
    disabled: false,
  },
  {
    time: "12",
    disabled: false,
  },
  {
    time: "13",
    disabled: false,
  },
  {
    time: "14",
    disabled: false,
  },
  {
    time: "15",
    disabled: false,
  },
  {
    time: "16",
    disabled: false,
  },
  {
    time: "17",
    disabled: false,
  },
]

export default function BasicSelect({ busyDates,handleConfirmService }) {
  const [selectedHour, setSelectedHour] = React.useState();
  const [day, setDay] = React.useState();
  const [menuHourItems, setMenuHourItems] = React.useState(defaultMenuItems);
  const handleDayChange = (event) => {
    setMenuHourItems(defaultMenuItems);
    setDay(event.target.value);
  };

  const formatToDay = (date) => {
    return moment(date).format("MM-DD");
  };
  useEffect(() => {
    if (day) {
      console.log(busyDates);
      let chosenDay = formatToDay(
        dayMenuItems.find((x) => x.day == day).dayFormat
      );
        if(busyDates){
      var unableHours = busyDates.filter((x) => formatToDay(x) == chosenDay);
      let hoursToChange = [];
      unableHours.forEach((x) => {
        let hour = moment(x).format("H");
        let selectHour = menuHourItems.find((x) => x.time == hour);

        if (selectHour) {
          console.log(selectHour);
          selectHour.disabled = true;
          hoursToChange.push(selectHour);
        }
      });
      const newHours = menuHourItems.filter(x=> !hoursToChange.includes(x))
      setMenuHourItems([ ...newHours, ...hoursToChange].sort((a,b)=> a.time-b.time));
      console.log(unableHours);}
    }
  }, [day]);
  const handleChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const dayMenuItems = [
    {
      day:`Lunes ${moment().isoWeekday(1).format("MM/DD")}`,
      dayFormat: moment().isoWeekday(1).format(),
    },
    {
      day:`Martes ${moment().isoWeekday(2).format('MM/DD')}`,
      dayFormat: moment().isoWeekday(2).format(),
    },
    {
      day:`Miercoles ${moment().isoWeekday(3).format('MM/DD')}`,
      dayFormat: moment().isoWeekday(3).format(),
    },
    {
      day:`Jueves ${moment().isoWeekday(4).format('MM/DD')}`,
      dayFormat: moment().isoWeekday(4).format(),
    },
    {
      day:`Viernes ${moment().isoWeekday(5).format('MM/DD')}`,
      dayFormat: moment().isoWeekday(5).format(),
    },
    {
      day:`Sabado ${moment().isoWeekday(6).format('MM/DD')}`,
      dayFormat: moment().isoWeekday(6).format(),
    },
    {
      day:`Domingo ${moment().isoWeekday(7).format('MM/DD')}`,
      dayFormat: moment().isoWeekday(7).format(),
    },
  ];
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seleccionar dia</InputLabel>
        <Select value={day} label="Age" onChange={handleDayChange}>
          {dayMenuItems.map((x) => {
            return <MenuItem value={x.day} disabled={moment().add("days",-1) > moment(x.dayFormat)}>{x.day}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Hora</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedHour}
          label="Age"
          onChange={handleChange}
          disabled={!day}
        >
          {menuHourItems &&
            menuHourItems.map((x) => {

              return (
                <MenuItem value={x.time} disabled={x.disabled}>
                  {x.time}:00 - {parseInt(x.time)+1}:00
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <Button disabled={!(day && selectedHour)} onClick={()=>{handleConfirmService(day,selectedHour)}}>Confirmar</Button>
    </Box>
  );
}
