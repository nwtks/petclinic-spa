const createModel = (api, emit) => {
  const model = {
    messages: [],
    vets: [],
    searchVets: () =>
      api.getVets((json) => {
        model.vets = json.payload;
        addMessages(model, json.messages);
      }),
  };
  return model;
};

const addMessages = (model, msgs) => {
  if (msgs && msgs.length) {
    model.messages = model.messages.concat(msgs);
  }
};

export default createModel;
