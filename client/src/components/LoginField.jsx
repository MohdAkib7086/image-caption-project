import { useState, useContext, useEffect } from "react";
import EmailIcon from "../assets/login/icon-email.svg";
// import { message } from "antd";
import { StaticImages } from "./../helper/common";

export default function LoginFieldCmp(props) {
  //   const [messageApi, contextHolder] = message.useMessage();

  const { image } = StaticImages;
  const { item = {}, savedSectionState, searchItem = false } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    const tempData = savedSectionState[item.key];
    if (tempData) {
      setValue(tempData);
      props.getFormJson(tempData, item.key, false);
    } else {
      props.getFormJson(tempData, item.key, true);
    }
  }, [savedSectionState]);

  // handle value of field when value changes
  const handleValidateNow = (e, item) => {
    setValue(e.target.value);
    console.log(e.target.value);
    if (item.regex.test(e.target.value)) {
      props.getFormJson(e.target.value, item.key, false);
      props?.handleSearchData(item, e.target.value);
    }
  };

  // handle length of input field
  const handleLength = (e, item) => {
    if (item.maxLength) {
      e.target.value = e.target.value.slice(0, item.maxLength);
    }
  };

  // const handleKeyUpEvent = (e, item) => {
  //     if (e?.keyCode === 8) {
  //         if (!item.regex.test(value)) {
  //             props.getFormJson(value, item.key, true)
  //             searchItem ? props.setSearchItem(false) : {}
  //         }
  //     }
  // }

  return (
    // <div className={item?.className}>
    //     <label className="block text-sm font-medium mb-1">{item.label}</label>
    //     <input id={item.id} className="form-input w-full" type={item.type} value={value} onChange={e => handleValidateNow(e, item)} onInput={e => handleLength(e, item)} onKeyUp={e => handleKeyUpEvent(e, item)} />
    // </div>
    <div className="form-field ipbox">
      <div className="icon">
        <img src={image[item.icon]} alt="Icon" />
      </div>
      <div className="field-input">
        <p>{item.label}</p>
        <input id={item.id} autoComplete="off" placeholder={item.placeholder} type={item.type} value={value} onChange={(e) => handleValidateNow(e, item)} onInput={(e) => handleLength(e, item)} />
      </div>
    </div>
  );
}
