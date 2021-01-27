import React, { useState, useEffect } from "react";
import ButtonBlock from "../ButtonBlock/ButtonBlock";
import AdminTitle from "../AdminTitle/AdminTitle";
import AdminInput from "../AdminInput/AdminInput";
import SucsessBlock from "../SucsessBlock/SucsessBlock";
import { createClassName } from "../../../../utils/createClassName";
import {
  createEntity,
  getData,
  deleteEntity,
  changeEntity,
} from "../../../../adminFetch";
import "./PointCard.scss";

function PointCard() {
  const [point, setPoint] = useState({});
  const emptyCard = {
    name: "",
    cityId: { name: "", id: "" },
    address: "",
  };
  const [inputValues, setInputValues] = useState(emptyCard);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [isDeletionDisabled, setIsDeletionDisabled] = useState(true);
  const [isSavingDisabled, setIsSavingDisabled] = useState(true);
  const [isSucsess, setIsSucsess] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [cities, setCities] = useState([]);
  const [changedValues, setChangedValues] = useState({});
  let isNewCard = sessionStorage.PointData ? false : true;
  const createCn = (element, modifier) =>
    createClassName("point-card", element, modifier);

  useEffect(() => {
    if (!isNewCard) {
      const pointData = JSON.parse(sessionStorage.getItem("PointData"));
      setPoint(pointData);
      setInputValues({
        name: pointData.name,
        cityId: { name: pointData.cityId.name, id: pointData.cityId.id },
        address: pointData.address,
      });
      setIsDeletionDisabled(false);
      setIsSavingDisabled(true);
      return () => {
        sessionStorage.clear();
      };
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    if (isNewCard) {
      getData("/db/city")
        .then((resData) => {
          setCities(
            resData.data.map((item) => ({
              name: item.name,
              cityId: item.id,
            }))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    const isCompletedArray = Object.values(inputValues).every((item) => {
      if (typeof item !== "object") {
        return !!item;
      } else return Object.values(item)[0];
    });
    !isInputError && isCompletedArray
      ? setIsSavingDisabled(false)
      : setIsSavingDisabled(true);
  }, [inputValues, isInputError]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (isNewCard && name === "cityId") {
      const cityObject = cities.find((city) => city.name === value);
      if (!cityObject) {
        setIsInputError(true);
        setIsSavingDisabled(true);
        setInputValues({ ...inputValues, [name]: { name: value } });
      } else {
        setInputValues({
          ...inputValues,
          [name]: { name: value, id: cityObject.cityId },
        });
        setIsInputError(false);
      }
    }
    if (isNewCard && name !== "cityId") {
      setInputValues({ ...inputValues, [name]: value });
      setIsResetDisabled(false);
    }
    if (!isNewCard && name === "cityId") {
      alert("При редактировании пункта невозможно изменить город");
    }
    if (!isNewCard && name !== "cityId") {
      setInputValues({ ...inputValues, [name]: value });
      setChangedValues({ ...changedValues, [name]: value });
      setIsResetDisabled(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isNewCard) {
      createEntity("point", inputValues)
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
      changeEntity("point", point.id, changedValues)
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
    }
  }

  function handleReset() {
    !isNewCard
      ? setInputValues({
          name: point.name,
          cityId: { name: point.cityId.name, id: point.cityId.id },
          address: point.address,
        })
      : setInputValues(emptyCard);
    setIsResetDisabled(true);
    setIsInputError(false);
    setChangedValues({});
  }

  function handleDelete(pointId) {
    deleteEntity("point", pointId)
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
      {isSucsess && <SucsessBlock text="Пункт сохранен" />}
      <AdminTitle text="Карточка пункта" />
      <div className={createCn()}>
        <h3 className={createCn("title")}>Настройки пункта</h3>
        <form className={createCn("form")} onSubmit={handleSubmit}>
          <div className={createCn("container")}>
            <AdminInput
              label="Название пункта"
              id="name"
              type="text"
              placeholder="Введите название пункта..."
              value={inputValues.name}
              onChange={handleChange}
            />
            <AdminInput
              label="Город"
              id="cityId"
              type="text"
              placeholder="Введите город..."
              value={inputValues.cityId.name}
              onChange={handleChange}
              isError={isInputError}
            />
            <AdminInput
              label="Адрес"
              id="address"
              type="text"
              placeholder="Введите адрес пункта..."
              value={inputValues.address}
              onChange={handleChange}
            />
          </div>
          <ButtonBlock
            handleReset={handleReset}
            isResetDisabled={isResetDisabled}
            handleDelete={() => handleDelete(point.id)}
            isDeletionDisabled={isDeletionDisabled}
            isSavingDisabled={isSavingDisabled}
          />
        </form>
      </div>
    </>
  );
}

export default PointCard;
