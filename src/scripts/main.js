import "../styles/styles.sass";
import App from "./controller/Controller";

const init = () => {
  const node = document.querySelector(`#app-container`);
  const app = new App(node);

  app.init();
};

init();
