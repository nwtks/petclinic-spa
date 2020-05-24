import createOwnersModel from './models/owners';
import createVetsModel from './models/vets';
import createApi from './api';
import WelcomePage from './pages/WelcomePage';
import VetsPage from './pages/VetsPage';
import OwnersPage from './pages/OwnersPage';
import OwnerDetailPage from './pages/OwnerDetailPage';
import OwnerEditPage from './pages/OwnerEditPage';
import PetEditPage from './pages/PetEditPage';
import VisitEditPage from './pages/VisitEditPage';

const start = (render, emitter, router) => {
  const api = createApi();
  const ownersModel = createOwnersModel(api, emitter.emit);
  const vetsModel = createVetsModel(api, emitter.emit);

  emitter
    .on('searchOwners', () => {
      ownersModel.messages = [];
      ownersModel.searchOwners().then(router.render);
    })
    .on('inputOwnersSearchForm', (param) =>
      ownersModel.inputOwnersSearchForm(param.name, param.value)
    )
    .on('postOwnerForm', () => {
      ownersModel.messages = [];
      ownersModel
        .postOwnerForm()
        .then((ownerId) =>
          ownerId ? router.redirect('#/owners/' + ownerId) : router.render()
        );
    })
    .on('setOwnerForm', (param) => {
      ownersModel.setOwnerForm(param.name, param.value);
      router.render();
    })
    .on('inputOwnerForm', (param) =>
      ownersModel.inputOwnerForm(param.name, param.value)
    )
    .on('postPetForm', () => {
      ownersModel.messages = [];
      ownersModel
        .postPetForm()
        .then((ownerId) =>
          ownerId ? router.redirect('#/owners/' + ownerId) : router.render()
        );
    })
    .on('setPetForm', (param) => {
      ownersModel.setPetForm(param.name, param.value);
      router.render();
    })
    .on('inputPetForm', (param) =>
      ownersModel.inputPetForm(param.name, param.value)
    )
    .on('postVisitForm', () => {
      ownersModel.messages = [];
      ownersModel
        .postVisitForm()
        .then((ownerId) =>
          ownerId ? router.redirect('#/owners/' + ownerId) : router.render()
        );
    })
    .on('setVisitForm', (param) => {
      ownersModel.setVisitForm(param.name, param.value);
      router.render();
    })
    .on('inputVisitForm', (param) =>
      ownersModel.inputVisitForm(param.name, param.value)
    );

  router
    .route('#/home', (param, next) => next(() => render(WelcomePage)))
    .route('#/vets', (param, next) => {
      vetsModel.messages = [];
      vetsModel.searchVets().then(() =>
        next(() =>
          render(VetsPage, {
            messages: vetsModel.messages,
            vets: vetsModel.vets,
          })
        )
      );
    })
    .route('#/owners', (param, next) => {
      ownersModel.messages = [];
      ownersModel.initOwnersSearchForm();
      ownersModel.searchOwners().then(() =>
        next(() =>
          render(OwnersPage, {
            messages: ownersModel.messages,
            errors: ownersModel.errors,
            form: ownersModel.ownersSearchForm,
            owners: ownersModel.filteredOwners,
          })
        )
      );
    })
    .route('#/owners/new', (param, next) => {
      ownersModel.messages = [];
      ownersModel.initOwnerForm();
      next(() =>
        render(OwnerEditPage, {
          messages: ownersModel.messages,
          errors: ownersModel.errors,
          form: ownersModel.ownerForm,
        })
      );
    })
    .route('#/owners/:ownerId', (param, next) => {
      ownersModel.messages = [];
      ownersModel.findOwner(param.ownerId).then(() =>
        next(() =>
          render(OwnerDetailPage, {
            messages: ownersModel.messages,
            owner: ownersModel.owner,
          })
        )
      );
    })
    .route('#/owners/:ownerId/edit', (param, next) => {
      ownersModel.messages = [];
      ownersModel
        .findOwner(param.ownerId)
        .then(() => ownersModel.initOwnerForm(ownersModel.owner))
        .then(() =>
          next(() =>
            render(OwnerEditPage, {
              messages: ownersModel.messages,
              errors: ownersModel.errors,
              form: ownersModel.ownerForm,
            })
          )
        );
    })
    .route('#/owners/:ownerId/pets/new', (param, next) => {
      ownersModel.messages = [];
      Promise.all([
        ownersModel.loadPetTypes(),
        ownersModel.findOwner(param.ownerId),
      ])
        .then(() => ownersModel.initPetForm(param.ownerId))
        .then(() =>
          next(() =>
            render(PetEditPage, {
              messages: ownersModel.messages,
              errors: ownersModel.errors,
              form: ownersModel.petForm,
              owner: ownersModel.owner,
              petTypes: ownersModel.petTypes,
            })
          )
        );
    })
    .route('#/owners/:ownerId/pets/:petId/edit', (param, next) => {
      ownersModel.messages = [];
      Promise.all([
        ownersModel.loadPetTypes(),
        ownersModel.findPet(param.ownerId, param.petId),
      ])
        .then(() => ownersModel.initPetForm(param.ownerId, ownersModel.pet))
        .then(() =>
          next(() =>
            render(PetEditPage, {
              messages: ownersModel.messages,
              errors: ownersModel.errors,
              form: ownersModel.petForm,
              owner: ownersModel.owner,
              petTypes: ownersModel.petTypes,
            })
          )
        );
    })
    .route('#/owners/:ownerId/pets/:petId/visits/new', (param, next) => {
      ownersModel.messages = [];
      ownersModel
        .findPet(param.ownerId, param.petId)
        .then(() => ownersModel.initVisitForm(param.ownerId, param.petId))
        .then(() =>
          next(() =>
            render(VisitEditPage, {
              messages: ownersModel.messages,
              errors: ownersModel.errors,
              form: ownersModel.visitForm,
              owner: ownersModel.owner,
              pet: ownersModel.pet,
            })
          )
        );
    })
    .route(
      '#/owners/:ownerId/pets/:petId/visits/:visitId/edit',
      (param, next) => {
        ownersModel.messages = [];
        ownersModel
          .findVisit(param.ownerId, param.petId, param.visitId)
          .then(() =>
            ownersModel.initVisitForm(
              param.ownerId,
              param.petId,
              ownersModel.visit
            )
          )
          .then(() =>
            next(() =>
              render(VisitEditPage, {
                messages: ownersModel.messages,
                errors: ownersModel.errors,
                form: ownersModel.visitForm,
                owner: ownersModel.owner,
                pet: ownersModel.pet,
              })
            )
          );
      }
    )
    .route('*', () => router.redirect('#/home'));

  router.start();
};

export default start;
