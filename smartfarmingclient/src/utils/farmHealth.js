
import { useEffect, useState } from "react";

const STORAGE_KEY = "smartfarming-demo-thresholds";
const CHANGE_EVENT = "smartfarming-thresholds-changed";

export const demoThresholds = {
  temperature: {
    min: 15,
    max: 30,
    label: "Temperature",
    unit: "°C",
  },
  humidity: {
    min: 40,
    max: 75,
    label: "Humidity",
    unit: "%",
  },
  moisture: {
    min: 300,
    max: 750,
    label: "Soil moisture",
    unit: "",
  },
};

export function getThresholds() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );

    const result = {};

    Object.keys(demoThresholds).forEach((key) => {
      const defaults = demoThresholds[key];
      const values = saved[key] || {};

      const min = Number(values.min);
      const max = Number(values.max);

      result[key] = {
        ...defaults,
        min:
          values.min !== undefined && Number.isFinite(min)
            ? min
            : defaults.min,
        max:
          values.max !== undefined && Number.isFinite(max)
            ? max
            : defaults.max,
      };

      if (result[key].min >= result[key].max) {
        result[key] = { ...defaults };
      }
    });

    return result;
  } catch {
    return demoThresholds;
  }
}

export function saveThresholds(thresholds) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(thresholds)
  );

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function resetThresholds() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useFarmThresholds() {
  const [thresholds, setThresholds] = useState(getThresholds);

  useEffect(() => {
    const refresh = () => setThresholds(getThresholds());

    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return thresholds;
}

export function getLatestReading(readings) {
  if (!Array.isArray(readings) || readings.length === 0) {
    return null;
  }

  const latest = readings[readings.length - 1]?.value;

  if (
    latest === null ||
    latest === undefined ||
    latest === ""
  ) {
    return null;
  }

  const value = Number(latest);
  return Number.isFinite(value) ? value : null;
}

export function getChannelHealth(
  channel,
  thresholds = getThresholds()
) {
  const fields = [
    { key: "temperature", field: "fieldValue1" },
    { key: "humidity", field: "fieldValue2" },
    { key: "moisture", field: "fieldValue3" },
  ];

  const alerts = [];
  let missingReadings = 0;

  fields.forEach(({ key, field }) => {
    const threshold = thresholds[key];
    const value = getLatestReading(channel?.[field]);

    if (value === null) {
      missingReadings += 1;
      return;
    }

    if (value < threshold.min || value > threshold.max) {
      const direction =
        value < threshold.min ? "below" : "above";

      const limit =
        direction === "below"
          ? threshold.min
          : threshold.max;

      alerts.push({
        key,
        label: threshold.label,
        value,
        unit: threshold.unit,
        message: `${threshold.label} is ${direction} the configured threshold (${value}${threshold.unit}; limit ${limit}${threshold.unit}).`,
        recommendation:
          key === "temperature"
            ? "Check ventilation, shading, and the sensor reading."
            : key === "humidity"
            ? "Review humidity control and verify the sensor."
            : "Inspect the soil and confirm the sensor calibration.",
      });
    }
  });

  return {
    status:
      alerts.length > 0
        ? "attention"
        : missingReadings > 0
        ? "incomplete"
        : "normal",
    alerts,
    missingReadings,
  };
}
