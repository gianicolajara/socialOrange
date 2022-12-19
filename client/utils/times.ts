const UNIT_TIMES = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

//se obtienen los segundos
const getTimeInSecondDiff = (timestamp: number) => {
  return (Date.now() - timestamp) / 1000;
};

//obtenemos la unidad de tiempo mas los segundos
const getUnitAndTime = (timestamps: number) => {
  for (const [unit, time] of Object.entries(UNIT_TIMES)) {
    if (timestamps >= time || unit === "second") {
      let value = Math.floor(timestamps / time) * -1;

      value = value === -0 ? -1 : value;
      return { unit, value };
    }
  }
};

export const getEstimatedTime = ({ language = "es-VE", timestamp = "" }) => {
  if (timestamp === "" || timestamp === null) return "Tiempo invalido";

  const rtf = new Intl.RelativeTimeFormat(language);
  const timePost = new Date(timestamp).getTime();
  const unitAndTime = getUnitAndTime(getTimeInSecondDiff(timePost));
  return rtf.format(
    unitAndTime?.value || 0,
    (unitAndTime?.unit as Intl.RelativeTimeFormatUnit) || "second"
  );
};
