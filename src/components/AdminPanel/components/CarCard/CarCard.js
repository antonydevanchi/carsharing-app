import React, { useState, useEffect } from "react";
import ButtonBlock from "../ButtonBlock/ButtonBlock";
import AdminCard from "../AdminCard/AdminCard";
import AdminTitle from "../AdminTitle/AdminTitle";
import AdminInput from "../AdminInput/AdminInput";
import SucsessBlock from "../SucsessBlock/SucsessBlock";
import { createClassName } from "../../../../utils/createClassName";
import { makePriceWithGap } from "../../../../utils/priceWithGap";
import {
  createEntity,
  getData,
  deleteEntity,
  changeEntity,
} from "../../../../adminFetch";
import "./CarCard.scss";

function CarCard() {
  const [car, setCar] = useState({});
  const emptyCard = {
    name: "",
    categoryId: { name: "", id: "" },
    priceMin: "",
    priceMax: "",
    colors: [],
    thumbnail: {},
    description: "",
  };
  const [inputValues, setInputValues] = useState(emptyCard);
  const [inputColorValue, setInputColorValue] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [isSucsess, setIsSucsess] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [isDeletionDisabled, setIsDeletionDisabled] = useState(true);
  const [isSavingDisabled, setIsSavingDisabled] = useState(true);
  const [isInputError, setIsInputError] = useState(false);
  const [changedValues, setChangedValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState({});
  let isNewCard = sessionStorage.CarData ? false : true;

  const createCn = (element, modifier) =>
    createClassName("car-card", element, modifier);

  useEffect(() => {
    if (!isNewCard) {
      const carData = JSON.parse(sessionStorage.getItem("CarData"));
      setCar(carData);
      setInputValues({
        name: carData.name,
        categoryId: {
          name: carData.categoryId.name,
          id: carData.categoryId.id,
        },
        priceMin: makePriceWithGap(carData.priceMin),
        priceMax: makePriceWithGap(carData.priceMax),
        colors: carData.colors,
        thumbnail: { path: carData.thumbnail.path },
        description: carData.description,
      });
      setIsDeletionDisabled(false);
      setIsSavingDisabled(true);

      return () => {
        sessionStorage.clear();
      };
    }

    getData("/db/category")
      .then((resData) => {
        setCategories(
          resData.data.map((item) => ({
            name: item.name,
            id: item.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); //eslint-disable-line

  useEffect(() => {
    const resArray = Object.values(inputValues);
    const res = resArray.reduce((prevVal, elem) => {
      if (elem && !Array.isArray(elem) && typeof elem !== "object") {
        prevVal += 1;
      }
      if (Array.isArray(elem) && elem.join()) {
        prevVal += 1;
      }
      if (
        typeof elem === "object" &&
        Object.values(elem)[0] &&
        !Array.isArray(elem)
      ) {
        prevVal += 1;
      }
      return prevVal;
    }, 0);
    const result = ((res / resArray.length) * 100).toFixed(0);
    setProgressValue(result);
  }, [inputValues]);

  useEffect(() => {
    !isInputError && progressValue === "100"
      ? setIsSavingDisabled(false)
      : setIsSavingDisabled(true);
  }, [isInputError, progressValue]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "categoryId") {
      const categoryObject = categories.find(
        (category) => category.name === value
      );
      if (!categoryObject) {
        setIsInputError(true);
        setIsSavingDisabled(true);
        setInputValues({ ...inputValues, [name]: { name: value } });
      } else {
        setInputValues({
          ...inputValues,
          [name]: { name: value, id: categoryObject.id },
        });
        setIsInputError(false);
        if (!isNewCard) {
          setChangedValues({
            ...changedValues,
            [name]: { name: value, id: categoryObject.id },
          });
        }
      }
    }
    if (
      isNewCard &&
      name !== "categoryId" &&
      name !== "colors" &&
      name !== "thumbnail"
    ) {
      setInputValues({ ...inputValues, [name]: value });
      setIsResetDisabled(false);
    }
    if (
      !isNewCard &&
      name !== "categoryId" &&
      name !== "colors" &&
      name !== "thumbnail"
    ) {
      setInputValues({ ...inputValues, [name]: value });
      setChangedValues({ ...changedValues, [name]: value });
      setIsResetDisabled(false);
    }
    if (name === "colors") {
      setInputColorValue(value);
    }
  }

  useEffect(() => {
    if (Object.values(imageFile)[0]) {
      setInputValues({ ...inputValues, thumbnail: imageFile });
    }
  }, [imageFile]); // eslint-disable-line

  function handleAddItem(e) {
    if (inputColorValue) {
      setInputValues({
        ...inputValues,
        colors: [...inputValues.colors, inputColorValue],
      });
      if (!isNewCard) {
        setChangedValues({
          ...changedValues,
          colors: [...inputValues.colors, inputColorValue],
        });
      }
    }
    setInputColorValue("");
  }

  function handleDeleteItem(e) {
    const index = inputValues.colors.indexOf(e.target.value);
    const newItemValues = inputValues.colors.slice();
    newItemValues.splice(index, 1);
    setInputValues({
      ...inputValues,
      colors: newItemValues,
    });
    if (!isNewCard) {
      setChangedValues({
        ...changedValues,
        colors: newItemValues,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isNewCard) {
      createEntity("car", inputValues)
        .then((res) => {
          setIsSucsess(true);
          setIsDeletionDisabled(true);
          setIsSavingDisabled(true);
          setIsResetDisabled(true);
          setInputValues(emptyCard);
        })
        .catch((err) => {
          setIsSucsess(false);
          alert("Что-то пошло не так... Пункт не сохранен");
          handleReset();
        });
    } else {
      changeEntity("car", car.id, changedValues)
        .then((res) => {
          setIsSucsess(true);
          setIsDeletionDisabled(true);
          setIsSavingDisabled(true);
          setIsResetDisabled(true);
          setChangedValues({});
          setInputValues(emptyCard);
        })
        .catch((err) => {
          setIsSucsess(false);
          alert("Что-то пошло не так... Пункт не сохранен");
          handleReset();
        });
    }
  }

  function handleReset() {
    !isNewCard
      ? setInputValues({
          name: car.name,
          categoryId: { name: car.categoryId.name, id: car.categoryId.id },
          priceMin: makePriceWithGap(car.priceMin),
          priceMax: makePriceWithGap(car.priceMax),
          colors: car.colors,
          thumbnail: { path: car.thumbnail.path },
          description: car.description,
        })
      : setInputValues(emptyCard);
    setIsResetDisabled(true);
    setIsInputError(false);
    setChangedValues({});
  }

  function handleDelete(carId) {
    deleteEntity("car", carId)
      .then((res) => {
        setIsDeletionDisabled(true);
        setIsResetDisabled(true);
        setInputValues(emptyCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {isSucsess && <SucsessBlock text="Машина сохранена" />}
      <AdminTitle text="Карточка автомобиля" />
      <div className={createCn()}>
        <AdminCard
          name={inputValues.name}
          category={inputValues.categoryId.name}
          description={inputValues.description}
          carImage={inputValues.thumbnail.path}
          number={progressValue}
          imageFile={imageFile}
          setImageFile={setImageFile}
          handleChange={handleChange}
        />
        <div className={createCn("card")}>
          <div className={createCn("content")}>
            <h3 className={createCn("title")}>Настройки автомобиля</h3>
            <form className={createCn("form")} onSubmit={handleSubmit}>
              <div className={createCn("container")}>
                <div className={createCn("input-container")}>
                  <AdminInput
                    label="Модель автомобиля"
                    id="name"
                    type="text"
                    placeholder="Введите модель автомобиля..."
                    position="left"
                    value={inputValues.name}
                    onChange={handleChange}
                  />
                  <AdminInput
                    label="Категория"
                    id="categoryId"
                    type="text"
                    placeholder="Введите тип автомобиля..."
                    value={inputValues.categoryId.name}
                    onChange={handleChange}
                    isError={isInputError}
                  />
                </div>
                <div className={createCn("input-container")}>
                  <AdminInput
                    label="Минимальная цена"
                    id="priceMin"
                    type="text"
                    placeholder="Введите минимальная цену..."
                    position="left"
                    value={inputValues.priceMin}
                    onChange={handleChange}
                  />
                  <AdminInput
                    label="Максимальная цена"
                    id="priceMax"
                    type="text"
                    placeholder="Введите максимальную цену..."
                    value={inputValues.priceMax}
                    onChange={handleChange}
                  />
                </div>
                <div className={createCn("input-container")}>
                  <AdminInput
                    label="Доступные цвета"
                    id="colors"
                    type="text"
                    placeholder="Введите цвет автомобиля..."
                    position="left"
                    addition="button"
                    value={inputColorValue}
                    options={inputValues.colors}
                    onChange={handleChange}
                    handleAddItem={handleAddItem}
                    handleDeleteItem={handleDeleteItem}
                  />
                </div>
              </div>
              <ButtonBlock
                handleReset={handleReset}
                isResetDisabled={isResetDisabled}
                handleDelete={() => handleDelete(car.id)}
                isDeletionDisabled={isDeletionDisabled}
                isSavingDisabled={isSavingDisabled}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarCard;
