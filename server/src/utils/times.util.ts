const UNIT_TIMES = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

const timestampProp = Date.now() - 7200000; // 2 horas

//se obtienen los segundos
const getTimeInSecondDiff = (timestamp: number) => {
  console.log((Date.now() - timestamp) / 1000);
  return (Date.now() - timestamp) / 1000;
};

const getUnitAndTime = (timestamps: number) => {
  for (const [unit, time] of Object.entries(UNIT_TIMES)) {
    if (timestamps >= time) {
      const value = Math.floor(timestamps / time) * -1;
      return { unit, value };
    }
  }
};

const getEstimatedTime = () => {
  const rtf = new Intl.RelativeTimeFormat("en-US");
  const unitAndTime = getUnitAndTime(getTimeInSecondDiff(timestampProp));

  console.log(unitAndTime);

  return rtf.format(
    unitAndTime?.value || 0,
    (unitAndTime?.unit as Intl.RelativeTimeFormatUnit) || "second"
  );
};
