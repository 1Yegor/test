
import style from "./loader.module.scss";
import LoaderCircle from "./loader.svg";

export function Loader() {
  
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.loaderCircle}>
          <img src={LoaderCircle} alt="loader" />
        </div>
      </div>
    </div>
  );
}
