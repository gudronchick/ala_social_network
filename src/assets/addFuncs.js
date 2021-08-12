import React from "react";

export const getPublishDate = (publicationTime = new Date()) => {
  const now = new Date();
  const distance = now.getTime() - publicationTime;
  let years = now.getFullYear() - publicationTime.getFullYear();
  let months = years * 12 + (now.getMonth() - publicationTime.getMonth());
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  if (years <= 1 && months <= 12) years = 0;
  let arr = [years, months, days, hours, minutes];
  let names = ["year", "month", "day", "hour", "minute"];

  for (let i in arr) {
    if (arr[i]) {
      return arr[i] + " " + names[i] + (arr[i] !== 1 ? "s" : "");
    }
  }
  return "few seconds";
};

export const customFileInput = (field) => {
  delete field.input.value;
  return (
    <input
      type="file"
      id="file"
      name={field.name}
      accept={field.accept}
      className={field.className}
      {...field.input}
    />
  );
};

export const chooseImg = (file, func = null) => {
  let blob = new Blob([file], { type: "text/plain" });
  const img = URL.createObjectURL(blob);
  if (func) func(img);

  return img;
};

export const autoResize = (e, height = 0) => {
  let numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
  e.target.style.height = numberOfLineBreaks * 16 + height + "px";
};
