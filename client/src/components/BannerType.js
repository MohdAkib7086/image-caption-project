import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../css/components/BannerType.scss";
import Typewriter from "typewriter-effect";
import Parser from "html-react-parser";

const BannerType = (props) => {
  const { ref: headerMd, inView: headerMdRef } = useInView({
    triggerOnce: true,
  });

  const [headerMdVar, setHeaderMdVar] = useState(false);

  useEffect(() => {
    if (headerMdRef) {
      setHeaderMdVar(true);
    }
  }, [headerMdRef]);
  var typewriter = new Typewriter(null, {
    loop: true,
    delay: 200,
  });

  return (
    <>
      <h2 className="heading-md" ref={headerMd}>
        {headerMdVar && (
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString(props.header).pauseFor(250).start();
            }}
            options={{
              delay: 80,
              cursor:""
            }}
          />
        )}
      </h2>
      {/* {props.subHeader && (
        <h3 className="heading-sm padding-top-60px">
          <span> {Parser(props.subHeader)} </span>
        </h3>
      )} */}
    </>
  );
};

export default BannerType;
