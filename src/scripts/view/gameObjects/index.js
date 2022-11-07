import Application from './2d/primitive/Application';

export default (assets) => {
  const application = new Application();

  console.log(application);
  return {
    application,
  };
};
