import { findById } from '../util';

const createModel = (api, emit) => {
  const model = {
    messages: [],
    errors: {},
    petTypes: [],
    filteredOwners: [],
    ownersSearchForm: null,
    owner: null,
    ownerForm: null,
    pet: null,
    petForm: null,
    visit: null,
    visitForm: null,
    loadPetTypes: () => api.getPetTypes((json) => (model.petTypes = json)),
    initOwnersSearchForm: () => {
      model.errors = {};
      model.ownersSearchForm = { filter: '' };
    },
    inputOwnersSearchForm: (name, value) =>
      (model.ownersSearchForm[name] = value),
    searchOwners: () =>
      api.getOwners(
        model.ownersSearchForm && model.ownersSearchForm.filter
          ? model.ownersSearchForm.filter
          : '',
        (json) => {
          model.filteredOwners = json.payload;
          addMessages(model, json.messages);
        }
      ),
    findOwner: (ownerId) =>
      api.getOwner(ownerId, (json) => {
        model.owner = json.payload;
        addMessages(model, json.messages);
      }),
    findPet: (ownerId, petId) =>
      model.findOwner(ownerId).then(() => {
        if (!model.owner) {
          model.pet = null;
          return;
        }
        model.pet = findById(model.owner.pets, petId);
        if (!model.pet) {
          addMessages(model, ['Pet not found.']);
        }
      }),
    findVisit: (ownerId, petId, visitId) =>
      model.findPet(ownerId, petId).then(() => {
        if (!model.pet) {
          model.visit = null;
          return;
        }
        model.visit = findById(model.pet.visits, visitId);
        if (!model.visit) {
          addMessages(model, ['Visit not found.']);
        }
      }),
    initOwnerForm: (owner) => {
      model.errors = {};
      if (owner) {
        model.ownerForm = {
          id: owner.id,
          name: owner.name,
          address: owner.address,
          telephone: owner.telephone,
        };
      } else {
        model.ownerForm = { isNew: true };
      }
    },
    inputOwnerForm: (name, value) => (model.ownerForm[name] = value),
    setOwnerForm: (name, value) => {
      model.ownerForm[name] = value;
      validateOwnerForm(model, name);
    },
    postOwnerForm: () => {
      if (!validateOwnerForm(model)) {
        return Promise.resolve();
      }
      if (model.ownerForm.isNew) {
        return api.postOwner(model.ownerForm, (json) => {
          addMessages(model, json.messages);
          return json.payload;
        });
      } else {
        return api.putOwner(model.ownerForm.id, model.ownerForm, (json) => {
          addMessages(model, json.messages);
          return json.payload;
        });
      }
    },
    initPetForm: (owerId, pet) => {
      model.errors = {};
      if (pet) {
        model.petForm = {
          id: pet.id,
          name: pet.name,
          birthDate: pet.birthDate,
          typeId: pet.type.id,
          owerId: owerId,
        };
      } else {
        model.petForm = { isNew: true, owerId: owerId };
      }
    },
    inputPetForm: (name, value) => (model.petForm[name] = value),
    setPetForm: (name, value) => {
      model.petForm[name] = value;
      validatePetForm(model, name);
    },
    postPetForm: () => {
      if (!validatePetForm(model)) {
        return Promise.resolve();
      }
      if (model.petForm.isNew) {
        return api.postPet(model.petForm.owerId, model.petForm, (json) => {
          addMessages(model, json.messages);
          return json.payload;
        });
      } else {
        return api.putPet(
          model.petForm.owerId,
          model.petForm.id,
          model.petForm,
          (json) => {
            addMessages(model, json.messages);
            return json.payload;
          }
        );
      }
    },
    initVisitForm: (owerId, petId, visit) => {
      model.errors = {};
      if (visit) {
        model.visitForm = {
          id: visit.id,
          visitDate: visit.visitDate,
          description: visit.description,
          owerId: owerId,
          petId: petId,
        };
      } else {
        model.visitForm = { isNew: true, owerId: owerId, petId: petId };
      }
    },
    inputVisitForm: (name, value) => (model.visitForm[name] = value),
    setVisitForm: (name, value) => {
      model.visitForm[name] = value;
      validateVisitForm(model, name);
    },
    postVisitForm: () => {
      if (!validateVisitForm(model)) {
        return Promise.resolve();
      }
      if (model.visitForm.isNew) {
        return api.postVisit(
          model.visitForm.owerId,
          model.visitForm.petId,
          model.visitForm,
          (json) => {
            addMessages(model, json.messages);
            return json.payload;
          }
        );
      } else {
        return api.putVisit(
          model.visitForm.owerId,
          model.visitForm.petId,
          model.visitForm.id,
          model.visitForm,
          (json) => {
            addMessages(model, json.messages);
            return json.payload;
          }
        );
      }
    },
  };
  return model;
};

const validateOwnerForm = (model, name) => {
  let valid = true;
  if (!name || name === 'name') {
    if (!model.ownerForm.name || !model.ownerForm.name.length) {
      model.errors.name = 'Please provide a name.';
      valid = false;
    } else {
      delete model.errors.name;
    }
  }
  if (!name || name === 'address') {
    if (!model.ownerForm.address || !model.ownerForm.address.length) {
      model.errors.address = 'Please provide a address.';
      valid = false;
    } else {
      delete model.errors.address;
    }
  }
  if (!name || name === 'telephone') {
    if (!model.ownerForm.telephone || !model.ownerForm.telephone.length) {
      model.errors.telephone = 'Please provide a telephone.';
      valid = false;
    } else if (!/^[0-9]{10,11}$/.test(model.ownerForm.telephone)) {
      model.errors.telephone = 'Please provide a valid telephone.';
      valid = false;
    } else {
      delete model.errors.telephone;
    }
  }
  return valid;
};

const validatePetForm = (model, name) => {
  let valid = true;
  if (!name || name === 'name') {
    if (!model.petForm.name || !model.petForm.name.length) {
      model.errors.name = 'Please provide a name.';
      valid = false;
    } else {
      delete model.errors.name;
    }
  }
  if (!name || name === 'birthDate') {
    if (!model.petForm.birthDate || !model.petForm.birthDate.length) {
      delete model.errors.birthDate;
    } else if (!/^[0-9]{8}$/.test(model.petForm.birthDate)) {
      model.errors.birthDate = 'Please provide a valid birth date.';
      valid = false;
    } else {
      delete model.errors.birthDate;
    }
  }
  if (!name || name === 'typeId') {
    if (!model.petForm.typeId || !model.petForm.typeId.length) {
      model.errors.typeId = 'Please choose a type.';
      valid = false;
    } else {
      delete model.errors.typeId;
    }
  }
  return valid;
};

const validateVisitForm = (model, name) => {
  let valid = true;
  if (!name || name === 'visitDate') {
    if (!model.visitForm.visitDate || !model.visitForm.visitDate.length) {
      model.errors.visitDate = 'Please provide a visit date.';
      valid = false;
    } else if (!/^[0-9]{8}$/.test(model.visitForm.visitDate)) {
      model.errors.visitDate = 'Please provide a valid visit date.';
      valid = false;
    } else {
      delete model.errors.visitDate;
    }
  }
  if (!name || name === 'description') {
    delete model.errors.description;
  }
  return valid;
};

const addMessages = (model, msgs) => {
  if (msgs && msgs.length) {
    model.messages = model.messages.concat(msgs);
  }
};

export default createModel;
